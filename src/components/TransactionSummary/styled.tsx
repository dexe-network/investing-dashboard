import styled from "styled-components"

import { Flex } from "theme"
import CircularProgress from "components/CircularProgress"

export const Container = styled.div`
  padding: 0;
  margin-top: 0;
`

export const TransactionWaitContainer = styled.div`
  padding: 0;
  margin-top: 0;
`

export const TransactionWaitContent = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.03em;
  color: #e4f2ff;
`

export const TransactionWaitFooter = styled(Flex)`
  margin-top: 16px;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 12px;
  letter-spacing: 0.03em;
  color: #616d8b;
`

export const TransactionWaitProgress = styled(CircularProgress)`
  background: transparent;
`
