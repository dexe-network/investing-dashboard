import styled from "styled-components"
import { Flex, Text, BaseButton, GradientBorder } from "theme"

export const Container = styled(Flex)`
  height: -webkit-fill-available;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 16px;
`

export const PriceCard = styled(GradientBorder)`
  padding: 16px;
  flex-direction: column;
  width: 100%;
  border-radius: 15px;
  margin: 16px 0;

  &:after {
    background: #181e2c;
  }
`

export const Label = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0.3px;
  color: #616d8b;
`

export const Amount = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 100%;
  text-align: right;
  letter-spacing: 0.3px;
  color: #e4f2ff;
  margin-right: 4px;
`

export const Row = styled(Flex)`
  width: 100%;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
    padding-right: 6px;
  }
`

export const InsuranceAmount = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 13px;
  color: #788ab4;
  padding-right: 4px;
`

export const MultiplierIcon = styled.img`
  width: 35px;
  height: 16px;
`
