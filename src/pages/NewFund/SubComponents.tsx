import React, { useState, useEffect } from "react"
import { useRouteMatch } from "react-router-dom"
import { Flex, External, To } from "theme"
import WalletCard from "components/WalletCard"
import AddressChips from "components/AddressChips"
import TokenSelect from "components/TokenSelect"
import RadioButton from "components/RadioButton"
import Switch from "components/Switch"
import OneValueCard from "components/OneValueCard"
import { opacityVariants } from "motion/variants"
import swipeLeft from "assets/icons/swipe-arrow-left.svg"
import {
  SelectUI,
  NextButton,
  PrevButton,
  StepperDot,
  DotsWrapper,
  Title,
  Secondary,
  Warn,
  InputUI,
  Footer,
  FormLabel,
  AllocateSlider,
  PerformanceCard,
  PerformanceContent,
  PerformanceTitle,
  PerformanceDescription,
  Area,
  MaxLength,
  InputLabel,
  ButtonsCoontainer,
  CardsRow,
  RiskyFundTypeCard,
  StandardFundTypeCard,
} from "modals/CreateFund/styled"
import { SubContainer, NavIcon } from "./styled"

export const BasicInfo: React.FC = () => {
  return (
    <SubContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Flex full dir="column" ai="flex-start">
        <Secondary>Basic settings for your fund.</Secondary>
        <Warn>Basic settings for fund cannot be changed after creation.</Warn>
        <InputUI label="Token name" onChange={() => {}} name="_name" />
        <InputUI label="Ticker symbol" onChange={() => {}} name="_symbol" />
      </Flex>

      <Flex p="50px 0 0" full dir="column" ai="flex-start">
        <InputLabel>Choose type of your fund</InputLabel>
        <SelectUI label="Type of fund" />
      </Flex>
    </SubContainer>
  )
}

export const SelectToken = () => {
  return (
    <SubContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <TokenSelect />
    </SubContainer>
  )
}

export const AboutManagers = () => {
  const [isManagersAdded, setManagers] = useState(false)
  return (
    <SubContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      jc="flex-start"
    >
      <Secondary>The manager and the creator have equal permissions.</Secondary>
      <Area name="_fund-strategy" onChange={() => {}} />

      <InputUI
        label="Fund description"
        onChange={() => {}}
        name="_fund-description"
      />
      <Flex p="25px 0 0" full>
        <WalletCard token="0xde4EE8057785A7e8e800Db58F9784845A5C2Cbd6" />
      </Flex>
      <Flex p="40px 0 0" full ai="center">
        <FormLabel>Add fund managers</FormLabel>
        <Switch
          isOn={isManagersAdded}
          name="_managersRestricted"
          onChange={(n, v) => setManagers(v)}
        />
      </Flex>
      <Flex
        p="15px 0 15px"
        initial={isManagersAdded ? "visible" : "hidden"}
        variants={opacityVariants}
        transition={{ duration: 0.4 }}
        animate={isManagersAdded ? "visible" : "hidden"}
        full
        dir="column"
      >
        <AddressChips limit={100} label="0x..." />
        <Flex p="15px 0 0" dir="column" full>
          <Secondary>
            By adding addresses to this whitelist, you authorize the owners to
            invest from these addresses in the fund.
          </Secondary>
          <Secondary>
            Keep in mind that when this function is enabled, addresses that have
            not been added to the following whitelist won’t be able to
            participate in investing in the fund.
          </Secondary>
        </Flex>
      </Flex>
    </SubContainer>
  )
}

export const InvestmentsAndRestrictions = () => {
  const [isLimited, setLimited] = useState(false)
  return (
    <SubContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      jc="flex-start"
    >
      <Secondary>
        It is always available to set optional limits on who can invest.
        Remember, you can change your settings in your account at any time.
      </Secondary>
      <InputUI
        label="Minimum investment amount"
        onChange={() => {}}
        name="_name"
      />
      <InputUI label="Unlimited emission" onChange={() => {}} name="_name" />
      <Flex p="40px 0 0" full ai="center">
        <FormLabel>Limit who can invest</FormLabel>
        <Switch
          isOn={isLimited}
          name="_investorRestricted"
          onChange={(n, v) => setLimited(v)}
        />
      </Flex>
      <Flex
        p="15px 0 15px"
        initial={isLimited ? "visible" : "hidden"}
        variants={opacityVariants}
        transition={{ duration: 0.4 }}
        animate={isLimited ? "visible" : "hidden"}
        full
        dir="column"
      >
        <AddressChips limit={100} label="0x..." />
        <Flex p="15px 0 0" dir="column" full>
          <Secondary>
            By adding addresses to this whitelist, you authorize the owners to
            invest from these addresses in the fund.
          </Secondary>
          <Secondary>
            Keep in mind that when this function is enabled, addresses that have
            not been added to the following whitelist won’t be able to
            participate in investing in the fund.
          </Secondary>
        </Flex>
      </Flex>
    </SubContainer>
  )
}

const sliderPropsByPeriodType = {
  "1": {
    min: 20,
    max: 30,
    customMarks: {
      20: "20%",
      25: "25%",
      30: "30%",
    },
  },
  "2": {
    min: 20,
    max: 50,
    customMarks: {
      20: "20%",
      30: "30%",
      40: "40%",
      50: "50%",
    },
  },
  "3": {
    min: 20,
    max: 70,
    customMarks: {
      20: "20%",
      30: "30%",
      40: "40%",
      50: "50%",
      60: "60%",
      70: "70%",
    },
  },
}

