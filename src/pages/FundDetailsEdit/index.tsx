import { FC, useState, useEffect, useMemo, useCallback } from "react"
import { useParams } from "react-router-dom"
import { createClient, Provider as GraphProvider } from "urql"
import { useWeb3React } from "@web3-react/core"
import { RotateSpinner, PulseSpinner } from "react-spinners-kit"
import { formatEther, parseEther } from "@ethersproject/units"
import { useDispatch } from "react-redux"

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
import Icon from "components/Icon"

import BasicSettings from "./BasicSettings"

import ManagersIcon from "assets/icons/Managers"
import InvestorsIcon from "assets/icons/Investors"
import EmissionIcon from "assets/icons/Emission"
import MinInvestIcon from "assets/icons/MinInvestAmount"

import { bigify, formatBigNumber, shortenAddress, isTxMined } from "utils"
import { arrayDifference } from "utils/array"
import { parsePoolData, addFundMetadata } from "utils/ipfs"
import { useUpdateFundContext } from "context/UpdateFundContext"
import { usePoolContract, usePoolQuery } from "hooks/usePool"
import useContract, { useERC20 } from "hooks/useContract"
import { useAddToast } from "state/application/hooks"
import { TraderPool } from "abi"

import { useTransactionAdder } from "state/transactions/hooks"
import { TransactionType } from "state/transactions/types"
import { UpdateListType } from "constants/types"
import { addPool } from "state/ipfsMetadata/actions"

const poolsClient = createClient({
  url: process.env.REACT_APP_ALL_POOLS_API_URL || "",
})

