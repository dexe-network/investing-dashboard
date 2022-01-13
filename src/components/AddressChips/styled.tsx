import { Flex, BaseButton, Text } from "theme"
import styled from "styled-components"

export const Container = styled(Flex)`
  flex-direction: column;
  justify-content: flex-start;
  min-height: 80px;
  width: 100%;
  background: #2f333b;
  box-shadow: 0px 7px 64px rgba(0, 0, 0, 0.07);
  border-radius: 6px;
  position: relative;
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
  font-family: "Gilroy-Regular";
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
  font-family: "Gilroy-Regular";
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
  font-family: "Gilroy-Bold";
font-weight: 700;;
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
  font-family: "Gilroy-Bold";
font-weight: 700;;
  padding: 5px 0;
`

export const Input = styled.input`
  padding: 0 15px;
  width: 100%;
  outline: none;
  appereance: none;
  border: none;

  font-family: Gilroy;
  font-style: normal;
  background: none;
  font-family: "Gilroy-Regular";
font-weight: 400;
  font-size: 18px;
  line-height: 40px;
  display: flex;
  align-items: flex-end;

  color: #202020;

  &::placeholder {
    font-family: Gilroy;
    font-style: normal;
    font-family: "Gilroy-Regular";
font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    letter-spacing: 0.5px;
    color: #5a6071;
  }
`