export const Fees = () => {
  const [selectedPeriod, setPeriod] = useState("1")
  return (
    <SubContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      jc="flex-start"
    >
      <Warn>*Fees settings cannot be changed after creation.</Warn>
      <Flex full p="20px 0 10px">
        <FormLabel>Performance Fee</FormLabel>
      </Flex>

      <PerformanceCard onClick={() => setPeriod("1")}>
        <Flex p="15px 5px 15px 15px">
          <RadioButton
            selected={selectedPeriod}
            value="1"
            onChange={setPeriod}
          />
        </Flex>
        <PerformanceContent>
          <PerformanceTitle>
            1 Months Performance Fee withdrawal
          </PerformanceTitle>
          <PerformanceDescription>
            Performance Fee limits of 20% to 30%
          </PerformanceDescription>
        </PerformanceContent>
      </PerformanceCard>
      <PerformanceCard onClick={() => setPeriod("2")}>
        <Flex p="15px 5px 15px 15px">
          <RadioButton
            selected={selectedPeriod}
            value="2"
            onChange={setPeriod}
          />
        </Flex>
        <PerformanceContent>
          <PerformanceTitle>
            3 Months Performance Fee withdrawal
          </PerformanceTitle>
          <PerformanceDescription>
            Performance Fee limits of 20% to 30%
          </PerformanceDescription>
        </PerformanceContent>
      </PerformanceCard>
      <PerformanceCard onClick={() => setPeriod("3")}>
        <Flex p="15px 5px 15px 15px">
          <RadioButton
            selected={selectedPeriod}
            value="3"
            onChange={setPeriod}
          />
        </Flex>
        <PerformanceContent>
          <PerformanceTitle>
            12 Months Performance Fee withdrawal
          </PerformanceTitle>
          <PerformanceDescription>
            Performance Fee limits of 20% to 30%
          </PerformanceDescription>
        </PerformanceContent>
      </PerformanceCard>

      <AllocateSlider
        {...sliderPropsByPeriodType[selectedPeriod]}
        name="_comm"
        initial={30}
        onChange={() => {}}
      />
      <Secondary>
        Performance Fee will be сollected by the trader depending on the results
        of management and strictly in the case of profitable PnL, in another
        case, the manager won’t receive his commission. He has to generate
        profit comparing to the previous settlement period for fee receiving.
      </Secondary>
      <Secondary>
        The 1st day of each month is a settlement day and is mandatory.
      </Secondary>

      <br />
      <Secondary>
        *** 30% of the trader&apos;s reward received is charged by the platform.{" "}
        <External href="https://dexe.network">Read more.</External>
      </Secondary>
    </SubContainer>
  )
}

export const Summary = () => {
  return (
    <SubContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      jc="flex-start"
    >
      <Secondary>
        Please make sure ti check all the entered data bellow
      </Secondary>
      <Warn>Trade settings cannot be changed after creation.</Warn>
      <CardsRow>
        <OneValueCard label="Name of Fund" value="Big Trade" />
        <OneValueCard label="Owner" value="0x8e8..8382" />
      </CardsRow>
      <CardsRow>
        <OneValueCard label="Base token" value="DEXE" />
        <OneValueCard label="Ticker symbol" value="ISDX" />
      </CardsRow>
      <CardsRow>
        <OneValueCard label="Own investments" value="1020 DEXE" />
        <OneValueCard label="Min. invest amount" value="120 DEXE" />
      </CardsRow>
      <CardsRow>
        <OneValueCard label="Emission" value="Unlim. Emission" />
        <OneValueCard label="Limit who can invest" value="50 accounts" />
      </CardsRow>
    </SubContainer>
  )
}

export const Dot = ({ to }) => {
  const match = useRouteMatch({
    path: to,
    exact: true,
  })

  return <StepperDot to={to} type={match ? "ACTIVE" : "DEFAULT"} />
}

const steps = [
  "/new-fund/basic-info",
  "/new-fund/select-token",
  "/new-fund/about-managers",
  "/new-fund/restrictions",
  "/new-fund/fees",
  "/new-fund/summary",
]

const stepNamings = [
  "Create a new fund",
  "Select a token",
  "About mannagers",
  "Investment",
  "Performance Fee",
  "Summary",
]

export const HeaderGroup = () => {
  const match = useRouteMatch({
    path: steps,
    exact: true,
  })
  const index =
    match && steps.indexOf(match.path) !== -1 ? steps.indexOf(match.path) : 0
  return (
    <Flex
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.29, 0.98, 0.29, 1] }}
      full
      ai="flex-start"
    >
      <NavIcon>{index === 0 && <img src={swipeLeft} alt="left" />}</NavIcon>
      <Title>{stepNamings[index]}</Title>
      <NavIcon>{/* <img src={swipeRight} alt="right" /> */}</NavIcon>
    </Flex>
  )
}

export const ButtonsGroup = () => {
  const match = useRouteMatch({
    path: steps,
    exact: true,
  })
  const index =
    match && steps.indexOf(match.path) !== -1 ? steps.indexOf(match.path) : 0

  return (
    <Footer
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.29, 0.98, 0.29, 1] }}
    >
      <DotsWrapper>
        {steps.map((v) => (
          <Dot key={v} to={v} />
        ))}
      </DotsWrapper>

      <ButtonsCoontainer>
        {index !== 0 && (
          <To to={steps[index - 1]}>
            <PrevButton>Previous</PrevButton>
          </To>
        )}
        {index === 5 ? (
          <NextButton>Finish</NextButton>
        ) : (
          <To to={steps[index + 1]}>
            <NextButton>Next</NextButton>
          </To>
        )}
      </ButtonsCoontainer>
    </Footer>
  )
}
