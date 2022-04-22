import { Flex, BaseButton, Text, GradientBorder } from "theme"
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

export const Container = styled(GradientBorder)<{
  customBg?: string
  readonly?: boolean
  isDefault?: boolean
}>`
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  border-radius: 6px;
  position: relative;
  padding: 12px 16px;

  &:after {
    background: #08121a;
  }
`

export const ChipsWrapper = styled(Flex)`
  flex-wrap: wrap;
  min-height: 24px;
  width: 100%;
  justify-content: flex-start;
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
  background: linear-gradient(64.44deg, #191e2b 32.35%, #272e3e 100%);
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  color: #e4f2ff;
  margin: 0 10px 14px 0;
  padding: 6px 6px 6px 8px;

  &:nth-child(3n) {
    margin: 0 0 14px 0;
  }
`

export const TagButton = styled(BaseButton)`
  background-color: transparent;
  width: 12px;
  height: 12px;
  border: none;
  cursor: pointer;
  margin-left: 2px;
  padding: 0;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ErrorText = styled(Text)`
  color: #be0007;
  white-space: normal;
  font-family: Gilroy;
  font-weight: 700;
  padding: 5px 0;
`

export const Input = styled.input`
  width: 100%;
  outline: none;
  appereance: none;
  border: none;

  background: none;
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 28px;
  padding: 0;
  color: #e4f2ff;

  &::placeholder {
    font-family: Gilroy;
    font-style: normal;
    font-family: Gilroy;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    letter-spacing: 0.5px;
    color: #616d8b;
  }
`
