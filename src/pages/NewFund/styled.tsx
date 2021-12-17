import { Flex, BaseButton } from "theme"
import styled from "styled-components"

export const Container = styled(Flex)`
  overflow-x: hidden;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 10px 16px 0px;
`

export const SubContainer = styled(Flex)`
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  flex: 1;
  padding: 12px 0 0 0;
`

export const NavIcon = styled(BaseButton)`
  width: 52px;
  height: 52px;
`
