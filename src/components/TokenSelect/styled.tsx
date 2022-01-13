import { Flex, Text } from "theme"
import styled from "styled-components"

export const Input = styled.input`
  border-radius: 7px;
  appearance: none;
  border: none;
  background: linear-gradient(
    261deg,
    rgba(51, 62, 64, 1) 0%,
    rgba(128, 128, 128, 0.5) 100%
  );
  height: 48px;
  width: 100%;
  outline: none;
  padding: 18px 14px 14px;
  transition: all 0.5s;
  color: #c2c3c4;

  &::placeholder {
    vertical-align: middle;
    line-height: 16px;
    font-size: 16px;
    color: #c2c3c4;
  }

  &:focus {
    box-shadow: 0px 3px 6px 0 rgba(0, 0, 0, 0.23) inset;
    -webkit-box-shadow: 0px 3px 6px 0 rgba(0, 0, 0, 0.23) inset;
    -moz-box-shadow: 0px 3px 6px 0 rgba(0, 0, 0, 0.23) inset;

    &::placeholder {
      color: #999999;
    }
  }
`

export const CommonContainer = styled.div`
  margin: 33px 0 25px;
  width: 100%;
`

export const CommonsList = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    ". . . ."
    ". . . .";
  justify-items: stretch;
  align-items: stretch;
  width: fill-available;
`

export const CommonItem = styled(Flex)`
  min-width: 86px;
  justify-content: flex-start;
  margin: 6px 0px 7px 3px;
  user-select: none;
  cursor: pointer;

  font-family: Gilroy;
  font-style: normal;
  font-family: "Gilroy-Regular";
font-weight: 400;
  font-size: 16px;
  line-height: 16px;

  display: flex;
  align-items: center;

  color: #cfcfcf;
`

export const FullList = styled(Flex)`
  flex-direction: column;
  flex: 1;
  width: 100%;
  background: rgba(90, 96, 113, 0.15);
  border-radius: 6px;
  overflow-y: auto;
`

export const FullItem = styled(Flex)`
  user-select: none;
  cursor: pointer;
  height: 50px;
  min-height: 50px;
  padding: 10px 15px;
  justify-content: flex-start;
  border-radius: 5px;
  transition: all 0.3s;

  &:hover {
    background: rgba(52, 59, 67, 0.4);
    box-shadow: 0px 3px 6px 0 rgba(0, 0, 0, 0.23);
  }
`

export const Price = styled(Text)`
  color: #f7f7f7;
  font-size: 16px;
  font-family: "Gilroy-Medium";
font-weight: 500;
  margin-left: auto;
`

export const Title = styled(Text)`
  font-family: Gilroy;
  font-style: normal;
  font-family: "Gilroy-Regular";
font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #acb3b8;
  margin-bottom: 12px;
`
