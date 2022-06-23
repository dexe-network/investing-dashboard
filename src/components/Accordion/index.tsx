import { FC, ReactNode, useState, useMemo } from "react"

import { accordionSummaryVariants, rotate180Variants } from "motion/variants"
import AmountRow from "components/Amount/Row"

import {
  AccordionContainer,
  AccordionHeader,
  AccordionTitle,
  AccordionIcon,
  AccordionSummary,
} from "./styled"
import arrowOutlineBottom from "assets/icons/arrow-outline-bottom.svg"

interface IProps {
  title: string
  value?: ReactNode | null
  symbol?: ReactNode | null
  m?: string
}

const Accordion: FC<IProps> = ({
  children,
  title,
  value,
  symbol,
  ...props
}) => {
  const [expanded, setExpanded] = useState(false)

  const withValue = useMemo(() => Boolean(value), [value])

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  return (
    <>
      <AccordionContainer {...props}>
        <AccordionHeader onClick={toggleExpanded}>
          {withValue ? (
            <AmountRow title={title} value={value} symbol={symbol} />
          ) : (
            <AccordionTitle>{title}</AccordionTitle>
          )}

          <AccordionIcon
            src={arrowOutlineBottom}
            alt="toggle"
            initial="visible"
            animate={expanded ? "hidden" : "visible"}
            variants={rotate180Variants}
          />
        </AccordionHeader>

        <AccordionSummary
          initial="hidden"
          animate={expanded ? "visible" : "hidden"}
          variants={accordionSummaryVariants}
        >
          {children}
        </AccordionSummary>
      </AccordionContainer>
    </>
  )
}

export default Accordion
