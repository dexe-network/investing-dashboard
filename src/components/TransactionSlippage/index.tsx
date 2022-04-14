import React, { useState, useRef, Dispatch, SetStateAction } from "react"
import {
  Container,
  Overlay,
  Title,
  TextGray,
  Input,
  Button,
  ControlsGroup,
} from "./styled"

const SLIPPAGE_TEXT = {
  "0": {
    text: "",
    color: "#666F87",
  },
  "1": {
    text: "Your transaction may fail",
    color: "#E4F2FF",
  },
  "2": {
    text: "Your transaction may be frontrun",
    color: "rgb(243, 132, 30)",
  },
  "3": {
    text: "Enter a valid slippage percentage",
    color: "#DB6D6D",
  },
}

// "0": slippage > 0.05 && slippage < 1 // valid
// "1": slippage < 0.05 // Your transaction may fail
// "2": slippage > 1 // Your transaction may be frontrun
// "3": slippage > 50 // Enter a valid slippage percentage
const getSlippageValidity = (slippage: string): string => {
  if (slippage === "") return "0"

  const sl = parseFloat(slippage)

  if (sl <= 0.04 && sl >= 0) {
    return "1"
  }
  if (sl > 0.05 && sl <= 1) {
    return "0"
  }
  if (sl > 1 && sl <= 50) {
    return "2"
  }
  return "3"
}

interface Props {
  toggle: (state: boolean) => void
  isOpen: boolean
  slippage: string
  onChange: (slippage: string) => void
}

const TransactionSlippage: React.FC<Props> = ({
  isOpen,
  toggle,
  slippage,
  onChange,
}) => {
  const slippageValidity = getSlippageValidity(slippage)

  return isOpen ? (
    <>
      <Container>
        <Title>Transaction slippage</Title>
        <TextGray p="16px 0" color="#666f87">
          Your tranzaction will revert if the price changes unfavorably by more
          than this percentage
        </TextGray>
        <ControlsGroup>
          <Input value={slippage} onChange={onChange} />
          <Button
            active={slippage === "0.1" || slippage === "0.10"}
            onClick={() => onChange("0.10")}
          >
            Auto
          </Button>
        </ControlsGroup>
        <TextGray p="16px 0 0" color={SLIPPAGE_TEXT[slippageValidity].color}>
          {SLIPPAGE_TEXT[slippageValidity].text}
        </TextGray>
      </Container>
      <Overlay onClick={() => toggle(false)} />
    </>
  ) : null
}

export default TransactionSlippage
