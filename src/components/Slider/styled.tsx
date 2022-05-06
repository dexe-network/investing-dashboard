import styled from "styled-components"
import { GradientBorder } from "theme"

export const SliderLine = styled.div`
  width: 100%;
  background: #2f333b;
  border-radius: 2px;
  height: 4px;
  max-width: 20%;
  margin-right: -3px;
  margin-left: -3px;
`

export const Percent = styled.input`
  background: transparent;
  -webkit-appearance: none;
  outline: none;
  border: none;
  border-radius: 0;
  width: 30px;
  text-align: right;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  color: #e4f2ff;
  position: relative;
`

export const InputWrapper = styled(GradientBorder)`
  position: relative;
  border-radius: 41px;
  width: 55px;
  height: 25px;
  justify-content: center;

  &:after {
    background: #191f2c;
  }
`

export const InputSymbol = styled.span`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  color: #e4f2ff;
`
