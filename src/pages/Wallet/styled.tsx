import styled from "styled-components"
import { motion } from "framer-motion"
import { Flex } from "theme"
import cardBG from "assets/background/wallet-card.svg"
import insuranceBG from "assets/background/insurance-card.svg"

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
    right: -11px;
    bottom: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    line-height: 12px;
    box-sizing: border-box;
    background: linear-gradient(64.44deg, #24272f 32.35%, #2c313c 100%);
    box-shadow: 1px 2px 4px 1px rgba(0, 0, 0, 0.25);
    border-radius: 50px;
    padding-top: 2px;
    width: 18px;
    height: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-family: Gilroy;
    font-weight: 600;
    font-size: 17px;
  }
`
export const Info = styled(Flex)``
export const FloatingButtons = styled(Flex)`
  width: 81px;
  justify-content: flex-end;
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
  padding-left: 22px;
`

export const Name = styled.input`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0.5px;
  color: #c5d1dc;
  letter-spacing: 0.5px;
  appereance: none;
  background: none;
  outline: none;
  border: none;
  border-bottom: 1px solid transarent;
  border-radius: 0;
  max-width: 154px;
  padding: 0;

  &:not(:disabled) {
    border-bottom: 1px solid #5a60717f;
  }

  &::placeholder {
    color: #c5d1dc;
  }

  &:disabled {
    color: #c5d1dc;
  }
`

export const NameLabel = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0.5px;
  color: #c5d1dc;
  letter-spacing: 0.5px;
  appereance: none;
  background: none;
  outline: none;
  border: none;
  border-bottom: 1px solid transarent;
  border-radius: 0;
  max-width: 154px;
  margin-top: 4px;
  padding: 0;
`

export const Card = styled.div`
  background: url(${cardBG});
  background-repeat: no-repeat;
  border-radius: 12px;
  border: 1px solid #2f3c3a;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08);
  padding: 16px 16px 14px;
  margin: 43px 0 65px 0;
`

export const Address = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-family: Gilroy;
  font-weight: 400;
  font-size: 14px;
  line-height: 28px;
  letter-spacing: 1px;
  color: #d0d0d0;
  margin-top: 4px;
`

export const CardButtons = styled(Flex)`
  width: 100%;
  padding: 28px 0 0;
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
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  margin-bottom: 19px;

  text-align: center;
  letter-spacing: 0.35px;

  color: #cfdce8;
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
  font-family: Gilroy;
  font-weight: 400;
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
  font-family: Gilroy;
  font-weight: 400;
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
  font-family: Gilroy;
  font-weight: 400;
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
  font-family: Gilroy;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  color: #3399ff;
`

export const TransactionText = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-family: Gilroy;
  font-weight: 400;
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

export const TransactionsPlaceholder = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  letter-spacing: 0.1px;
  display: flex;
  justify-content: center;
  align-items: center;

  /* icons */
  width: 100%;
  flex: 1;

  color: #5a6071;
  min-height: 300px;
`

export const InsuranceCard = styled(Flex)`
  position: relative;
  width: 100%;
  padding: 16px;
  background: linear-gradient(
      85.6deg,
      rgba(255, 255, 255, 0.02) 0%,
      rgba(0, 0, 0, 0) 95.8%
    ),
    #111318;
  border-radius: 10px;
  border: 1px solid #2f3c3a;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08);
  z-index: 5;
  &:before {
    content: "";
    z-index: 4;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url(${insuranceBG});
    background-repeat: no-repeat;
  }
`

export const InsuranceInfo = styled(Flex)`
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
`

export const InsuranceTitle = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 28px;
  letter-spacing: 0.35px;
  color: #c5d1dc;
`

export const InsuranceDescription = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #c5d1dc;
`
