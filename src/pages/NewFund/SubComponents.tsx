import React, { useState, useEffect } from "react"
import { useRouteMatch } from "react-router-dom"
import { Flex, External, To } from "theme"
import WalletCard from "components/WalletCard"
import AddressChips from "components/AddressChips"
import TokenSelect from "components/TokenSelect"
import Switch from "components/Switch"
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
  InputButton,
  ButtonsCoontainer,
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
        <Warn>*Basic settings cannot be changed after creation.</Warn>
      </Flex>

      <Flex full dir="column" ai="flex-start">
        <InputUI label="Token name" onChange={() => {}} name="_name" />
        <InputUI label="Ticker symbol" onChange={() => {}} name="_symbol" />
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
      <TokenSelect bodyRef={null} />
    </SubContainer>
  )
}

export const AboutManagers = () => {
  return (
    <SubContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Secondary>The manager and the creator have equal permissions.</Secondary>
      <Warn>*A manager cannot be removed later.</Warn>
      <Flex p="25px 0 0" full>
        <WalletCard token="0xde4EE8057785A7e8e800Db58F9784845A5C2Cbd6" />
      </Flex>

      <InputUI
        label="Own investments"
        onChange={() => {}}
        name="own_investment"
      />

      <AddressChips limit={5} label="Add a new mannager" />
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
    >
      <Warn>
        *It is always available to set optional limits on who can invest.
        Remember, you can change your settings in your account at any time.
      </Warn>
      <Flex p="15px 0" dir="column" full ai="flex-start">
        <FormLabel>Own investments</FormLabel>
        <Secondary>
          Allocate you funds. Will be locked in your account after pool
          creation.
        </Secondary>
        <Flex full ai="center">
          <InputUI label="0.00" onChange={() => {}} name="_name" />
        </Flex>
      </Flex>
      <Flex p="15px 0" dir="column" full ai="flex-start">
        <FormLabel>Minimum investment amount</FormLabel>
        <Secondary>Restrict investorm to deposit minimum amount.</Secondary>
        <Flex full ai="center">
          <InputUI label="0.00" onChange={() => {}} name="_name" />
        </Flex>
      </Flex>
      <Flex p="15px 0" full ai="center">
        <FormLabel>Limit who can invest</FormLabel>
        <Switch
          isOn={isLimited}
          name="_investorRestricted"
          onChange={(n, v) => setLimited(v)}
        />
      </Flex>
      <Flex
        initial={isLimited ? "visible" : "hidden"}
        variants={opacityVariants}
        transition={{ duration: 0.4 }}
        animate={isLimited ? "visible" : "hidden"}
        full
        dir="column"
      >
        <Secondary>
          By adding addresses to this whitelist, you authorize the owners to
          invest from these addresses in the fund.
        </Secondary>
        <Secondary>
          Keep in mind that when this function is enabled, addresses that have
          not been added to the following whitelist won’t be able to participate
          in investing in the fund.
        </Secondary>
        <AddressChips label="0x..." />
      </Flex>
    </SubContainer>
  )
}

export const Fees = () => {
  return (
    <SubContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Warn>*Fees settings cannot be changed after creation.</Warn>
      <Flex full p="20px 0 10px">
        <FormLabel>Performance Fee</FormLabel>
      </Flex>

      <AllocateSlider name="_comm" initial={30} onChange={() => {}} />
      <Secondary>
        Performance Fee will be сollected by the trader depending on the results
        of management and strictly in the case of profitable PnL, in another
        case, the manager won’t receive his commission. He has to generate
        profit comparing to the previous settlement period for fee receiving.
      </Secondary>
      <Secondary>
        The 1st day of each month is a settlement day and is mandatory.
      </Secondary>

      <Secondary>
        *** 30% of the trader&apos;s reward received is charged by the platform.{" "}
        <External href="https://dexe.network">Read more.</External>
      </Secondary>
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
  "Basic information",
  "Select token",
  "About mannagers",
  "Investment and restrictions",
  "Fees",
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
      <NavIcon>
        <img src={swipeLeft} alt="left" />
      </NavIcon>
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
