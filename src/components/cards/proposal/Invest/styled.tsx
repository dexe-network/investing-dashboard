import styled from "styled-components"

import { Flex, GradientBorder } from "theme"

const Styled = {
  Container: styled.div`
    margin-bottom: 18px;
  `,
  Card: styled(GradientBorder)`
    width: 100%;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    border-radius: 16px;
    flex-direction: column;

    &:after {
      background: #181e2c;
    }
  `,
  Head: styled(Flex)<{ isTrader?: boolean }>`
    width: 100%;
    justify-content: space-between;
    padding: ${(props) =>
      props.isTrader ? "8px 8px 7px 16px" : "8px 14px 7px 16px"};
    border-bottom: 1px solid #1d2635;
    position: relative;
  `,
  Body: styled.div`
    width: 100%;
    padding: 12px 14px 16px 16px;
    display: grid;
    grid-template-columns: 0.3fr 0.35fr 0.35fr;
    gap: 16px 6px;
  `,
  Title: styled.div`
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 100%;
    color: #e4f2ff;
    margin: 0 4px;
    transform: translateY(2px);
  `,
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
  FundSymbol: styled.div`
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 100%;
    margin: 0 8px;
    color: #788ab4;
    transform: translateY(2px);
  `,
  ReadMoreContainer: styled.div`
    width: 100%;
    padding: 0 14px 16px 16px;
    font-weight: 400;
    font-size: 13px;
    line-height: 130%;
    color: #e4f2ff;
  `,
}

export default Styled

// Settings popup styled
export const SettingsStyled = {
  Container: styled(GradientBorder)`
    width: 100%;
    position: absolute;
    top: 38px;
    right: 0;
    box-shadow: 7px 4px 21px #0a1420;
    border-radius: 20px;

    &:after {
      background: #181e2c;
    }
  `,
  Head: styled(Flex)`
    width: 100%;
    padding: 20px 16px;
    border-bottom: 1px solid rgba(41, 60, 84, 0.3);
  `,
  Title: styled.div`
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    color: #e4f2ff;
  `,
  Content: styled.div`
    width: 100%;
    padding: 16px 16px 13px;
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
  Label: styled.div`
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
