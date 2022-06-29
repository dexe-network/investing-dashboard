import styled from "styled-components"
import { Flex, GradientBorder } from "theme"

export const Card = styled(GradientBorder)`
  width: 100%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  flex-direction: column;
  margin-bottom: 18px;

  &:after {
    background: #181e2c;
  }
`

export const PositionSymbol = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 100%;
  color: #e4f2ff;
  margin: 0 4px;
  transform: translateY(2px);
`

export const HeaderStyled = {
  Head: styled(Flex)<{ isTrader?: boolean }>`
    width: 100%;
    justify-content: space-between;
    padding: ${(props) =>
      props.isTrader ? "8px 8px 8px 16px" : "8px 14px 8px 16px"};
    border-bottom: 1px solid #1d2635;
    position: relative;
  `,
  Amount: styled(PositionSymbol)`
    margin: 0 0 0 8px;
  `,
  Status: styled.div<{ active?: boolean }>`
    padding: 5px 6px;
    border-radius: 36px;
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
}

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

export const BodyStyled = {
  Body: styled.div`
    width: 100%;
    padding: 12px 14px 16px 16px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 16px 8px;
  `,
  Item: styled(Flex)`
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  `,
  Label: styled.div`
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 100%;
    letter-spacing: 0.03em;
    color: #616d8b;
    margin-bottom: 4px;
  `,
}
