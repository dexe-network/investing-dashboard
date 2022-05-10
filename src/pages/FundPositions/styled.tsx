import styled from "styled-components"
import { Flex } from "theme"

export const Container = styled(Flex)`
  width: 100%;
  height: calc(100vh - 94px);
  padding: 16px;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media all and (display-mode: standalone) {
    height: calc(100vh - 115px);
  }
`

export const List = styled.div`
  flex: 1;
  width: 100%;
`
