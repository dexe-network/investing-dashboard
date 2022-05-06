import styled from "styled-components"
import { Flex, Text, BaseButton } from "theme"

export const Title = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 41px;
  /* identical to box height, or 186% */

  letter-spacing: 0.5px;

  color: #ffffff;
`

export const WhiteLabel = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 150%;
  letter-spacing: 0.02em;
  font-feature-settings: "tnum" on, "lnum" on;
  color: #c5d1dc;
`

export const WhiteValue = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 150%;
  text-align: right;
  letter-spacing: 0.02em;
  font-feature-settings: "tnum" on, "lnum" on;
  color: #c5d1dc;
`

export const GreyValue = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 150%;
  text-align: right;
  letter-spacing: 0.02em;
  font-feature-settings: "tnum" on, "lnum" on;
  color: #596073;
  padding: 0 5px;
`

export const GreyValueSm = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 150%;
  text-align: right;
  letter-spacing: 0.02em;
  font-feature-settings: "tnum" on, "lnum" on;
  color: #596073;
  padding: 0 5px;
`

export const ErrorText = styled(Text)`
  font-size: 18px;
  color: #ff7f7f;
  font-family: Gilroy;
  font-weight: 700;
`

export const ApproveButton = styled(BaseButton)`
  background: linear-gradient(
    34deg,
    rgba(51, 62, 64, 1) 0%,
    rgba(79, 81, 85, 1) 100%
  );
  box-shadow: 0px 0px 7px #ff7f7f;
  font-size: 22;
  color: #dbdbdb;
  font-family: Gilroy;
  font-weight: 700;
  padding: 22px 15px 19px;
  width: 100%;
  border-radius: 10px;
`

export const Container = styled(Flex)`
  width: 100%;
  height: 100%;
  padding: 16px 16px 40px;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`

export const PriceContainer = styled(Flex)`
  width: 100%;
  height: 56px;
`

export const TooltipLabel = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-family: Gilroy;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  color: #6c757d;
`

export const TooltipValue = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-family: Gilroy;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  color: #dadada;
`

export const ExchangeName = styled.div`
  color: #596073;
  font-family: Gilroy;
  font-style: normal;
  font-family: Gilroy;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
`

const GreyText = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  color: #5a6071;
`

const WhiteText = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  color: #b1b7c9;
`

const InfoContainer = styled(Flex)`
  width: 100%;
  padding-bottom: 8px;
  // &:first-child {
  //   padding-top: 16px;
  // }
  &:last-child {
    padding-bottom: 0px;
  }
`

export const InfoRow = ({ label, value, white = false }) => {
  return (
    <InfoContainer>
      <GreyText>{label}</GreyText>
      {white ? <WhiteText>{value}</WhiteText> : <GreyText>{value}</GreyText>}
    </InfoContainer>
  )
}

export const SettingsIcon = styled.img`
  margin-right: 3px;
  transform: translateY(-1px);
`

export const SettingsLabel = styled(Flex)`
  padding: 5px 0;
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 130%;
  color: #5a6071;
`

export const SettingsCard = styled(Flex)`
  padding: 0 18px;
  flex-direction: column;
  align-items: flex-start;
`

export const SettingsTitle = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 100%;
  color: #b1b7c9;
`

export const SettingsDescription = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 130%;
  color: #5a6071;
`

export const SettingsButton = styled.button`
  background: linear-gradient(64.44deg, #63b49b 12.29%, #a4ebd4 76.64%);
  border-radius: 6px;
  font-family: Gilroy;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 30px;
  outline: none;
  appereance: none;
  border: none;
  color: #282b31;
  padding: 0 25px;
`

export const SettingsInput = styled.input`
  background: rgba(29, 33, 39, 0.5);
  border-radius: 6px;
  outline: none;
  border: none;
  height: 30px;
  width: fill-available;
  margin-right: 16px;
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  color: #5a6071;
  padding: 5px 32px 5px 16px;

  &::placeholder {
    color: #5a6071;
  }

  &:after {
    content: "%";
    position: absolute;
    right: 0px;
    top: 5px;
    font-family: Gilroy;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 20px;
    color: #fff;
  }
`
