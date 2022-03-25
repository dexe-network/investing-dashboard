import React, { useState, useEffect, useRef, useCallback } from "react"
import { useHistory, useRouteMatch } from "react-router-dom"
import axios from "axios"
import { format } from "date-fns"
import { External, Flex, Text, To } from "theme"
import { useWeb3React } from "@web3-react/core"
import WalletCard from "components/WalletCard"
import AddressChips from "components/AddressChips"
import RadioButton from "components/RadioButton"
import Avatar from "components/Avatar"
import Switch from "components/Switch"
import Button, { BorderedButton } from "components/Button"
import Search from "components/Search"
import DescriptionCard from "components/DescriptionCard"
import Popover from "components/Popover"
import TokenIcon from "components/TokenIcon"
import OneValueCard from "components/OneValueCard"
import { opacityVariants } from "motion/variants"
import { AppState } from "state"
import {
  formatNumber,
  formatBigNumber,
  shortenAddress,
  bigify,
  getAllowance,
  delay,
} from "utils"
import { useSelector } from "react-redux"
import swipeLeft from "assets/icons/swipe-arrow-left.svg"
import warnBig from "assets/icons/warn-big.svg"
import UserIcon from "assets/icons/User"
import EmissionIcon from "assets/icons/Emission"
import LimitInvestIcon from "assets/icons/LimitInvest"
import pencil from "assets/icons/pencil-edit.svg"
import { useCreateFundContext } from "context/CreateFundContext"
import { PricefeedState } from "state/pricefeed/reducer"
import useContract, { useERC20, usePancakeFactory } from "hooks/useContract"
import { ContractsState } from "state/contracts/reducer"
import Payload from "components/Payload"
import whitelisted from "./whitelisted"
import {
  AvatarWrapper,
  HintText,
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
  ErrorText,
  WhitelistTokensContainer,
  BaseFullList,
  BaseFullItem,
  BasePrice,
  BaseTokenSymbol,
  BaseTokenName,
  BaseBalance,
  NoTokensPlaceholder,
  HintTextCentered,
  PopoverText,
} from "modals/CreateFund/styled"
import {
  FormLabelGreen,
  Input,
  IconInput,
  AreaInput,
} from "components/Form/styled"
import { SubContainer, NavIcon, BalanceText } from "./styled"
import { TraderPool, TraderPoolFactory } from "abi"
import { addFileMetadata } from "utils/ipfs"
import { BigNumber, ethers } from "ethers"
import Error from "components/Error"
import { selectWhitelist } from "state/pricefeed/selectors"

const performanceFees = [
  {
    id: 0,
    title: "1 Month performance Fee withdrawal",
    description: "Performance Fee limits of 20% to 30%",
    monthes: 1,
  },
  {
    id: 1,
    title: "3 Months performance Fee withdrawal",
    description: "Performance Fee limits of 20% to 50%",
    monthes: 3,
  },
  {
    id: 2,
    title: "12 Months performance Fee withdrawal",
    description: "Performance Fee limits of 20% to 70%",
    monthes: 12,
  },
]

