import { ReactNode, FC, MouseEvent } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"

import { Flex, GradientBorder } from "theme"
import { accordionSummaryVariants } from "motion/variants"
import Amount from "components/Amount"

import checkGreenIcon from "assets/icons/green-check.svg"

const Styled = {
  Card: styled(GradientBorder)`
    width: 100%;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    border-radius: 16px;
    flex-direction: column;
    margin-bottom: 18px;

    &:after {
      background: #181e2c;
    }
  `,
  Head: styled(Flex)<{ p?: string }>`
    width: 100%;
    justify-content: space-between;
    padding: ${(props) => props.p ?? "8px 14px 7px 16px"};
    border-bottom: 1px solid #1d2635;
    position: relative;
  `,
  Body: styled.div`
    width: 100%;
    padding: 12px 14px 16px 16px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 16px 5px;
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

    span {
      color: #788ab4;
    }
  `,
}

export default Styled

// Body item
export const BodyItemStyled = {
  Container: styled(Flex)<{ ai?: string }>`
    width: 100%;
    flex-direction: column;
    align-items: ${(props) => props.ai ?? "flex-start"};
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
  label: ReactNode
  amount: ReactNode
  symbol?: ReactNode
  fz?: string
  ai?: string
  completed?: boolean
}

export const BodyItem: FC<IBodyItemProps> = ({
  label,
  amount,
  symbol,
  fz,
  ai,
  completed = false,
}) => (
  <BodyItemStyled.Container ai={ai}>
    <BodyItemStyled.Label>
      {label}
      {completed && <img src={checkGreenIcon} />}
    </BodyItemStyled.Label>
    <Amount value={amount} symbol={symbol} fz={fz} />
  </BodyItemStyled.Container>
)

// Actions
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
