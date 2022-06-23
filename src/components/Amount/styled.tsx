import styled from "styled-components"

import { Flex } from "theme"

import { IAmountStyle } from "./interface"

export const Container = styled(Flex)<IAmountStyle>`
  font-family: "Gilroy";
  font-style: normal;
  font-size: ${(props) => props.fz ?? "13px"};
  line-height: ${(props) => props.lh ?? "16px"};
  justify-content: ${(props) => props.jc ?? "initial"};
`

export const Value = styled.div`
  font-weight: 600;
  color: #e4f2ff;
`
export const Symbol = styled.div`
  font-weight: 400;
  color: #788ab4;
`

// AMOUNT ROW

export const Title = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  color: #788ab4;
  margin-right: 8px;
  width: 100%;
`
