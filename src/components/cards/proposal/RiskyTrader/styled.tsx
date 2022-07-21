import styled from "styled-components"

import { Flex, GradientBorder } from "theme"

const Styled = {
  Status: styled.div<{ active?: boolean }>`
    padding: 5px 6px;
    border-radius: 36px;
    white-space: nowrap;
    border: 1px solid ${(props) => (props.active ? "#9ae2cb" : "#788AB4")};
    color: ${(props) => (props.active ? "#9ae2cb" : "#788AB4")};
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 600;
    font-size: 11px;
    line-height: 13px;
  `,
  Ticker: styled.div`
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 100%;
    color: #788ab4;
  `,
  Footer: styled(Flex)`
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 10px 16px 8px;
    border-top: 1px solid #1d2635;
  `,
  FundIconContainer: styled.div`
    position: relative;
  `,
  SizeTitle: styled.div`
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 100%;
    color: #e4f2ff;
    margin: 0 0 6px 0;
  `,
  LPSizeContainer: styled.div`
    width: 137px;
  `,
  TraderRating: styled(Flex)`
    unicode-bidi: bidi-override;
    direction: rtl;
  `,
  TraderRatingStar: styled.div`
    position: relative;
    width: 10.51px;
    height: 10.44px;
    color: #293c54;

    &::after {
      content: "\2605";
      position: absolute;
      color: #9ae2cb;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: inherit;
      height: inherit;
      z-index: 1000;
    }
  `,
  AddButton: styled.div`
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 600;
    font-size: 11px;
    line-height: 100%;
    color: #2680eb;
    white-space: nowrap;
    cursor: poiner;
  `,
}

export default Styled

// Settings popup styled
export const SettingsStyled = {
  Container: styled(GradientBorder)`
    width: 91%;
    padding: 16px 16px 13px;
    position: absolute;
    top: 38px;
    right: 0;
    box-shadow: 7px 4px 21px #0a1420;
    border-radius: 20px;

    &:after {
      background: #181e2c;
    }
  `,
  Row: styled.div<{ minInputW?: string }>`
    display: grid;
    grid-template-columns:
      max-content
      minmax(max-content, 1fr)
      ${({ minInputW }) => minInputW ?? "62px"}
      minmax(28px, max-content);
    grid-template-rows: 1fr;
    align-items: center;
    gap: 4.5px;
    margin: 0 0 12px 0;
  `,
  Title: styled.div`
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
    color: #788ab4;
  `,
  InputType: styled.div`
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
    color: #788ab4;
    text-align: right;
  `,
  ButtonGroup: styled.div`
    width: 100%;
    margin: 4px 0 0;
    display: grid;
    grid-template-columns: 0.8fr 1fr;
    gap: 16px;
  `,
}
