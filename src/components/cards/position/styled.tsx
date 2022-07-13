import { FC, MouseEvent, useMemo } from "react"
import { BigNumber } from "ethers"
import { normalizeBigNumber } from "utils"
import styled from "styled-components"
import { motion } from "framer-motion"

import { Flex, GradientBorder } from "theme"
import { accordionSummaryVariants } from "motion/variants"
import Amount from "components/Amount"

const Styled = {
  Container: styled.div`
    margin-bottom: 18px;
  `,
  Card: styled(GradientBorder)`
    width: 100%;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    border-radius: 16px;
    flex-direction: column;
    cursor: pointer;

    &::after {
      background: #181e2c;
    }
  `,
  Head: styled(Flex)`
    width: 100%;
    justify-content: space-between;
    padding: 8px 16px;
    border-bottom: 1px solid #1d2635;
  `,
  Body: styled.div`
    width: 100%;
    padding: 12px 16px 16px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 4px;
  `,
  ExtraItem: styled(GradientBorder)<{ p?: string }>`
    width: 100%;
    flex-direction: column;
    border-radius: 20px;
    margin-top: 8px;
    padding: ${(props) => (props.p ? props.p : "0")};

    &::after {
      background: #181e2c;
    }
  `,
}

export default Styled

export const BodyItemStyled = {
  Label: styled.div`
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 100%;
    letter-spacing: 0.03em;
    color: #616d8b;
    margin-bottom: 8px;
  `,

  PNL: styled.div<{ positive?: boolean }>`
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 600;
    line-height: 100%;
    letter-spacing: 0.01em;
    margin-right: 4px;
    font-size: 12px;
    color: ${(props) => (props.positive ? "#83e5ca" : "#DB6D6D")};
  `,

  StablePrice: styled.div`
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 100%;
    color: #616d8b;
    margin-top: 8px;
  `,
}

interface IBodyItemProps {
  label: string
  amount: BigNumber
  symbol?: string
  pnl?: BigNumber
  amountUSD: BigNumber
}

export const BodyItem: FC<IBodyItemProps> = ({
  label,
  amount,
  symbol,
  pnl,
  amountUSD,
}) => {
  const normalizedPnl = useMemo(() => {
    if (!pnl) return null
    return normalizeBigNumber(pnl, 18, 2)
  }, [pnl])

  const stablePrice = useMemo(() => {
    if (!amountUSD) return null
    return normalizeBigNumber(amountUSD, 18, 2)
  }, [amountUSD])

  return (
    <Flex dir="column" ai="flex-start">
      <BodyItemStyled.Label>{label}</BodyItemStyled.Label>
      <Flex>
        <Amount value={normalizeBigNumber(amount, 18, 4)} symbol={symbol} />
        {pnl && (
          <BodyItemStyled.PNL positive={Number(normalizedPnl) > 0}>
            &nbsp;{Number(normalizedPnl) > 0 && "+"}
            {normalizedPnl}%
          </BodyItemStyled.PNL>
        )}
      </Flex>
      <BodyItemStyled.StablePrice>
        {pnl && (Number(stablePrice) > 0 ? "+" : "-")}$
        {Math.abs(Number(stablePrice))}
      </BodyItemStyled.StablePrice>
    </Flex>
  )
}

const ActionsStyled = {
  Content: styled(Flex)`
    width: 100%;
    justify-content: space-between;
    margin: 8px 0 0;
  `,
  Item: styled(GradientBorder)<{ active?: boolean }>`
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 15px;
    padding: 8px 12px;
    border-radius: 23px;
    color: ${(props) => (props.active ? "#E4F2FF" : "#788AB4")};
    cursor: pointer;

    &:after {
      background: #08121a;
    }
  `,
}

interface IAction {
  label: string
  active?: boolean
  onClick: (e?: MouseEvent<HTMLElement>) => void
}

interface IActionsProps {
  actions: IAction[]
  visible: boolean
}

export const Actions: FC<IActionsProps> = ({ actions, visible, ...rest }) => {
  if (!actions.length) return null

  return (
    <motion.div
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
      variants={accordionSummaryVariants}
      {...rest}
    >
      <ActionsStyled.Content>
        {actions.map((a, i) => (
          <ActionsStyled.Item key={i} active={a.active} onClick={a.onClick}>
            {a.label}
          </ActionsStyled.Item>
        ))}
      </ActionsStyled.Content>
    </motion.div>
  )
}
