import { FC, MouseEventHandler, useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { Flex } from "theme"
import { useWeb3React } from "@web3-react/core"
import { useSelector } from "react-redux"
import { PulseSpinner } from "react-spinners-kit"

import Button from "components/Button"
import Avatar from "components/Avatar"
import Header from "components/Header/Layout"
import AddressChips from "components/AddressChips"
import Input from "components/Input"
import IconButton from "components/IconButton"
import TextArea from "components/TextArea"
import Payload from "components/Payload"
import TokenIcon from "components/TokenIcon"
import Slider from "components/Slider"
import Stepper, { Step as IStep } from "components/Stepper"

import TokenSelect from "modals/TokenSelect"

import { useCreateFundContext } from "context/CreateFundContext"
import { selectTraderPoolFactoryAddress } from "state/contracts/selectors"
import { Token } from "constants/interfaces"
import useContract from "hooks/useContract"
import { TraderPool, TraderPoolFactory } from "abi"

import { addFundMetadata } from "utils/ipfs"
import { bigify } from "utils"
import getReceipt from "utils/getReceipt"

import ManagersIcon from "assets/icons/Managers"
import InvestorsIcon from "assets/icons/Investors"
import EmissionIcon from "assets/icons/Emission"
import MinInvestIcon from "assets/icons/MinInvestAmount"
import link from "assets/icons/link-grey.svg"
import plus from "assets/icons/button-plus.svg"

import HeaderStep from "./Header"
import FundTypeCard from "./FundTypeCard"
import FeeCard from "./FeeCard"

import {
  Container,
  Body,
  Steps,
  Step,
  StepBody,
  InputText,
  FundTypeCards,
  FeeCards,
  SwtichRow,
  LinkButton,
  AvatarWrapper,
  ModalIcons,
} from "./styled"
import { ethers } from "ethers"
import IpfsIcon from "components/IpfsIcon"

const performanceFees = [
  {
    id: 0,
    title: "1 Month Fee withdrawal",
    description: "Performance Fee limits of 20% to 30%",
    monthes: 1,
  },
  {
    id: 1,
    title: "3 Months Fee withdrawal",
    description: "Performance Fee limits of 20% to 50%",
    monthes: 3,
  },
  {
    id: 2,
    title: "12 Months Fee withdrawal",
    description: "Performance Fee limits of 20% to 70%",
    monthes: 12,
  },
]

const sliderPropsByPeriodType = {
  "0": {
    min: 20,
    max: 30,
  },
  "1": {
    min: 20,
    max: 50,
  },
  "2": {
    min: 20,
    max: 70,
  },
}

const deployMethodByType = {
  basic: "deployBasicPool",
  investment: "deployInvestPool",
}

const CreateFund: FC = () => {
  const {
    handleChange,
    baseToken,
    description,
    strategy,
    fundName,
    fundSymbol,
    fundType,
    commissionPeriod,
    commissionPercentage,
    managers,
    investors,
    totalLPEmission,
    minimalInvestment,
    avatarBlobString,
  } = useCreateFundContext()

  const navigate = useNavigate()
  const { library, account } = useWeb3React()

  const [isEmissionLimited, setEmission] = useState(totalLPEmission !== "")
  const [isMinimalInvest, setMinimalInvest] = useState(minimalInvestment !== "")
  const [isManagersAdded, setManagers] = useState(!!managers.length)
  const [isInvestorsAdded, setInvestors] = useState(!!investors.length)

  const [step, setStep] = useState(0)
  const [steps, setSteps] = useState<IStep[]>([])
  const [stepPending, setStepPending] = useState(false)
  const [isOpen, setModalState] = useState(false)
  const [isCreating, setCreating] = useState(false)
  const [stepsFormating, setStepsFormating] = useState(false)
  const [descriptionURL, setDescriptionURL] = useState("")
  const [contractAddress, setCreactedAddress] = useState("")

  const poolFactoryAddress = useSelector(selectTraderPoolFactoryAddress)
  const traderPoolFactory = useContract(poolFactoryAddress, TraderPoolFactory)
  const traderPool = useContract(contractAddress, TraderPool)

  const hideModal = () => setModalState(false)

  const handleTokenSelectOpen = () => {
    setModalState(true)
  }

  const handleTokenSelect = (token: Token) => {
    handleChange("baseToken", token)
    setModalState(false)
  }

  const handleTokenRedirect = (address: string) => {
    window.open(`https://bscscan.com/address/${address}`, "_blank")
  }

  const handleTokenLinkClick: MouseEventHandler = (e) => {
    e.stopPropagation()
    handleTokenRedirect(baseToken.address)
  }

  const handlePoolCreate = useCallback(async () => {
    if (!account || !traderPoolFactory) return

    const ipfsReceipt = await addFundMetadata(
      [avatarBlobString],
      description,
      strategy,
      account
    )

    setDescriptionURL(ipfsReceipt.path)

    const poolParameters = {
      descriptionURL: ipfsReceipt.path,
      trader: account,
      privatePool: isInvestorsAdded,
      totalLPEmission: ethers.utils
        .parseEther(totalLPEmission !== "" ? totalLPEmission : "0")
        .toHexString(),
      baseToken: baseToken.address,
      baseTokenDecimals: baseToken.decimals,
      minimalInvestment: 0,
      commissionPeriod,
      commissionPercentage: bigify(
        commissionPercentage.toString(),
        25
      ).toString(),
    }

    const typeName = deployMethodByType[fundType]

    const receipt = await traderPoolFactory[typeName](
      fundName,
      fundSymbol,
      poolParameters
    )

    return await receipt.wait()
  }, [
    account,
    avatarBlobString,
    baseToken.address,
    baseToken.decimals,
    commissionPercentage,
    commissionPeriod,
    description,
    fundName,
    fundSymbol,
    fundType,
    isInvestorsAdded,
    strategy,
    totalLPEmission,
    traderPoolFactory,
  ])

  const handleManagersAdd = useCallback(async () => {
    const receipt = await traderPool?.modifyAdmins(managers, true)

    return await receipt.wait()
  }, [managers, traderPool])

  const handleInvestorsAdd = useCallback(async () => {
    const receipt = await traderPool?.modifyPrivateInvestors(investors, true)

    return await receipt.wait()
  }, [investors, traderPool])

  const handleSubmit = async () => {
    if (stepsFormating) return

    setStepsFormating(true)
    let stepsShape = [
      {
        title: "Create",
        description:
          "Create your fund by signing a transaction in your wallet. This will create ERC20 compatible token.",
        buttonText: "Create fund",
      },
    ]

    if (managers.length) {
      stepsShape = [
        ...stepsShape,
        {
          title: "Managers",
          description: "Add managers to your fund.",
          buttonText: "Add managers",
        },
      ]
    }

    if (investors.length) {
      stepsShape = [
        ...stepsShape,
        {
          title: "Investors",
          description: "Add investors to your fund.",
          buttonText: "Add investors",
        },
      ]
    }

    stepsShape = [
      ...stepsShape,
      {
        title: "Success",
        description: "Your fund has been successfully created.",
        buttonText: "Finish",
      },
    ]

    setSteps(stepsShape)
    setStepsFormating(false)
    setCreating(true)
  }

  const handleNextStep = async () => {
    try {
      if (steps[step].title === "Create") {
        setStepPending(true)
        const data = await handlePoolCreate()

        // check if transaction is mined
        if (
          !!data &&
          ((data.logs.length && data.logs[0].address) || data.address)
        ) {
          const createdAddress = data.address
            ? data.address
            : data.logs[0].address
          setCreactedAddress(createdAddress)
          setStep(step + 1)
          setStepPending(false)
        }
      }

      if (steps[step].title === "Managers") {
        setStepPending(true)
        await handleManagersAdd()

        setStep(step + 1)
        setStepPending(false)
      }

      if (steps[step].title === "Investors") {
        setStepPending(true)
        await handleInvestorsAdd()

        setStep(step + 1)
        setStepPending(false)
      }

      if (steps[step].title === "Success") {
        setCreating(false)
        setStepPending(false)
        navigate(`/success/${contractAddress}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const baseTokenAvatar = !!baseToken.address && (
    <TokenIcon size={24} address={baseToken.address} />
  )

  const baseTokenLink = !baseToken.address ? (
    <IconButton onClick={handleTokenSelectOpen} media={plus} />
  ) : (
    <IconButton onClick={handleTokenLinkClick} media={link} />
  )

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
          title="Creation of fund"
        >
          {baseToken.address && (
            <ModalIcons
              left={<IpfsIcon m="0" size={28} hash={descriptionURL} />}
              right={<TokenIcon m="0" size={28} address={baseToken.address} />}
              fund={fundSymbol}
              base={baseToken.symbol}
            />
          )}
        </Stepper>
      )}
      {/* <Payload isOpen={isCreating} toggle={() => setCreating(false)} /> */}
      <TokenSelect
        onSelect={handleTokenSelect}
        isOpen={isOpen}
        onClose={hideModal}
      />
      <Header>Create fund</Header>
      <Container>
        <Body>
          <AvatarWrapper>
            <Avatar m="0 auto" onCrop={handleChange} showUploader size={100}>
              <LinkButton>Add fund photo</LinkButton>
            </Avatar>
          </AvatarWrapper>
          <Steps>
            <Step>
              <HeaderStep
                title="Basic settings"
                description="This settings can not be changed afrer creation"
                index="1"
              />
              <StepBody>
                <Flex full p="12px 0">
                  <Input
                    placeholder="---"
                    onClick={handleTokenSelectOpen}
                    disabled
                    leftIcon={baseTokenAvatar}
                    label="Base token"
                    value={baseToken.symbol}
                    rightIcon={baseTokenLink}
                  />
                </Flex>
                <Flex full p="12px 0">
                  <Input
                    label="Fund name"
                    limit={15}
                    value={fundName}
                    onChange={(value) => handleChange("fundName", value)}
                  />
                </Flex>
                <Flex full p="12px 0">
                  <Input
                    limit={5}
                    label="Ticker symbol"
                    value={fundSymbol}
                    onChange={(value) => handleChange("fundSymbol", value)}
                  />
                </Flex>
              </StepBody>
            </Step>
            <Step>
              <HeaderStep
                title="Type of fund"
                description="This settings can not be changed afrer creation"
                index="2"
              />
              <StepBody>
                <FundTypeCards>
                  <FundTypeCard
                    name="basic"
                    selected={fundType}
                    label="Standard - Low risk"
                    description="Trading on assets from the white list
                  + non-whitelisted assets through the proposals..."
                    link="Read More"
                    handleSelect={(value: any) =>
                      handleChange("fundType", value)
                    }
                  />
                  <FundTypeCard
                    name="investment"
                    selected={fundType}
                    label="Investment - High risk "
                    description="Manage the assets on your own..
                  Manage the assets on your own..."
                    link="Read More"
                    handleSelect={(value: any) =>
                      handleChange("fundType", value)
                    }
                  />
                </FundTypeCards>
              </StepBody>
            </Step>
            <Step>
              <HeaderStep
                title="Investment"
                description="This settings can be changed in account ater"
                index="3"
              />
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
                      onChange={(value) =>
                        handleChange("totalLPEmission", value)
                      }
                      rightIcon={<InputText>LP</InputText>}
                    />
                  </Flex>
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
                    rightIcon={<InputText>{baseToken.symbol}</InputText>}
                  />
                </SwtichRow>
              </StepBody>
            </Step>
            <Step>
              <HeaderStep
                title="Fund Details"
                description="This settings can be changed in account ater"
                index="4"
              />
              <StepBody>
                <Flex full p="12px 0">
                  <TextArea
                    defaultValue={description}
                    name="description"
                    placeholder="Fund description"
                    onChange={handleChange}
                  />
                </Flex>
                <Flex full p="12px 0">
                  <TextArea
                    defaultValue={strategy}
                    name="strategy"
                    placeholder="Fund strategy"
                    onChange={handleChange}
                  />
                </Flex>
              </StepBody>
            </Step>
            <Step>
              <HeaderStep
                title="Management Fee"
                description="This settings can not be changed afrer creation"
                index="5"
              />
              <StepBody isLast>
                <FeeCards>
                  {performanceFees.map((fee) => (
                    <FeeCard
                      key={fee.id}
                      name={fee.id}
                      label={fee.title}
                      description={fee.description}
                      selected={commissionPeriod}
                      handleSelect={(value: any) =>
                        handleChange("commissionPeriod", value)
                      }
                    />
                  ))}
                </FeeCards>

                <Slider
                  limits={sliderPropsByPeriodType[commissionPeriod]}
                  name="commissionPercentage"
                  initial={commissionPercentage}
                  onChange={handleChange}
                />
              </StepBody>
            </Step>
          </Steps>
          <Flex full p="0 16px 42px">
            <Button full size="large" onClick={handleSubmit}>
              {stepsFormating ? (
                <PulseSpinner color="#34455F" size={20} loading />
              ) : (
                "Create fund"
              )}
            </Button>
          </Flex>
        </Body>
      </Container>
    </>
  )
}

export default CreateFund
