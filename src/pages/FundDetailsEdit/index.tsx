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
  ModalIcons,
  ValidationError,
  InputRow,
} from "./styled"
import { Flex } from "theme"
import SwitchRow, { InputText } from "components/SwitchRow"
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

import { bigify } from "utils"
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
    handleValidate,
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

    validationErrors,
  } = useUpdateFundContext()

  const avatar = useMemo(() => {
    if (avatarBlobString.length > 0) {
      return avatarBlobString
    }
    return assets.at(-1)
  }, [avatarBlobString, assets])

  const [isEmissionLimited, setEmission] = useState<boolean>(false)
  const [isMinimalInvest, setMinimalInvest] = useState<boolean>(false)
  const [isManagersAdded, setManagers] = useState<boolean>(false)
  const [isInvestorsAdded, setInvestors] = useState<boolean>(false)

  const [step, setStep] = useState(0)
  const [steps, setSteps] = useState<IStep[]>([])
  const [stepPending, setStepPending] = useState(false)
  const [stepsFormating, setStepsFormating] = useState(false)
  const [isCreating, setCreating] = useState(false)
  const [transactionFail, setTransactionFail] = useState(false)
  const [descriptionURL, setDescriptionURL] = useState("")

  const handleParametersUpdate = useCallback(async () => {
    if (!traderPool || !poolData || !account) return

    const ipfsChanged = isIpfsDataUpdated()

    let ipfsReceipt
    if (ipfsChanged) {
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

    const descriptionURL = ipfsChanged ? ipfsReceipt.path : ipfsReceipt
    // investors.length > 0, // - TODO: info about privacy rule
    const privatePool = Number(poolData.investorsCount) > 0
    const totalEmission = bigify(totalLPEmission, 18).toHexString()
    const minInvest = bigify(minimalInvestment, 18).toHexString()

    const receipt = await traderPool.changePoolParameters(
      descriptionURL,
      privatePool,
      totalEmission,
      minInvest
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

    if (!handleValidate()) return

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

    if (!!managersRemoved.length || !!managersAdded.length) {
      // TODO: description must include count of transactions and what user must approve
      stepsShape = [
        ...stepsShape,
        {
          title: "Managers",
          description: "Update managers for your fund.",
          buttonText: "Update managers",
        },
      ]
    }

    if (!!investorsRemoved.length || !!investorsAdded.length) {
      // TODO: description must include count of transactions and what user must approve
      stepsShape = [
        ...stepsShape,
        {
          title: "Investors",
          description: "Update investors for your fund.",
          buttonText: "Update investors",
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
      setTransactionFail(false)
      if (steps[step].title === "Parameters") {
        setStepPending(true)
        const data = await handleParametersUpdate()

        // check if transaction is mined
        if (!!data && data.logs.length && data.logs[0].address) {
          setStep(step + 1)
          setStepPending(false)
        }
      }
      if (steps[step].title === "Managers") {
        setStepPending(true)

        if (!!managersRemoved.length) {
          await handleManagersRemove()
        }
        if (!!managersAdded.length) {
          await handleManagersAdd()
        }

        setStep(step + 1)
        setStepPending(false)
      }

      if (steps[step].title === "Investors") {
        setStepPending(true)

        if (!!investorsRemoved.length) {
          await handleInvestorsRemove()
        }
        if (!!investorsAdded.length) {
          await handleInvestorsAdd()
        }

        setStep(step + 1)
        setStepPending(false)
      }

      if (steps[step].title === "Success") {
        setCreating(false)
        setStepPending(false)
        setStep(0)
        setSteps([])
      }
    } catch (error) {
      setStepPending(false)
      setTransactionFail(true)
      console.log(error)
    }
  }

  const getFieldErrors = (name: string) => {
    return validationErrors
      .filter((error) => error.field === name)
      .map((error) => (
        <ValidationError key={error.field}>{error.message}</ValidationError>
      ))
  }

  const handleEmissionRowChange = (state: boolean) => {
    setEmission(state)

    if (!state) {
      handleChange("totalLPEmission", "")
    }
  }

  const handleMinInvestRowChange = (state: boolean) => {
    setMinimalInvest(state)

    if (!state) {
      handleChange("minimalInvestment", "")
    }
  }

  // update initial value context
  useEffect(() => {
    if (!poolData || !poolInfoData) return
    ;(async () => {
      const parsedIpfs = await parsePoolData(poolData.descriptionURL)

      if (!!parsedIpfs) {
        setInitial({
          assets: parsedIpfs.assets,
          description: parsedIpfs.description,
          strategy: parsedIpfs.strategy,
        })
      }

      const totalEmission =
        poolInfoData &&
        ethers.utils.formatEther(poolInfoData.parameters.totalLPEmission)
      const minInvestment =
        poolInfoData &&
        ethers.utils.formatEther(poolInfoData.parameters.minimalInvestment)

      setInitial({
        totalLPEmission: totalEmission,
        minimalInvestment: minInvestment,
        investors: [],
        managers: [],
      })
    })()
  }, [poolData, poolInfoData, setInitial])

  // update emission switch state
  useEffect(() => {
    if (!poolInfoData) return
    if (
      !poolInfoData.parameters.totalLPEmission.eq(ethers.utils.parseEther("0"))
    ) {
      setEmission(true)
    }
  }, [poolInfoData])

  // update min invest amount switch state
  useEffect(() => {
    if (!poolInfoData) return
    if (
      !poolInfoData.parameters.minimalInvestment.eq(
        ethers.utils.parseEther("0")
      )
    ) {
      setMinimalInvest(true)
    }
  }, [poolInfoData])

  // update managers switch state
  useEffect(() => {
    if (!!managers.length) {
      setManagers(true)
    }
  }, [managers])

  // update investors switch state
  useEffect(() => {
    if (!!investors.length) {
      setInvestors(true)
    }
  }, [investors])

  // clean state when user leaves page
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
          failed={transactionFail}
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
                  theme="black"
                  defaultValue={description}
                  name="description"
                  placeholder="Fund description"
                  onChange={handleChange}
                />
              </Flex>
              <Flex full p="32px 0 0">
                <TextArea
                  theme="black"
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
              <SwitchRow
                icon={<EmissionIcon active={isEmissionLimited} />}
                title="Limited Emission"
                isOn={isEmissionLimited}
                name="_emissionLimited"
                onChange={handleEmissionRowChange}
              >
                <InputRow>
                  <Input
                    label="LP tokens emission"
                    value={totalLPEmission}
                    onChange={(value) => handleChange("totalLPEmission", value)}
                    rightIcon={<InputText>LP</InputText>}
                  />
                  {getFieldErrors("totalLPEmission")}
                </InputRow>
              </SwitchRow>
              <SwitchRow
                icon={<MinInvestIcon active={isMinimalInvest} />}
                title="Minimum investment amount"
                isOn={isMinimalInvest}
                name="_minInvestRestricted"
                onChange={handleMinInvestRowChange}
              >
                <InputRow>
                  <Input
                    placeholder="---"
                    onChange={(v) => handleChange("minimalInvestment", v)}
                    label="Minimum investment amount"
                    value={minimalInvestment}
                    rightIcon={<InputText>{baseData?.symbol}</InputText>}
                  />
                  {getFieldErrors("minimalInvestment")}
                </InputRow>
              </SwitchRow>
              <SwitchRow
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
              </SwitchRow>
              <SwitchRow
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
              </SwitchRow>
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
