import { FC, useState, useEffect, useMemo, useCallback } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { createClient, Provider as GraphProvider } from "urql"
import { useWeb3React } from "@web3-react/core"
import { RotateSpinner, PulseSpinner } from "react-spinners-kit"
import { ethers } from "ethers"

import {
  Container,
  AvatarWrapper,
  LinkButton,
  Steps,
  Step,
  StepTitle,
  StepBody,
  InputText,
  SwtichRow,
  ModalIcons,
} from "./styled"
import { Flex } from "theme"
import Button from "components/Button"
import Avatar from "components/Avatar"
import TextArea from "components/TextArea"
import Input from "components/Input"
import AddressChips from "components/AddressChips"
import Stepper, { Step as IStep } from "components/Stepper"
import TokenIcon from "components/TokenIcon"
import IpfsIcon from "components/IpfsIcon"

import BasicSettings from "./BasicSettings"

import ManagersIcon from "assets/icons/Managers"
import InvestorsIcon from "assets/icons/Investors"
import EmissionIcon from "assets/icons/Emission"
import MinInvestIcon from "assets/icons/MinInvestAmount"

import { parsePoolData, addFundMetadata } from "utils/ipfs"
import { useUpdateFundContext } from "context/UpdateFundContext"
import { usePool } from "state/pools/hooks"
import useContract, { useERC20 } from "hooks/useContract"
import { TraderPool } from "abi"

const poolsClient = createClient({
  url: process.env.REACT_APP_ALL_POOLS_API_URL || "",
})

