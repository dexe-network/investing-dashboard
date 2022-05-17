import styled from "styled-components"

export const SuccessContainer = styled.div`
  margin: 0 auto;
  bacground-color: #040a0f;
  width: fill-available;
  height: calc(100vh - 94px);
  overflow-y: auto;

  @media all and (display-mode: standalone) {
    height: calc(100vh - 115px);
  }
`

export const Body = styled.div`
  position: relative;
  margin-top: 67px;
  box-sizing: border-box;
  width: fill-available;
  background: linear-gradient(
    344.44deg,
    #0d111b 10.75%,
    #0e121b 89.07%,
    #0e121b 89.08%
  );
  box-shadow: 0px -3px 102px 2px rgba(149, 185, 255, 0.26);
  border-radius: 26px 26px 0px 0px;
  height: fill-available;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const IconContainer = styled.div`
  position: absolute;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  right: 0;
  left: 0;
  top: -41px;
`

export const TopSideContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 81px;
  box-sizing: border-box;
`

export const AddressContainer = styled.a`
  text-decoration: none;
  color: #3399ff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 6px;
`

export const Address = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 12px;
  text-align: center;
  letter-spacing: 1px;
  text-decoration: none;
  color: #3399ff;
  margin-right: 7px;
`

export const Title = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 25px;
  text-align: center;
  letter-spacing: -0.02em;
  color: #e4f2ff;
`

export const CenterSideContent = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 10px;
  color: #ffffff;
  justify-content: center;
  align-items: center;
`

export const Subtitle = styled.div`
  text-align: center;
`

export const ListDiv = styled.div`
  display: flex;
  margin-bottom: 22px;
  text-align: center;
  display: flex;
  align-items: center;
  &:last-child {
    margin-bottom: 0;
  }
`

export const Check = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 9px;
`

export const BottomSideContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const BottomTitle = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 12px;
  text-align: center;
  letter-spacing: 1px;
  color: #e4f2ff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 17px;
`

export const ShareIcons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const FacebookIcon = styled.div`
  margin-right: 22px;
`

export const TwitterIcon = styled.div`
  margin-right: 22px;
`

export const TelegramIcon = styled.div``

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 auto 21px;
  width: 241px;
`
