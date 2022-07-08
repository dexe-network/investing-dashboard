import { FC, useMemo } from "react"
import styled, { css } from "styled-components"

import { Flex, GradientBorder } from "theme"
import Amount from "components/Amount"

import checkGreenIcon from "assets/icons/green-check.svg"

const Styled = {
  Container: styled(GradientBorder)`
    width: 100%;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    border-radius: 16px;
    flex-direction: column;
    margin-bottom: 18px;

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
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 16px 8px;
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

// Body item
export const BodyItemStyled = {
  Container: styled(Flex)`
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  `,
  Label: styled(Flex)`
    min-height: 16px;
    align-items: center;
    margin-bottom: 2px;
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 100%;
    letter-spacing: 0.03em;
    color: #616d8b;
  `,
}

interface IBodyItemProps {
  label: string
  amount: string
  symbol?: string
  fz?: string
  completed?: boolean
}

export const BodyItem: FC<IBodyItemProps> = ({
  label,
  amount,
  symbol,
  fz,
  completed = false,
}) => (
  <BodyItemStyled.Container>
    <BodyItemStyled.Label>
      {label}
      {completed && <img src={checkGreenIcon} />}
    </BodyItemStyled.Label>
    <Amount value={amount} symbol={symbol} fz={fz} />
  </BodyItemStyled.Container>
)

const LineBase = css`
  max-width: 45px;
  height: 2px;
  border-radius: 7px;
`

const LPSizeStyled = {
  Container: styled(Flex)`
    width: 137px;
    height: 2px;
    position: relative;
    background: #293c54;
    border-radius: 7px;
  `,
  LineWrapper: styled.div`
    width: 33.33%;
    &:nth-child(2) {
      margin: 0 1px;
    }
  `,
  First: styled.div<{ w?: string }>`
    ${LineBase}
    width: ${(props) => (props.w ? props.w : "45px")};
    background: linear-gradient(90deg, #77ffd4 0%, #ffa51f 100%);
  `,
  Second: styled.div<{ w?: string }>`
    ${LineBase}
    width: ${(props) => (props.w ? props.w : "45px")};
    background: linear-gradient(90deg, #fda723 0%, #f14b4b 100%, #ff9052 100%);
  `,
  Third: styled.div<{ w?: string }>`
    ${LineBase}
    width: ${(props) => (props.w ? props.w : "45px")};
    background: linear-gradient(90deg, #ff514f 0%, #fe0404 100%);
  `,
}

function calcPercentage(f, v) {
  return (v * 100) / f
}

export const TraderLPSize: FC<{ size: number }> = ({ size }) => {
  const MAX = {
    first: 33,
    second: 66,
    third: 100,
  }
  const firstSize = useMemo(() => {
    if (size >= MAX.first) {
      return 100
    }

    return calcPercentage(33, size)
  }, [MAX.first, size])

  const secondSize = useMemo(() => {
    if (size >= MAX.second) {
      return 100
    } else if (size >= MAX.first) {
      const val = size - MAX.first
      return calcPercentage(33, val)
    }

    return 0
  }, [MAX.first, MAX.second, size])

  const thirdSize = useMemo(() => {
    if (size >= MAX.third) {
      return 100
    } else if (size >= MAX.second) {
      const val = size - MAX.second
      return calcPercentage(34, val)
    }

    return 0
  }, [MAX.second, MAX.third, size])

  console.log({ firstSize, secondSize, thirdSize })

  return (
    <LPSizeStyled.Container>
      <LPSizeStyled.LineWrapper>
        {size > 0 && <LPSizeStyled.First w={firstSize.toString() + "%"} />}
      </LPSizeStyled.LineWrapper>
      <LPSizeStyled.LineWrapper>
        {size > 33 && <LPSizeStyled.Second w={secondSize.toString() + "%"} />}
      </LPSizeStyled.LineWrapper>
      <LPSizeStyled.LineWrapper>
        {size > 66 && <LPSizeStyled.Third w={thirdSize.toString() + "%"} />}
      </LPSizeStyled.LineWrapper>
    </LPSizeStyled.Container>
  )
}
