import styled from "styled-components"
import { GradientBorder, Text, Flex } from "theme"
// import { motion } from "framer-motion"

export const Container = styled(GradientBorder)`
  position: absolute;
  top: 60px;
  right: 16px;
  padding: 16px;
  max-width: 260px;
  border-radius: 15px;
  flex-direction: column;
  align-items: flex-start;
  z-index: 22;

  &:after {
    background: #121924;
  }
`

export const Overlay = styled.div`
  z-index: 21;
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  margin: auto;
  background: linear-gradient(
    0deg,
    rgba(25, 31, 40, 0) 0%,
    rgba(25, 31, 40, 0.4) 32.35%,
    rgba(31, 37, 48, 0.4) 100%
  );
  backdrop-filter: blur(2px);
`

export const Title = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 100%;
  color: #e4f2ff;
`

export const TextGray = styled(Text)`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 130%;
`

export const ControlsGroup = styled(Flex)``

const InputElement = styled.input`
  border: 1px solid #28384f;
  background: none;
  appearance: none;
  outline: none;
  padding: 10px 42px 10px 16px;
  border-radius: 15px;
  width: 150px;

  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: #e4f2ff;

  &::placeholder {
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 100%;
    color: #666f87;
  }
`

const InputContainer = styled.div`
  position: relative;
  margin-right: 16px;
  &:before {
    z-index: 7;
    content: "%";
    position: absolute;
    right: 16px;
    top: 11px;
    height: 12px;
    width: 12px;

    font-family: "Gilroy";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    text-align: right;
    color: #666f87;
  }
`

export const Input = ({ onChange, value }) => {
  return (
    <InputContainer>
      <InputElement
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="0.10"
        type="text"
      />
    </InputContainer>
  )
}

export const Button = styled.button<{ active?: boolean }>`
  outline: none;
  appearance: none;
  border: ${({ active }) => (active ? "none" : "1px solid #28384f")};
  background: ${({ active }) =>
    active
      ? "linear-gradient(64.44deg, #63b49b 12.29%, #a4ebd4 76.64%)"
      : "none"};
  border-radius: 15px;
  padding: 10px 16px;

  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 100%;
  color: ${({ active }) => (active ? "#282b31" : "#E4F2FF")};
`
