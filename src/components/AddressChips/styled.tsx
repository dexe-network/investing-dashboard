import { Flex, BaseButton, Text } from "theme"
import styled from "styled-components"

export const Label = styled.div`
  padding: 20px 0 0 15px;
  font-family: Gilroy;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #9ae2cb;
  text-align: left;
`

export const Icon = styled.img`
  position: absolute;
  fill: #5c6166;
  bottom: 0;
  right: 0;
  width: 32px;
  height: 32px;
`

export const Container = styled(Flex)<{
  customBg?: string
  readonly?: boolean
  isDefault?: boolean
}>`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  min-height: 54px;
  width: 100%;
  background: ${(props) => (props.customBg ? props.customBg : "#20242d")};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.01);
  border-radius: 6px;
  position: relative;
  box-shadow: ${(props) =>
    props.readonly ? "0px 4px 4px rgba(0, 0, 0, 0.08)" : "none"};

  &::before {
    content: "";
    opacity: ${(props) => (props.readonly ? 1 : 0)};
    position: absolute;
    width: 3px;
    top: 0;
    bottom: 0;
    left: 0px;
    background: ${(props) =>
      props.isDefault
        ? "rgb(92, 97, 102)"
        : "linear-gradient(244.44deg, #63b49b 0%, #a4ebd4 67.65%)"};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    border-radius: 10px 0 0 10px;
  }
`

export const ChipsWrapper = styled(Flex)`
  flex-wrap: wrap;
  min-height: 24px;
  padding: 7px 9px 0;
`

export const LimitIndicator = styled.div`
  position: absolute;
  right: 10px;
  bottom: 10px;
  font-family: Gilroy;
  font-style: normal;
  font-family: Gilroy;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  text-align: right;

  color: #5a6071;
`

export const TagItem = styled.div`
  display: inline-flex;
  align-items: center;
  margin: 0 0.3rem 0.3rem 0;
  background: linear-gradient(64.44deg, #282b31 32.35%, #373d47 100%);
  border-radius: 4px;
  font-family: Gilroy;
  font-style: normal;
  font-family: Gilroy;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #7fffd4;
  padding: 4px 7px 0px 5px;
`

export const TagButton = styled(BaseButton)`
  background-color: transparent;
  width: 20px;
  height: 20px;
  border: none;
  cursor: pointer;
  font: inherit;
  margin-left: 6px;
  font-family: Gilroy;
  font-weight: 700;
  padding: 0;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  & > img {
    fill: linear-gradient(244.44deg, #63b49b 0%, #a4ebd4 67.65%);
  }
`

export const ErrorText = styled(Text)`
  color: #be0007;
  white-space: normal;
  font-family: Gilroy;
  font-weight: 700;
  padding: 5px 0;
`

export const Input = styled.input`
  padding: 0 15px;
  width: 100%;
  outline: none;
  appereance: none;
  border: none;

  background: none;
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 40px;

  color: #5a6071;

  &::placeholder {
    font-family: Gilroy;
    font-style: normal;
    font-family: Gilroy;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    letter-spacing: 0.5px;
    color: #5a6071;
  }
`