const FundDetailsEdit: FC = () => {
  const { poolAddress } = useParams()
  const navigate = useNavigate()
  const { account } = useWeb3React()

  const [, poolData, , poolInfoData] = usePool(poolAddress)
  const [, baseData] = useERC20(poolData?.baseToken)
  const traderPool = useContract(poolData?.id, TraderPool)

  const {
    loading,
    handleChange,
    setInitial,
    setDefault,
    isIpfsDataUpdated,
    isPoolParametersUpdated,

    avatarBlobString,
    assets,

    description,
    strategy,

    totalLPEmission,
    minimalInvestment,

    managers,
    managersRemoved,
    managersAdded,

    investors,
    investorsRemoved,
    investorsAdded,
  } = useUpdateFundContext()

  const avatar = useMemo(() => {
    if (avatarBlobString.length > 0) {
      return avatarBlobString
    }
    return assets.at(-1)
  }, [avatarBlobString, assets])

  const [isEmissionLimited, setEmission] = useState(false)
  const [isMinimalInvest, setMinimalInvest] = useState(false)
  const [isManagersAdded, setManagers] = useState(!!managers.length)
  const [isInvestorsAdded, setInvestors] = useState(!!investors.length)

  const [step, setStep] = useState(0)
  const [steps, setSteps] = useState<IStep[]>([])
  const [stepPending, setStepPending] = useState(false)
  const [stepsFormating, setStepsFormating] = useState(false)
  const [isCreating, setCreating] = useState(false)
  const [descriptionURL, setDescriptionURL] = useState("")

  const handleParametersUpdate = useCallback(async () => {
    if (!traderPool || !poolData || !account) return

    let ipfsReceipt
    if (isIpfsDataUpdated()) {
      // Avatar Blob string must be array with previous avatars
      const assetsParam = assets
      if (avatarBlobString !== "") {
        assetsParam.push(avatarBlobString)
      }
      ipfsReceipt = await addFundMetadata(
        assetsParam,
        description,
        strategy,
        account
      )
    } else {
      ipfsReceipt = poolData.descriptionURL
    }

    setDescriptionURL(ipfsReceipt.path)

    const receipt = await traderPool.changePoolParameters(
      ipfsReceipt.path,
      // investors.length > 0, // - TODO: info about privacy rules
      Number(poolData.investorsCount) > 0,
      ethers.utils
        .parseEther(totalLPEmission !== "" ? totalLPEmission : "0")
        .toHexString(),
      ethers.utils
        .parseEther(minimalInvestment !== "" ? minimalInvestment : "0")
        .toHexString()
    )

    return await receipt.wait()
  }, [
    traderPool,
    poolData,
    account,
    assets,
    avatarBlobString,
    description,
    isIpfsDataUpdated,
    minimalInvestment,
    strategy,
    totalLPEmission,
  ])

  const handleManagersRemove = useCallback(async () => {
    const receipt = await traderPool?.modifyAdmins(managersRemoved, false)

    return await receipt.wait()
  }, [managersRemoved, traderPool])

  const handleManagersAdd = useCallback(async () => {
    const receipt = await traderPool?.modifyAdmins(managersAdded, true)

    return await receipt.wait()
  }, [managersAdded, traderPool])

  const handleInvestorsRemove = useCallback(async () => {
    const receipt = await traderPool?.modifyPrivateInvestors(
      investorsRemoved,
      false
    )

    return await receipt.wait()
  }, [investorsRemoved, traderPool])

  const handleInvestorsAdd = useCallback(async () => {
    const receipt = await traderPool?.modifyPrivateInvestors(
      investorsAdded,
      true
    )

    return await receipt.wait()
  }, [investorsAdded, traderPool])

  const handleSubmit = async () => {
    if (stepsFormating) return

    setStepsFormating(true)
    let stepsShape: IStep[] = []

    if (isPoolParametersUpdated()) {
      stepsShape = [
        ...stepsShape,
        {
          title: "Parameters",
          description:
            "Update your fund by signing a transaction in your wallet. This will update ERC20 compatible data.",
          buttonText: "Update fund",
        },
      ]
    }

    if (!!managersRemoved.length) {
      stepsShape = [
        ...stepsShape,
        {
          title: "Remove Managers",
          description: "Remove managers from your fund.",
          buttonText: "Remove managers",
        },
      ]
    }
    if (!!managersAdded.length) {
      stepsShape = [
        ...stepsShape,
        {
          title: "Add Managers",
          description: "Add managers from your fund.",
          buttonText: "Add managers",
        },
      ]
    }

    if (!!investorsRemoved.length) {
      stepsShape = [
        ...stepsShape,
        {
          title: "Remove Investors",
          description: "Remove investors to your fund.",
          buttonText: "Remove investors",
        },
      ]
    }

    if (!!investorsAdded.length) {
      stepsShape = [
        ...stepsShape,
        {
          title: "Add Investors",
          description: "Add investors to your fund.",
          buttonText: "Add investors",
        },
      ]
    }

    stepsShape = [
      ...stepsShape,
      {
        title: "Success",
        description: "Your fund has been successfully updated.",
        buttonText: "Finish",
      },
    ]

    setSteps(stepsShape)
    setStepsFormating(false)
    setCreating(true)
  }

  const handleNextStep = async () => {
    try {
      if (steps[step].title === "Parameters") {
        setStepPending(true)
        const data = await handleParametersUpdate()

        // check if transaction is mined
        if (!!data && data.logs.length && data.logs[0].address) {
          setStep(step + 1)
          setStepPending(false)
        }
      }
      if (steps[step].title === "Remove Managers") {
        setStepPending(true)
        await handleManagersRemove()

        setStep(step + 1)
        setStepPending(false)
      }
      if (steps[step].title === "Add Managers") {
        setStepPending(true)
        await handleManagersAdd()

        setStep(step + 1)
        setStepPending(false)
      }
      if (steps[step].title === "Remove Investors") {
        setStepPending(true)
        await handleInvestorsRemove()

        setStep(step + 1)
        setStepPending(false)
      }
      if (steps[step].title === "Add Investors") {
        setStepPending(true)
        await handleInvestorsAdd()

        setStep(step + 1)
        setStepPending(false)
      }

      if (steps[step].title === "Success") {
        setCreating(false)
        setStepPending(false)
        navigate(`/success/${poolData?.id}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!poolData || !poolInfoData) return
    ;(async () => {
      const parsedIpfs = await parsePoolData(poolData.descriptionURL)
      const totalEmission =
        poolInfoData &&
        ethers.utils.formatEther(poolInfoData.parameters.totalLPEmission)
      const minInvestment =
        poolInfoData &&
        ethers.utils.formatEther(poolInfoData.parameters.minimalInvestment)

      if (!!parsedIpfs) {
        setInitial({
          assets: parsedIpfs.assets,
          description: parsedIpfs.description,
          strategy: parsedIpfs.strategy,
          totalLPEmission: totalEmission,
          minimalInvestment: minInvestment,
          investors: [],
          managers: [],
        })
      }
    })()
  }, [poolData, poolInfoData, setInitial])

  useEffect(() => {
    if (totalLPEmission !== "") {
      setEmission(true)
    }
  }, [totalLPEmission])

  useEffect(() => {
    if (minimalInvestment !== "") {
      setMinimalInvest(true)
    }
  }, [minimalInvestment])

  useEffect(() => {
    return () => {
      setDefault()
    }
  }, [setDefault])

  if (loading || !poolData || !poolInfoData) {
    return (
      <Container loading>
        <Flex full ai="center" jc="center">
          <RotateSpinner />
        </Flex>
      </Container>
    )
  }

  return (
    <>
      {!!steps.length && (
        <Stepper
          isOpen={isCreating}
          onClose={() => setCreating(false)}
          onSubmit={handleNextStep}
          current={step}
          pending={stepPending}
          steps={steps}
          title="Updatig of fund"
        >
          {baseData?.address && (
            <ModalIcons
              left={<IpfsIcon m="0" size={28} hash={descriptionURL} />}
              right={<TokenIcon m="0" size={28} address={baseData.address} />}
              fund={poolData.ticker}
              base={baseData.symbol}
            />
          )}
        </Stepper>
      )}

      <Container>
        <AvatarWrapper>
          <Avatar
            m="0 auto"
            url={avatar}
            onCrop={handleChange}
            showUploader
            size={100}
          >
            <LinkButton>Change fund photo</LinkButton>
          </Avatar>
        </AvatarWrapper>
        <Steps>
          <Step>
            <StepTitle>Basic settings</StepTitle>
            <StepBody>
              <BasicSettings
                poolData={poolData}
                symbol={baseData?.symbol}
                commissionPercentage={
                  poolInfoData?.parameters.commissionPercentage
                }
              />
            </StepBody>
          </Step>
          <Step>
            <StepTitle>Fund Details</StepTitle>
            <StepBody>
              <Flex full p="0">
                <TextArea
                  theme="grey"
                  defaultValue={description}
                  name="description"
                  placeholder="Fund description"
                  onChange={handleChange}
                />
              </Flex>
              <Flex full p="32px 0 0">
                <TextArea
                  theme="grey"
                  defaultValue={strategy}
                  name="strategy"
                  placeholder="Fund strategy"
                  onChange={handleChange}
                />
              </Flex>
            </StepBody>
          </Step>
          <Step>
            <StepTitle>Investment</StepTitle>
            <StepBody>
              <SwtichRow
                icon={<EmissionIcon active={isEmissionLimited} />}
                title="Limited Emission"
                isOn={isEmissionLimited}
                name="_emissionLimited"
                onChange={setEmission}
              >
                <Flex full p="12px 0">
                  <Input
                    label="LP tokens emission"
                    value={totalLPEmission}
                    onChange={(value) => handleChange("totalLPEmission", value)}
                    rightIcon={<InputText>LP</InputText>}
                  />
                </Flex>
              </SwtichRow>
              <SwtichRow
                icon={<MinInvestIcon active={isMinimalInvest} />}
                title="Minimum investment amount"
                isOn={isMinimalInvest}
                name="_minInvestRestricted"
                onChange={setMinimalInvest}
              >
                <Input
                  placeholder="---"
                  onChange={(v) => handleChange("minimalInvestment", v)}
                  label="Minimum investment amount"
                  value={minimalInvestment}
                  rightIcon={<InputText>{baseData?.symbol}</InputText>}
                />
              </SwtichRow>
              <SwtichRow
                icon={<ManagersIcon active={isManagersAdded} />}
                title="New fund managers"
                isOn={isManagersAdded}
                name="_managersRestricted"
                onChange={setManagers}
              >
                <AddressChips
                  items={managers}
                  onChange={(v) => handleChange("managers", v)}
                  limit={100}
                  label="0x..."
                />
              </SwtichRow>
              <SwtichRow
                icon={<InvestorsIcon active={isInvestorsAdded} />}
                title="Invited investors"
                isOn={isInvestorsAdded}
                name="_investorsRestricted"
                onChange={setInvestors}
              >
                <AddressChips
                  items={investors}
                  onChange={(v) => handleChange("investors", v)}
                  limit={100}
                  label="0x..."
                />
              </SwtichRow>
            </StepBody>
          </Step>
        </Steps>
        <Flex full p="0 16px 61px">
          <Button full size="large" onClick={handleSubmit}>
            {stepsFormating ? (
              <PulseSpinner color="#34455F" size={20} loading />
            ) : (
              "Confirm changes"
            )}
          </Button>
        </Flex>
      </Container>
    </>
  )
}

export default function SwapWithProvider() {
  return (
    <GraphProvider value={poolsClient}>
      <FundDetailsEdit />
    </GraphProvider>
  )
}
