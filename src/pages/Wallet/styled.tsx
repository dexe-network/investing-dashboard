import styled from "styled-components"
import { motion } from "framer-motion"
import { Flex } from "theme"

export const Container = styled(motion.div)`
  padding: 0 16px;
`

export const Header = styled(Flex)`
  justify-content: space-between;
  padding: 20px 0;
  width: 100%;
`
export const AvatarWrapper = styled.div`
  position: relative;
  width: 50px;
  height: 50px;

  &:after {
    content: "+";
    position: absolute;
    right: -7px;
    bottom: 0px;
    padding-top: 4px;
    box-sizing: border-box;
    background: #282b31;
    border-radius: 50px;
    width: 18px;
    height: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #8a8e92;
    font-weight: bold;
    font-size: 21px;
  }
`
export const Info = styled(Flex)``
export const FloatingButtons = styled(Flex)`
  width: 81px;
  justify-content: space-between;
`

export const TextGray = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0.5px;

  color: #636a77;
`

export const UserInfo = styled(Flex)`
  flex-direction: column;
  align-items: flex-start;
  padding-left: 10px;
`

export const Name = styled.input`
  font-family: Gilroy;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0.5px;
  appereance: none;
  background: none;
  color: #d0d0d0;
  outline: none;
  border: none;
  border-bottom: 1px solid transarent;
  border-radius: 0;
  max-width: 154px;
  padding: 0;

  &:not(:disabled) {
    border-bottom: 1px solid #5a60717f;
  }

  &:disabled {
    color: #d0d0d0;
  }
`

export const Card = styled.div`
  background: linear-gradient(64.44deg, #202227 32.35%, #1b1e23 100%);
  border-radius: 12px;
  border: 1px solid #007ff3;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 14px 13px;
  margin: 33px 0 51px 0;
`

export const Address = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 28px;
  letter-spacing: 1px;
  color: #d0d0d0;
  margin-top: 4px;
`

export const CardButtons = styled(Flex)`
  width: 100%;
  padding: 12px 0 5px;
`

export const TextButton = styled.div<{ color?: string }>`
  font-family: Gilroy;
  font-style: normal;
  font-weight: ${(props) => (props.color ? "600" : "400")};
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  letter-spacing: 1px;

  color: ${(props) => (props.color ? props.color : "#636A77")};
`

export const Heading = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 20px;

  margin: 0 0 18px;

  text-align: center;
  letter-spacing: 0.5px;

  color: #dadada;
`

export const TransactionsList = styled.div`
  position: relative;
  margin-top: 30px;
  max-height: 350px;
  height: 350px;
  overflow-y: scroll;
`

export const Sticky = styled.div`
  position: sticky;
  position: -webkit-sticky;
  top: 0px;
  width: calc(100% - 7px);
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 12px;
  color: #6c757d;
  background: #27292f;
  padding: 10px 0 3px 5px;
  border-radius: 2px;
  /* box-shadow: 1px 2px 4px 1px rgba(0, 0, 0, 0.1); */
  z-index: 10;
`

export const Time = styled.div`
  font-family: Gilroy;
  font-style: italic;
  font-weight: normal;
  font-size: 10px;
  line-height: 12px;
  color: #6c757d;
`

export const Transaction = styled.div`
  height: 49px;
  padding-right: 5px;
`

export const TransactionType = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 14px;

  color: #dadada;
`

export const TransactionDetails = styled(Flex)`
  width: 100%;
  align-items: center;
  height: 18px;
`

export const TransactionHash = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;

  color: #3399ff;
`

export const TransactionText = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  display: flex;
  align-items: center;
  height: 18px;

  & img {
    transform: translateY(-2px);
  }

  color: #6c757d;
`

export const TransactionsGroup = styled.div`
  padding: 11px 3px;
`

export const PathArrow = styled.img`
  width: 5px;
  height: 8px;
`