export const BasicInfo: React.FC = () => {
  const [isNameFocused, setNameFocused] = useState(false)
  const [isSymbolFocused, setSymbolFocused] = useState(false)
  const { fundType, fundName, fundSymbol, avatarBlobString, handleChange } =
    useCreateFundContext()

  console.log(avatarBlobString)

  return (
    <SubContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Flex full dir="column" ai="flex-start">
        <Flex full jc="center">
          <AvatarWrapper>
            <Avatar onCrop={handleChange} showUploader size={85} />
          </AvatarWrapper>
        </Flex>
        <Flex full dir="column" ai="flex-start">
          <HintText>
            Basic settings for fund cannot be changed after creation.
          </HintText>
          <Flex dir="column" full>
            <InputUI
              defaultValue={fundName}
              onFocus={() => setNameFocused(true)}
              onBlur={() => setNameFocused(false)}
              width="100%"
              customPlaceholder="xxxxxx"
              label="Fund Name"
              onChange={(n, v) => handleChange("fundName", v)}
              name="fundName"
            />
            <InputUI
              defaultValue={fundSymbol}
              onFocus={() => setSymbolFocused(true)}
              onBlur={() => setSymbolFocused(false)}
              width="100%"
              label="Symbol"
              customPlaceholder="xxx"
              onChange={handleChange}
              name="fundSymbol"
            />
          </Flex>
          <Flex dir="column" ai="flex-start">
            <ErrorText
              initial="hidden"
              animate={isNameFocused ? "visible" : "hidden"}
              variants={{
                visible: { opacity: 1, display: "block" },
                hidden: {
                  opacity: 0,
                  transitionEnd: { display: "none" },
                },
              }}
              transition={{ duration: 0.2 }}
            >
              Fund name can contain a max. of 20 characters
            </ErrorText>
            <ErrorText
              initial="hidden"
              animate={isSymbolFocused ? "visible" : "hidden"}
              variants={{
                visible: { opacity: 1, display: "block" },
                hidden: {
                  opacity: 0,
                  transitionEnd: { display: "none" },
                },
              }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              Fund symbol can contain a max. of 5 characters
            </ErrorText>
          </Flex>
        </Flex>
      </Flex>

      <Flex p="50px 0 0" full dir="column" ai="flex-start">
        <HintText>Choose type of your fund</HintText>
        <SelectUI
          type={fundType}
          handleSelect={(value: any) => handleChange("fundType", value)}
        />
      </Flex>
    </SubContainer>
  )
}

const Token: React.FC<{
  address: string
  symbol: string
  name: string
  decimals: number
}> = ({ address, symbol, name, decimals }) => {
  const [price, setPrice] = useState(0)
  const { handleChange, baseToken } = useCreateFundContext()
  const [contract, tokenData, tokenBalance] = useERC20(address)
  const pancakeFactory = usePancakeFactory()
  const USD = useSelector<AppState, ContractsState["USD"]>(
    (state) => state.contracts.USD
  )

  // TODO: make as custom hook, fix chain id errors
  // get price for specific address token
  useEffect(() => {
    if (!address) return
    if (!pancakeFactory) return
    if (!USD) return
    ;(async () => {
      try {
        // const pairAddress = await pancakeFactory.getPair(address, USD)

        // if (pairAddress === "0x0000000000000000000000000000000000000000") {
        //   // TODO: try to handle another USD token
        //   return
        // }

        // const result = await axios.get(
        //   `https://api-2.kattana.trade/rates/pair/pancakeswap/${pairAddress}`
        // )

        // if (!!result && !!result.data && result.data !== null) {
        //   console.log(result.data.price_usd)
        //   setPrice(result.data.price_usd)
        // }
        setPrice(0)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [address, pancakeFactory, USD])

  return (
    <BaseFullItem
      active={baseToken.address === address}
      key={address}
      onClick={() =>
        handleChange("baseToken", { address, symbol, name, decimals })
      }
      full
    >
      <TokenIcon address={address} size={32} />
      <Flex dir="column" ai="flex-start" p="3px 0 0 3px">
        <BaseTokenSymbol>{symbol}</BaseTokenSymbol>
        <BaseTokenName>{name}</BaseTokenName>
      </Flex>
      <Flex m="0 0 0 auto" dir="column" ai="flex-end">
        <BaseBalance>{formatBigNumber(tokenBalance, decimals, 2)}</BaseBalance>
        <BasePrice>
          $
          {formatNumber(
            (parseFloat(formatBigNumber(tokenBalance, 18)) * price).toString()
          )}
        </BasePrice>
      </Flex>
    </BaseFullItem>
  )
}

// TODO: impelement INDEXED-DB
// TODO: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB#about_this_document
export const SelectToken = () => {
  const MIN_LIST_HEIGHT = 250
  const [query, setQuery] = useState("")
  const [listHeight, setHeight] = useState(MIN_LIST_HEIGHT)
  const { baseToken, handleChange } = useCreateFundContext()
  const headRef = useRef<HTMLDivElement | null>(null)
  const handleSearch = useCallback((v: string) => setQuery(v), [])
  const whitelisted = useSelector(selectWhitelist)
  const list = whitelisted.filter((v) =>
    query !== "" ? v.address.toLowerCase() === query.toLowerCase() : true
  )

  // TODO: remove selected address if serarched results does not satisfy selected baseToken
  useEffect(() => {
    if (!baseToken.address) return

    const i = list.filter(
      (t) => t.address.toLowerCase() === baseToken.address.toLowerCase()
    )

    if (!i.length) {
      handleChange("baseToken", {
        address: "",
        name: "",
        symbol: "",
        decimals: 0,
      })
    }
  }, [list, baseToken, handleChange])

  // TODO: listen to resize
  useEffect(() => {
    if (!headRef.current) return

    if (listHeight === MIN_LIST_HEIGHT) {
      const h =
        window.innerHeight -
        headRef.current.getBoundingClientRect().height -
        370
      setTimeout(() => setHeight(h), 300)
    }
  }, [headRef, listHeight])

  const noTokensFound = (
    <NoTokensPlaceholder>
      <img src={warnBig} alt="Warn" />
      <HintTextCentered>
        No tokens found. Please, check the spelling of the token address or
        choose a token from the list.
      </HintTextCentered>
    </NoTokensPlaceholder>
  )

  return (
    <SubContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <HintText>
        Please select the token that will be the base asset. The base token
        cannot be changed in the future.
      </HintText>
      <WhitelistTokensContainer>
        <Flex p="0 16px" ref={headRef} dir="column" full>
          <Search
            value={query}
            handleChange={handleSearch}
            placeholder="Name, Ticker, Address"
            height="35px"
          />
        </Flex>

        <Flex dir="column" ai="flex-start" full>
          <Flex p="28px 16px 15px 16px">
            <InputLabel
              initial="hidden"
              animate={!!list.length ? "visible" : "hidden"}
              variants={{
                hidden: {
                  opacity: 0,
                },
                visible: {
                  opacity: 1,
                },
              }}
            >
              Whitelisted tokens
            </InputLabel>
          </Flex>
          <BaseFullList
            animate={listHeight !== 0 ? "visible" : "hidden"}
            transition={{
              delay: 0.3,
              duration: 0.5,
              ease: [0.29, 0.98, 0.29, 1],
            }}
            variants={{
              visible: {
                maxHeight: `${listHeight}px`,
                minHeight: `${listHeight}px`,
              },
              hidden: { maxHeight: `${MIN_LIST_HEIGHT}px` },
            }}
            initial="hidden"
          >
            {list.map(
              (token: {
                address: string
                symbol: string
                name: string
                decimals: number
              }) => (
                <Token key={token.address} {...token} />
              )
            )}

            {!list.length && query !== "" && noTokensFound}
          </BaseFullList>
        </Flex>
      </WhitelistTokensContainer>
    </SubContainer>
  )
}

export const AboutManagers = () => {
  const { description, strategy, baseToken, managers, handleChange } =
    useCreateFundContext()
  const [isManagersAdded, setManagers] = useState(!!managers.length)
  const [hideMessage, setHideMessage] = useState(false)
  const [showPopup, setPopupState] = useState(false)

  // listen to toggle, run show popup function
  useEffect(() => {
    const sessionShown =
      sessionStorage.getItem("about-managers-popup-shown") === "true"
    const isShown =
      localStorage.getItem("about-managers-popup-shown") === "true"

    if (!isManagersAdded || sessionShown || isShown) return

    showWarnPopup()
  }, [isManagersAdded])

  const showWarnPopup = () => {
    sessionStorage.setItem("about-managers-popup-shown", "true")
    setPopupState(true)
  }

  const submitWarnPopup = () => {
    if (hideMessage) {
      localStorage.setItem("about-managers-popup-shown", "true")
    }
    setPopupState(false)
  }

  return (
    <SubContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      jc="flex-start"
    >
      <Flex p="0 0 25px" full>
        <WalletCard symbol={baseToken.symbol} token={baseToken.address} />
      </Flex>
      <HintText>
        You can change this settings in your account at any time.
      </HintText>
      <Area
        defaultValue={description}
        name="description"
        placeholder="Fund description"
        onChange={handleChange}
      />
      <Area
        defaultValue={strategy}
        name="strategy"
        placeholder="Fund strategy"
        onChange={handleChange}
      />
      <Flex p="40px 0 0" full ai="center">
        <Flex ai="center">
          <UserIcon active={isManagersAdded} />
          <FormLabel>Add fund managers</FormLabel>
        </Flex>
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
        <AddressChips
          items={managers}
          onChange={(v) => handleChange("managers", v)}
          limit={100}
          label="0x..."
        />
        <Flex p="15px 0 0" dir="column" full>
          <HintText>
            By adding addresses to this whitelist, you authorize the owners to
            invest from these addresses in the fund.
          </HintText>
          <HintText>
            Keep in mind that when this function is enabled, addresses that have
            not been added to the following whitelist won’t be able to
            participate in investing in the fund.
          </HintText>
        </Flex>
      </Flex>

      <Popover
        title="About managers"
        isOpen={showPopup}
        toggle={setPopupState}
        contentHeight={450}
      >
        <Flex dir="column" full p="0 37px">
          <PopoverText>
            All fund managers will have almost the same rights as the founder of
            its fund, with the exception of the risk proposal creation.
            It&apos;ll be possible for the fund managers to interact with
            already created risk proposals.
          </PopoverText>
          <Flex p="20px 0 0" onClick={() => setHideMessage(!hideMessage)}>
            {/* <RadioButton
              selected={hideMessage && "hide"}
              onChange={() => setHideMessage(!hideMessage)}
              value="hide"
            /> */}
            <PopoverText align="left">
              Don&apos;t show this message in future
            </PopoverText>
          </Flex>
        </Flex>
        <Flex p="25px 37px 0" full>
          <Button onClick={submitWarnPopup} full>
            Got it
          </Button>
        </Flex>
      </Popover>
    </SubContainer>
  )
}

export const InvestmentsAndRestrictions = () => {
  const {
    fundSymbol,
    baseToken,
    investors,
    ownInvestments,
    minimalInvestment,
    totalLPEmission,
    handleChange,
  } = useCreateFundContext()
  const [isEmissionLimited, setEmission] = useState(totalLPEmission !== "")
  const [isFundPrivate, setPrivate] = useState(!!investors.length)
  const [showPopup, setPopupState] = useState(false)
  const [token, tokenData, userBalance] = useERC20(baseToken.address)

  // listen to toggle, run show popup function
  useEffect(() => {
    const sessionShown =
      sessionStorage.getItem("about-investors-popup-shown") === "true"
    const isShown =
      localStorage.getItem("about-investors-popup-shown") === "true"

    if (!isFundPrivate || sessionShown || isShown) return

    showWarnPopup()
  }, [isFundPrivate])

  const showWarnPopup = () => {
    sessionStorage.setItem("about-investors-popup-shown", "true")
    setPopupState(true)
  }

  const submitWarnPopup = () => {
    setPopupState(false)
  }

  return (
    <SubContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      jc="flex-start"
    >
      <HintText>
        It is always available to set optional limits on who can invest.
        Remember, you can change your settings in your account at any time.
      </HintText>
      <InputUI
        type="number"
        customPlaceholder={`XXX ${baseToken.symbol}`}
        label="Own investments"
        onChange={handleChange}
        name="ownInvestments"
        defaultValue={ownInvestments}
        icon={
          <BalanceText>
            {`${formatBigNumber(userBalance, 18)} ${baseToken.symbol}`}
          </BalanceText>
        }
      />
      <InputUI
        type="number"
        customPlaceholder={`XXX ${baseToken.symbol}`}
        label="Minimum investment amount"
        onChange={handleChange}
        name="minimalInvestment"
        defaultValue={minimalInvestment}
      />
      <Flex p="40px 0 0" full ai="center">
        <Flex>
          <EmissionIcon active={isEmissionLimited} />
          <FormLabel>Limited Emission</FormLabel>
        </Flex>
        <Switch
          isOn={isEmissionLimited}
          name="emission"
          onChange={(n, v) => setEmission(v)}
        />
      </Flex>
      <Flex
        full
        initial={isEmissionLimited ? "visible" : "hidden"}
        variants={opacityVariants}
        transition={{ duration: 0.4 }}
        animate={isEmissionLimited ? "visible" : "hidden"}
      >
        <InputUI
          type="number"
          customPlaceholder={`XXX LP-${fundSymbol}`}
          label="Emission"
          onChange={handleChange}
          name="totalLPEmission"
          defaultValue={totalLPEmission}
        />
      </Flex>
      <Flex p="40px 0 0" full ai="center">
        <Flex>
          <LimitInvestIcon active={isFundPrivate} />
          <FormLabel>Limit who can invest</FormLabel>
        </Flex>
        <Switch
          isOn={isFundPrivate}
          name="public"
          onChange={(n, v) => setPrivate(v)}
        />
      </Flex>
      <Flex
        p="15px 0 15px"
        initial={isFundPrivate ? "visible" : "hidden"}
        variants={opacityVariants}
        transition={{ duration: 0.4 }}
        animate={isFundPrivate ? "visible" : "hidden"}
        full
        dir="column"
      >
        <AddressChips
          items={investors}
          onChange={(v) => handleChange("investors", v)}
          limit={100}
          label="0x..."
        />
        <Flex p="15px 0 0" dir="column" full>
          <HintText>
            By adding addresses to this whitelist, you authorize the owners to
            invest from these addresses in the fund.
          </HintText>
          <HintText>
            Keep in mind that when this function is enabled, addresses that have
            not been added to the following whitelist won’t be able to
            participate in investing in the fund.
          </HintText>
        </Flex>
      </Flex>
      <Popover
        title="Use previous list of investors ?"
        isOpen={showPopup}
        toggle={setPopupState}
        contentHeight={370}
      >
        <Flex dir="column" full p="0 37px">
          <PopoverText>
            You can use the limited list of investors created by the previous
            fund. You can also add and remove investors from this list. Or you
            can create a new limited list for this fund.
          </PopoverText>
        </Flex>
        <Flex p="25px 37px 0" full>
          <Flex p="0 18px 0 0">
            <BorderedButton size="small">New</BorderedButton>
          </Flex>
          <Button size="small" onClick={submitWarnPopup} full>
            Use latest
          </Button>
        </Flex>
      </Popover>
    </SubContainer>
  )
}

const sliderPropsByPeriodType = {
  "0": {
    min: 20,
    max: 30,
    customMarks: {
      20: "20%",
      25: "25%",
      30: "30%",
    },
  },
  "1": {
    min: 20,
    max: 50,
    customMarks: {
      20: "20%",
      30: "30%",
      40: "40%",
      50: "50%",
    },
  },
  "2": {
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
  const { commissionPercentage, commissionPeriod, handleChange } =
    useCreateFundContext()
  const [isReadMoreOpened, toggleReadMore] = useState(false)
  return (
    <SubContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      jc="flex-start"
    >
      <Warn>*Fees settings cannot be changed after creation.</Warn>

      {performanceFees.map(({ id, title, description }) => (
        <PerformanceCard
          key={id}
          onClick={() => handleChange("commissionPeriod", id)}
        >
          <Flex p="17px 5px 24px 16px">
            {/* <RadioButton
              selected={commissionPeriod}
              value={id}
              onChange={() => handleChange("commissionPeriod", id)}
            /> */}
          </Flex>
          <PerformanceContent>
            <PerformanceTitle>{title}</PerformanceTitle>
            <PerformanceDescription>{description}</PerformanceDescription>
          </PerformanceContent>
        </PerformanceCard>
      ))}

      <Flex full p="40px 0 0">
        <HintText>
          Choose the exact performance fee within the selected period
        </HintText>
      </Flex>

      <AllocateSlider
        {...sliderPropsByPeriodType[commissionPeriod]}
        name="commissionPercentage"
        initial={commissionPercentage}
        onChange={handleChange}
      />
      <HintText onClick={() => toggleReadMore(!isReadMoreOpened)}>
        Performance Fee will be сollected by the trader depending on the results
        of management and strictly in the case of profitable PnL, in another
        case, the manager won&apos;t receive his commission. He has to generate
        profit compa{isReadMoreOpened ? "" : "... "}
        {isReadMoreOpened ? (
          <>
            ring to the previous settlement period for fee receiving. Withdrawal
            of assets by a trader is possible only if all positions are closed
            <Flex p="8px 0 0">
              30% of revenue gained by trader is charged by the platform.
              Performance Fee will be сollected by the trader depending on the
              results of management and strictly in the case of profitable PnL,
              in another case, the manager won&apos;t receive his commission. He
              has to generate profit comparing to the previous settlement period
              for fee receiving. Withdrawal of assets by a trader is possible
              only if all positions are closed.
            </Flex>
            <Flex p="8px 0 0">
              30% of revenue gained by trader is charged by the platform.
            </Flex>
          </>
        ) : (
          <Text fs="italic" color="#878d9d" fw={300} fz={12}>
            read more
          </Text>
        )}
      </HintText>
    </SubContainer>
  )
}

export const Summary = () => {
  const {
    fundType,
    fundName,
    fundSymbol,
    baseToken,
    managers,
    investors,
    description,
    ownInvestments,
    minimalInvestment,
    commissionPeriod,
    commissionPercentage,
    totalLPEmission,
    strategy,
    handleChange,
  } = useCreateFundContext()
  const [isError, setError] = useState(false)
  const [isManagersAdded, setManagers] = useState(!!managers.length)
  const [isFundPrivate, setPrivate] = useState(!!investors.length)
  const [isEmissionLimited, setEmission] = useState(totalLPEmission !== "")
  const { account } = useWeb3React()
  const [token, baseData] = useERC20(baseToken.address)
  const today = format(new Date(), "MMM d, yyyy")

  return (
    <SubContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      jc="flex-start"
    >
      <Secondary>
        Please make sure to check all the entered data bellow
      </Secondary>
      <Warn>Trade settings cannot be changed after creation.</Warn>
      <Flex p="32px 0 0">
        <FormLabelGreen>Basic settings</FormLabelGreen>
      </Flex>
      <CardsRow>
        <Input label="Owner" value={shortenAddress(account, 3)} />
        <Input label="Basic token" value={baseData?.symbol} />
      </CardsRow>
      <CardsRow>
        <Input label="Created" value={today} />
        <Input label="Fund type" value={fundType} />
      </CardsRow>
      <CardsRow>
        <Input
          label={`Performance fee ${
            performanceFees[commissionPeriod].monthes
          } ${commissionPeriod === 0 ? "month" : "monthes"}`}
          value={`${commissionPercentage}%`}
        />
      </CardsRow>

      <Flex p="32px 0 0">
        <FormLabelGreen>Investment settings</FormLabelGreen>
      </Flex>
      <CardsRow>
        <IconInput
          label="Min. investment amount"
          value={minimalInvestment}
          symbol={baseData?.symbol}
        />
      </CardsRow>
      <CardsRow>
        <AreaInput
          label="Fund strategy"
          value={`${
            !!strategy.length ? `${1000 - strategy.length} / 1000` : "1000"
          } symbols`}
          description={strategy}
        />
      </CardsRow>
      <CardsRow>
        <AreaInput
          label="Fund description"
          value={`${
            !!description.length
              ? `${1000 - description.length} / 1000`
              : "1000"
          } symbols`}
          description={description}
        />
      </CardsRow>

      <Flex p="25px 0 16px" full ai="center">
        <Flex ai="center">
          <UserIcon active={isManagersAdded} />
          <FormLabel>Fund managers</FormLabel>
        </Flex>
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
        <AddressChips
          items={managers}
          onChange={(v) => handleChange("managers", v)}
          limit={100}
          label="0x..."
        />
      </Flex>
      <Flex p="16px 0 16px" full ai="center">
        <Flex>
          <EmissionIcon active={isEmissionLimited} />
          <FormLabel>Limited Emission</FormLabel>
        </Flex>
        <Switch
          isOn={isEmissionLimited}
          name="emission"
          onChange={(n, v) => setEmission(v)}
        />
      </Flex>
      <Flex
        full
        initial={isEmissionLimited ? "visible" : "hidden"}
        variants={opacityVariants}
        transition={{ duration: 0.4 }}
        animate={isEmissionLimited ? "visible" : "hidden"}
      >
        <InputUI
          type="number"
          customPlaceholder={`XXX LP-${fundSymbol}`}
          label="Emission"
          onChange={handleChange}
          name="totalLPEmission"
          defaultValue={totalLPEmission}
        />
      </Flex>
      <Flex p="16px 0 16px" full ai="center">
        <Flex>
          <LimitInvestIcon active={isFundPrivate} />
          <FormLabel>Limit who can invest</FormLabel>
        </Flex>
        <Switch
          isOn={isFundPrivate}
          name="public"
          onChange={(n, v) => setPrivate(v)}
        />
      </Flex>
      <Flex
        p="15px 0 15px"
        initial={isFundPrivate ? "visible" : "hidden"}
        variants={opacityVariants}
        transition={{ duration: 0.4 }}
        animate={isFundPrivate ? "visible" : "hidden"}
        full
        dir="column"
      >
        <AddressChips
          items={investors}
          onChange={(v) => handleChange("investors", v)}
          limit={100}
          label="0x..."
        />
      </Flex>
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
  "Basic settings",
  "Select a token",
  "About managers",
  "Investment",
  "Performance Fee",
  "Summary",
]

export const HeaderGroup = () => {
  const match = useRouteMatch({
    path: steps,
    exact: true,
  })
  const history = useHistory()
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
      <NavIcon onClick={() => history.goBack()}>
        {index === 0 && <img src={swipeLeft} alt="left" />}
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
  const [isSubmiting, setSubmiting] = useState(false)
  const [isError, setError] = useState(false)
  const history = useHistory()
  const traderPoolFactoryAddress = useSelector<
    AppState,
    ContractsState["TraderPoolFactory"]
  >((state) => state.contracts.TraderPoolFactory)
  const traderPoolFactory = useContract(
    traderPoolFactoryAddress,
    TraderPoolFactory
  )
  const index =
    match && steps.indexOf(match.path) !== -1 ? steps.indexOf(match.path) : 0
  const {
    baseToken,
    commissionPeriod,
    minimalInvestment,
    ownInvestments,
    commissionPercentage,
    description,
    fundName,
    fundSymbol,
    fundType,
    investors,
    ipfsHash,
    managers,
    privatePool,
    strategy,
    totalLPEmission,
    avatarBlobString,
  } = useCreateFundContext()
  const { account, library } = useWeb3React()
  const [baseContract] = useERC20(baseToken.address)
  const [contractAddress, setCreactedAddress] = useState("")

  const traderPool = useContract(contractAddress, TraderPool)

  function getReceipt(hash, requestCount = 0) {
    return new Promise(async (resolve, reject) => {
      console.log("count: ", requestCount)
      if (requestCount < 30) {
        try {
          const receipt = await library.getTransactionReceipt(hash)
          console.log("receipt", receipt)
          if (!receipt || !receipt.logs || !receipt.logs.length) {
            await delay(2000)
            resolve(await getReceipt(hash, requestCount + 1))
          } else {
            resolve(receipt)
          }
        } catch (e) {}
      } else {
        reject("Request limits overload")
      }
    })
  }

  useEffect(() => {
    console.log("1: ", traderPool)
    if (!contractAddress.length || !traderPool) return
    console.log("2: ", traderPool)
    history.push(`/new-fund/success/${fundSymbol}/${contractAddress}`)
  }, [contractAddress, traderPool, fundSymbol, history])

  const submit = async () => {
    if (!traderPoolFactory) return
    setError(false)
    setSubmiting(true)
    try {
      const ipfsReceipt = await addFileMetadata(
        avatarBlobString,
        description,
        strategy,
        account
      )

      const amountIn = ethers.utils.parseUnits(
        (parseFloat(ownInvestments.toString()) || 0.0).toString(),
        18
      )

      const poolParameters = {
        descriptionURL: ipfsReceipt.path,
        trader: account,
        privatePool,
        totalLPEmission: 0,
        baseToken: baseToken.address,
        baseTokenDecimals: baseToken.decimals,
        minimalInvestment: 0,
        commissionPeriod,
        commissionPercentage: bigify(
          commissionPercentage.toString(),
          25
        ).toString(),
      }
      const typeName =
        fundType === "basic" ? "deployBasicPool" : "deployInvestPool"
      const createReceipt = await traderPoolFactory[typeName](
        fundName,
        fundSymbol,
        poolParameters
      )
      const data: any = await getReceipt(createReceipt.hash)
      setSubmiting(false)

      if (
        !!data &&
        ((data.logs.length && data.logs[0].address) || data.address)
      ) {
        const createdAddress = data.address
          ? data.address
          : data.logs[0].address
        setCreactedAddress(createdAddress)

        // const allowance: BigNumber = await getAllowance(
        //   account,
        //   baseToken.address,
        //   createdAddress,
        //   library
        // )

        // const isApproved = allowance.lt(amountIn)

        // if (!isApproved && !!baseContract) {
        //   const receipt = await baseContract.approve(
        //     createdAddress,
        //     amountIn.toHexString()
        //   )
        //   console.log(receipt)
        // }
      } else {
        console.log("error", data)
        setError(true)
        // TODO: handle fund creating error
      }
    } catch (e) {
      setSubmiting(false)
      console.log(e)
    }
  }

  return (
    <>
      <Footer
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.29, 0.98, 0.29, 1] }}
      >
        {index === 5 ? (
          <Button onClick={submit} full>
            Create new fund
          </Button>
        ) : (
          <>
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

              <To to={steps[index + 1]}>
                <NextButton>Next</NextButton>
              </To>
            </ButtonsCoontainer>
          </>
        )}
      </Footer>
      <Payload isOpen={isSubmiting} toggle={() => setSubmiting(false)} />
      <Error isOpen={isError} toggle={() => setError(false)} submit={submit} />
    </>
  )
}
