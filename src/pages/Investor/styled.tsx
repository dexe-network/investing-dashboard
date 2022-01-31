import styled from "styled-components"
import { Flex } from "theme"

export const Container = styled(Flex)`
  width: 100%;
  padding: 16px 16px 46px;
  flex-direction: column;
  justify-cotnent: flex-start;
  min-height: fill-available;
  max-height: fill-available;
  overflow-y: auto;
`

export const Tab = styled(Flex)`
  background: linear-gradient(64.44deg, #24272f 32.35%, #333a48 100%);
  box-shadow: 0px 1px 0px rgba(4, 6, 5, 0.3);
  height: 35px;
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 130%;
  width: 100%;
  border-radius: 6px 6px 0 0;
  border-bottom: 1px solid #24272f;

  align-items: center;
  justify-content: center;
  text-align: center;

  color: #c5d1dc;
`

export const TabCard = styled(Flex)`
  margin-bottom: 16px;
  margin-top: 16px;
  padding: 0 0 6px;
  position: relative;
  background: linear-gradient(64.44deg, #24272f 32.35%, #333a48 100%);
  border-radius: 6px;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`

export const Row = styled(Flex)`
  width: 100%;
  padding: 0 8px 5px;
`

export const MainText = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 130%;
  color: #c5d1dc;
`

export const Buttons = styled(Flex)`
  width: 100%;
  justify-content: space-evenly;
  margin-top: auto;
`
