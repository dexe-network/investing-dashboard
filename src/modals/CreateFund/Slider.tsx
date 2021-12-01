import { useReducer, useCallback, useEffect, useState } from "react"
import { Flex, External, Text } from "theme"
import { BigNumber } from "@ethersproject/bignumber"
import { useWeb3React } from "@web3-react/core"
import { GuardSpinner } from "react-spinners-kit"

import useCreateFund from "hooks/useCreateFund"

import WalletCard from "components/WalletCard"
import Button from "components/Button"
import AddressChips from "components/AddressChips"
import Switch from "components/Switch"
import TokenIcon from "components/TokenIcon"

import TokenSelector from "modals/TokenSelector"
import { commonsTokensList } from "constants/index"

import { opacityVariants } from "motion/variants"
import "rc-tooltip/assets/bootstrap.css"

import defaultAvatar from "assets/icons/default-avatar.svg"
import { useERC20 } from "hooks/useContract"
import { fromBig, formatNumber } from "utils"
import {
  Slide,
  SliderContainer,
  SliderWrapper,
  NextButton,
  PrevButton,
  StepperDot,
  DotsWrapper,
  Title,
  Secondary,
  Warn,
  InputUI,
  BaseTokenSelect,
  CommonBasesGroup,
  TokenWrapper,
  Footer,
  FormLabel,
  AllocateSlider,
  TextItalic,
  InputButton,
  ButtonsCoontainer,
} from "./styled"
import "./slider.css"

const initialState = {
  _traderWallet: "", // address
  _basicToken: "", // address
  _totalSupply: BigNumber.from(0), // uint256
  _comm: [
    BigNumber.from(10),
    BigNumber.from(3),
    BigNumber.from(10),
    BigNumber.from(3),
    BigNumber.from(10),
    BigNumber.from(3),
  ],
  _actual: false, // bool
  _investorRestricted: false, // bool
  _name: "", // string
  _symbol: "", // string
  mannager_one: "",
  mannager_two: "",
  mannager_three: "",
}

function FormReducer(state, action) {
  switch (action.type) {
    case "set":
      return action.name in initialState
        ? { ...state, [action.name]: action.value }
        : state
    default:
      return state
  }
}

function SliderReducer(state, action) {
  switch (action.type) {
    case "NEXT":
      return {
        ...state,
        currentIndex: state.currentIndex + (1 % state.length),
      }
    case "PREV":
      return {
        ...state,
        currentIndex: state.currentIndex - (1 % state.length),
      }
    case "GOTO":
      return {
        ...state,
        currentIndex: action.index,
      }
    case "RESET":
      return { currentIndex: 0, currentPosition: 0 }

    default:
      return state
  }
}

interface Props {
  close: () => void
}

