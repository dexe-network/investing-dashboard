import { Flex } from "theme"
import styled from "styled-components"

export const Container = styled(Flex)`
  width: 100%;
  height: 100%;
  padding: 16px;
  flex-direction: column;
`
export const ContentContainer = styled(Flex)`
  padding: 0 16px 200px 16px;
  width: 100vw;
  margin-top: 100px;
  background: linear-gradient(64.44deg, #0e121b 32.35%, #0d121b 100%);
  box-shadow: 0px -3px 102px 2px rgba(149, 185, 255, 0.26);
  border-radius: 26px 26px 0px 0px;
`

export const TransparentBg = styled.div`
  > div {
    background: transparent;
  }
`

export const MyFundContainer = styled.div`
  background: linear-gradient(64.44deg, #0e121b 32.35%, #0d121b 100%);
`

export const AvatarContainer = styled(Flex)`
  transform: translate(0, -55px);

  > p {
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 12px;

    text-align: center;
    letter-spacing: 0.03em;
    text-wrap: nowrap;
    margin: 8px 0 0 0;
    color: #2680eb;
  }
`

export const BasicSettingsContainer = styled(Flex)`
  width: 100%;

  > h2 {
    margin: 0 0 16px 0;

    font-family: "Gilroy";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    color: #616d8b;
  }
`

export const SettingItemsContainer = styled(Flex)`
  width: 100%;
  border-radius: 16px;
  box-shadow: 0 0 1px #c5c5c5;
  padding: 19px 16px;
`

export const SettingItem = styled(Flex)`
  width: 100%;
  margin: 8px 0;
  > p {
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 12px;

    color: #616d8b;
  }
  p {
    margin: 0;
  }
  > span {
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 12px;

    text-align: right;
    letter-spacing: 0.03em;

    color: #e4f2ff;
  }
`

export const Image = styled.img`
  margin-left: 7px;
  width: 10px;
  heigth: 10px;
`

export const DescriptionContainer = styled(Flex)`
  width: 100%;
  margin-top: 40px;
`

export const DescriptionHeader = styled.h3`
  margin: 0;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;

  color: #616d8b;
`

export const DescriptionInput = styled.textarea`
  overflow: hidden;
  margin-top: 23px;
  padding: 17px 16px;
  outline: none;
  width: 100%;
  border-radius: 10px;
  background: transparent;

  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15.6px;
  height: 49px;

  letter-spacing: 0.5px;

  color: rgba(197, 209, 220, 0.9);

  color: #e4f2ff;
  &:placeholder {
    color: #616d8b;
  }
`

export const Icon = styled.img`
  width: 10px;
  height: 10px;
  margin-left: 6px;
`