const FundDetailsEdit: FC = () => {
  const dispatch = useDispatch()
  const { poolAddress } = useParams()
  const { account } = useWeb3React()

  const [poolData] = usePoolQuery(poolAddress)
  const [, poolInfoData] = usePoolContract(poolAddress)
  const [, baseData] = useERC20(poolData?.baseToken)
  const traderPool = useContract(poolData?.id, TraderPool)

  const {
    loading,
    handleChange,
    handleValidate,
    setInitial,
    setInitialIpfs,
    setDefault,
    poolParametersSaveCallback,
    managersRemoveCallback,
    managersAddCallback,
    investorsRemoveCallback,
    investorsAddCallback,
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

  const addTransaction = useTransactionAdder()

  const addToast = useAddToast()

  const handleParametersUpdate = useCallback(async () => {
    if (!traderPool || !poolData || !account) return

    const ipfsChanged = isIpfsDataUpdated()

    let ipfsReceipt
    const assetsParam = assets
    if (ipfsChanged) {
      // Avatar Blob string must be array with previous avatars
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

    const descriptionURL = ipfsChanged ? ipfsReceipt.path : ipfsReceipt
    const totalEmission = bigify(totalLPEmission, 18).toHexString()
    const minInvest = bigify(minimalInvestment, 18).toHexString()

    const receipt = await traderPool.changePoolParameters(
      descriptionURL,
      poolInfoData?.parameters.privatePool,
      totalEmission,
      minInvest
    )

    // Save new pool data to store
    dispatch(
      addPool({
        params: {
          poolId: poolAddress!,
          hash: receipt.hash,
          assets: assetsParam,
          description,
          strategy,
          account,
        },
      })
    )

    return addTransaction(receipt, {
      type: TransactionType.FUND_EDIT,
      baseCurrencyId: poolData.baseToken,
      fundName: poolData.name,
    })
  }, [
    traderPool,
    poolData,
    poolInfoData,
    account,
    assets,
    avatarBlobString,
    description,
    isIpfsDataUpdated,
    minimalInvestment,
    strategy,
    totalLPEmission,
    addTransaction,
    dispatch,
    poolAddress,
  ])

  const handleManagersRemove = useCallback(async () => {
    const receipt = await traderPool?.modifyAdmins(managersRemoved, false)

    return addTransaction(receipt, {
      type: TransactionType.FUND_UPDATE_MANAGERS,
      editType: UpdateListType.REMOVE,
      poolId: poolAddress,
    })
  }, [traderPool, managersRemoved, addTransaction, poolAddress])

  const handleManagersAdd = useCallback(async () => {
    const receipt = await traderPool?.modifyAdmins(managersAdded, true)

    return addTransaction(receipt, {
      type: TransactionType.FUND_UPDATE_MANAGERS,
      editType: UpdateListType.ADD,
      poolId: poolAddress,
    })
  }, [traderPool, managersAdded, addTransaction, poolAddress])

  const handleInvestorsRemove = useCallback(async () => {
    const receipt = await traderPool?.modifyPrivateInvestors(
      investorsRemoved,
      false
    )

    return addTransaction(receipt, {
      type: TransactionType.FUND_UPDATE_INVESTORS,
      editType: UpdateListType.REMOVE,
      poolId: poolAddress,
    })
  }, [traderPool, investorsRemoved, addTransaction, poolAddress])

  const handleInvestorsAdd = useCallback(async () => {
    const receipt = await traderPool?.modifyPrivateInvestors(
      investorsAdded,
      true
    )

    return addTransaction(receipt, {
      type: TransactionType.FUND_UPDATE_INVESTORS,
      editType: UpdateListType.ADD,
      poolId: poolAddress,
    })
  }, [traderPool, investorsAdded, addTransaction, poolAddress])

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

        if (isTxMined(data)) {
          setStep(step + 1)
          setStepPending(false)
          poolParametersSaveCallback()
        }
      }
      if (steps[step].title === "Managers") {
        setStepPending(true)

        let managersSuccess = false

        if (!!managersRemoved.length) {
          const removeReceipt = await handleManagersRemove()

          if (isTxMined(removeReceipt)) {
            managersRemoveCallback()
            managersSuccess = true
          }
        }
        if (!!managersAdded.length) {
          managersSuccess = false
          const addReceipt = await handleManagersAdd()

          if (isTxMined(addReceipt)) {
            managersAddCallback()
            managersSuccess = true
          }
        }

        if (managersSuccess) {
          setStep(step + 1)
          setStepPending(false)
        }
      }

      if (steps[step].title === "Investors") {
        setStepPending(true)

        let investorsSuccess = false

        if (!!investorsRemoved.length) {
          const removeReceipt = await handleInvestorsRemove()

          if (isTxMined(removeReceipt)) {
            investorsRemoveCallback()
            investorsSuccess = true
          }
        }
        if (!!investorsAdded.length) {
          investorsSuccess = false
          const addReceipt = await handleInvestorsAdd()

          if (isTxMined(addReceipt)) {
            investorsRemoveCallback()
            investorsSuccess = true
          }
        }

        if (investorsSuccess) {
          setStep(step + 1)
          setStepPending(false)
        }
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

  const handleInvestorsRowChange = async (state: string[]) => {
    if (state.length > investors.length) {
      handleChange("investors", state)
    } else {
      // Prevent removing investor if he claimed some LP's
      const removedAddress = arrayDifference(investors, state)[0]
      const claimedAmountBigNumber = await traderPool?.balanceOf(removedAddress)
      const claimedAmount = formatBigNumber(claimedAmountBigNumber, 18, 6)

      if (Number(claimedAmount) > 0) {
        addToast(
          {
            type: "warning",
            content: `Can't remove ${shortenAddress(
              removedAddress,
              3
            )}. Claimed: ${claimedAmount} ${poolData!.ticker}.`,
          },
          removedAddress,
          5000
        )
      } else {
        handleChange("investors", state)
      }
    }
  }

  const onStepperClose = async () => {
    setCreating(false)
    setStepPending(false)
    setStep(0)
    setSteps([])
  }

  // update initial value context
  useEffect(() => {
    if (!poolData || !poolInfoData) return
    ;(async () => {
      const parsedIpfs = await parsePoolData(poolData.descriptionURL)

      if (!!parsedIpfs) {
        setInitialIpfs({
          assets: parsedIpfs.assets,
          description: parsedIpfs.description,
          strategy: parsedIpfs.strategy,
        })
      }

      const totalEmission =
        poolInfoData && formatEther(poolInfoData.parameters.totalLPEmission)
      const minInvestment =
        poolInfoData && formatEther(poolInfoData.parameters.minimalInvestment)

      const investors = poolData?.privateInvestors.map((m) => m.id)
      const managers = poolData?.admins

      setInitial({
        totalLPEmission: totalEmission,
        minimalInvestment: minInvestment,
        investors: investors,
        managers: managers,
      })
    })()
  }, [poolData, poolInfoData, setInitialIpfs, setInitial])

  // update emission switch state
  useEffect(() => {
    if (!poolInfoData) return
    if (!poolInfoData.parameters.totalLPEmission.eq(parseEther("0"))) {
      setEmission(true)
    }
  }, [poolInfoData])

  // update min invest amount switch state
  useEffect(() => {
    if (!poolInfoData) return
    if (!poolInfoData.parameters.minimalInvestment.eq(parseEther("0"))) {
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
          onClose={onStepperClose}
          onSubmit={handleNextStep}
          current={step}
          pending={stepPending}
          steps={steps}
          title="Updatig of fund"
        >
          {baseData?.address && (
            <ModalIcons
              left={
                <Icon
                  m="0"
                  size={28}
                  source={avatarBlobString}
                  address={poolAddress}
                />
              }
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
            address={poolAddress}
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
                baseToken={baseData}
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
                    type="number"
                    inputmode="decimal"
                    value={totalLPEmission}
                    placeholder="---"
                    label="LP tokens emission"
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
                    type="number"
                    inputmode="decimal"
                    value={minimalInvestment}
                    placeholder="---"
                    onChange={(v) => handleChange("minimalInvestment", v)}
                    label="Minimum investment amount"
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
                  onChange={(v) => handleInvestorsRowChange(v)}
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