export default function Slider<Props>({ close }) {
  const [formState, dispatchForm] = useReducer(FormReducer, initialState)
  const [isSelectorOpened, setSelectorModal] = useState(false)

  const { account } = useWeb3React()
  const [baseTokenContract, baseTokenInfo, balance] = useERC20(
    formState._basicToken
  )

  const [submitToken, loading, address] = useCreateFund()

  const setForm = useCallback(
    (n, v) => dispatchForm({ type: "set", name: n, value: v }),
    []
  )

  useEffect(() => {
    if (!account) {
      return
    }

    console.log("setting account: ", account)
    setForm("_traderWallet", account)
  }, [account, setForm])

  const items = [
    {
      id: 1,
      children: (
        <Flex key="slide-1" ai="flex-start" dir="column" full>
          <Title>Basic Information</Title>
          <Flex dir="column" ai="flex-start">
            <Secondary>Basic settings for your fund.</Secondary>
            <Warn>*Basic settings cannot be changed after creation.</Warn>
          </Flex>
          <TokenSelector
            onSelect={(v) => setForm("_basicToken", v)}
            isOpen={isSelectorOpened}
            onRequestClose={() => setSelectorModal(false)}
          />
          <InputUI label="Token name" onChange={setForm} name="_name" />
          <InputUI label="Ticker symbol" onChange={setForm} name="_symbol" />

          <Flex p="19px 0 15px 0" dir="column" ai="flex-start">
            <FormLabel>Choose base token.</FormLabel>
            <TextItalic>
              This will be the BEP-20 token that you will trade, deposit and
              receive from investors
            </TextItalic>
          </Flex>
          <BaseTokenSelect jc="space-between" full>
            {formState._basicToken === "" ? (
              <Button onClick={() => setSelectorModal(true)}>
                Browse tokens
              </Button>
            ) : null}

            {formState._basicToken === "" ? (
              <CommonBasesGroup>
                {commonsTokensList.map((token) => (
                  <TokenWrapper
                    key={token.address}
                    onClick={() => setForm("_basicToken", token.address)}
                  >
                    <TokenIcon
                      size={34}
                      src={`https://tokens.1inch.exchange/${token.address}.png`}
                    />
                  </TokenWrapper>
                ))}
              </CommonBasesGroup>
            ) : null}
          </BaseTokenSelect>
          {/* <InputUI
            label="Select base token"
            onClick={() => setSelectorModal(true)}
            name="_baseToken"
          /> */}
        </Flex>
      ),
    },
    {
      id: 2,
      children: (
        <Flex key="slide-2" ai="flex-start" dir="column" full>
          <Title>About managers</Title>
          <Flex p="0 0 18px 0" dir="column" ai="flex-start">
            <Secondary>
              <i>The manager and the creator have equal permissions.</i>
            </Secondary>
            {/* <Secondary fw={800}>A manager cannot be removed later.</Secondary> */}
          </Flex>
          <FormLabel>Owner</FormLabel>
          <Flex full dir="column" p="10px 0 0">
            <WalletCard token={formState._basicToken} />
          </Flex>

          <InputUI
            label="Add a new manager"
            onChange={setForm}
            name="mannager_one"
            icon={
              formState.mannager_one.length !== 42 && (
                <InputButton>3 left</InputButton>
              )
            }
          />
          {formState.mannager_one.length === 42 && (
            <InputUI
              label="Add a new manager"
              onChange={setForm}
              name="mannager_two"
              icon={
                formState.mannager_two.length !== 42 && (
                  <InputButton>2 left</InputButton>
                )
              }
            />
          )}
          {formState.mannager_two.length === 42 && (
            <InputUI
              label="Add a new manager"
              onChange={setForm}
              name="mannager_three"
              icon={
                formState.mannager_three.length !== 42 && (
                  <InputButton>1 left</InputButton>
                )
              }
            />
          )}
        </Flex>
      ),
    },
    {
      id: 3,
      children: (
        <Flex key="slide-3" ai="flex-start" dir="column" full>
          <Title>Investment and restrictions</Title>
          <Flex dir="column" ai="flex-start">
            <Secondary>
              It is always available to set optional limits on who can invest.
              Remember, you can change your settings in your account at any
              time.
            </Secondary>
            <Flex p="15px 0" full ai="center">
              <FormLabel>Limit who can invest</FormLabel>
              <Switch
                isOn={formState._investorRestricted}
                name="_investorRestricted"
                onChange={setForm}
              />
            </Flex>
            <Flex
              initial={formState._investorRestricted ? "visible" : "hidden"}
              variants={opacityVariants}
              transition={{ duration: 0.4 }}
              animate={formState._investorRestricted ? "visible" : "hidden"}
              full
              dir="column"
            >
              <Secondary>
                By adding addresses to this whitelist, you authorize the owners
                to invest from these addresses in the fund.
              </Secondary>
              <Secondary>
                Keep in mind that when this function is enabled, addresses that
                have not been added to the following whitelist won’t be able to
                participate in investing in the fund.
              </Secondary>
              <AddressChips />
            </Flex>
          </Flex>
        </Flex>
      ),
    },
    {
      id: 4,
      children: (
        <Flex key="slide-4" ai="flex-start" dir="column" full>
          <Title>Fees</Title>
          <Flex p="0 0 18px 0" dir="column" ai="flex-start">
            <Secondary fw={800}>
              Fees settings cannot be changed after creation.
            </Secondary>
          </Flex>
          <Flex full p="0 0 10px">
            <FormLabel>Performance Fee</FormLabel>
          </Flex>
          <Secondary>
            Performance Fee will be сollected by the trader depending on the
            results of management and strictly in the case of profitable PnL, in
            another case, the manager won’t receive his commission. He has to
            generate profit comparing to the previous settlement period for fee
            receiving.
            <br />
            <br />
            The 1st day of each month is a settlement day and is mandatory.
          </Secondary>

          <AllocateSlider
            name="_comm"
            initial={formState._comm}
            onChange={() => {}}
          />

          <Secondary>
            *** 30% of the trader&apos;s reward received is charged by the
            platform.{" "}
            <External href="https://dexe.network">Read more.</External>
          </Secondary>
        </Flex>
      ),
    },
    {
      id: 5,
      children: (
        <Flex key="slide-5" ai="flex-start" dir="column" full>
          <Title>Trade restrictions</Title>
          <Warn>*Trade settings cannot be changed after creation.</Warn>
          <Flex p="19px 0 0 0" dir="column" ai="flex-start">
            <Secondary>
              List of trading assets that you can exchange{" "}
              <External href="https://dexe.network">
                Dexe general sheets.
              </External>
            </Secondary>

            <Flex p="15px 0" full ai="center">
              <FormLabel>Current portfolio</FormLabel>
              <Switch
                isOn={formState._actual}
                name="_actual"
                onChange={setForm}
              />
            </Flex>
          </Flex>
        </Flex>
      ),
    },
    {
      id: 6,
      children: (
        <Flex key="slide-6" ai="flex-start" dir="column" full>
          <Title>Summary</Title>
          <Warn>*Trade settings cannot be changed after creation.</Warn>

          {/* <Flex p="9px 0 0 0" dir="column" ai="flex-start">
            <Secondary fw={800}>
              Please make sure to check all the entered data below.
            </Secondary>
          </Flex> */}

          <Flex p="15px 0 10px 0">
            <Flex p="0 7px 0 0">
              <FormLabel>Starting price: </FormLabel>
            </Flex>
          </Flex>
          <Flex p="9px 0 0 0" dir="column" ai="flex-start" full>
            <WalletCard token={formState._basicToken} />
          </Flex>

          <Flex p="15px 0" full ai="flex-start" dir="column">
            <FormLabel>Performance Fee</FormLabel>

            <AllocateSlider
              name="_comm"
              initial={formState._comm}
              onChange={() => {}}
            />
          </Flex>

          <Flex p="15px 0" full ai="center">
            <FormLabel>Current portfolio</FormLabel>
            <Switch
              isOn={formState._actual}
              name="_actual"
              onChange={setForm}
            />
          </Flex>

          <Flex p="15px 0" full ai="center">
            <FormLabel>
              {formState._investorRestricted
                ? "Token will be limited:"
                : "Token will be public to all members"}
            </FormLabel>
          </Flex>

          {/* <Flex
            initial={formState._investorRestricted ? "visible" : "hidden"}
            variants={opacityVariants}
            transition={{ duration: 0.4 }}
            animate={formState._investorRestricted ? "visible" : "hidden"}
            full
            dir="column"
          >
            <AddressChips />
          </Flex> */}
        </Flex>
      ),
    },
  ]

  const [state, dispatch] = useReducer(SliderReducer, {
    currentIndex: 0,
    length: items.length,
  })

  const prev = () => dispatch({ type: "PREV" })
  const next = () => dispatch({ type: "NEXT" })
  const finish = () => submitToken(formState)
  const goto = (i) => dispatch({ type: "GOTO", index: i })

  const typeByStep = (i) => {
    const isNext = i - 1 === state.currentIndex ? "NEXT" : "DEFAULT"
    return i <= state.currentIndex ? "ACTIVE" : isNext
  }

  return (
    <div className="scrollable-content">
      <SliderContainer>
        <SliderWrapper>
          {items.map((i, index) => {
            return (
              <Slide
                active={index === state.currentIndex}
                key={i.id}
                item={i}
              />
            )
          })}
        </SliderWrapper>
      </SliderContainer>

      <Footer>
        <DotsWrapper>
          {/* <StepperDot onClick={() => goto(0)} type={typeByStep(0)} />
          <StepperDot onClick={() => goto(1)} type={typeByStep(1)} />
          <StepperDot onClick={() => goto(2)} type={typeByStep(2)} />
          <StepperDot onClick={() => goto(3)} type={typeByStep(3)} />
          <StepperDot onClick={() => goto(4)} type={typeByStep(4)} />
          <StepperDot onClick={() => goto(5)} type={typeByStep(5)} /> */}
        </DotsWrapper>

        <ButtonsCoontainer>
          {state.currentIndex !== 0 ? (
            <PrevButton onClick={prev}>Back</PrevButton>
          ) : (
            <PrevButton onClick={close}>Cancel</PrevButton>
          )}
          {state.currentIndex === 5 ? (
            <NextButton onClick={finish}>Finish</NextButton>
          ) : (
            <NextButton onClick={next}>Next</NextButton>
          )}
        </ButtonsCoontainer>
      </Footer>
    </div>
  )
}
