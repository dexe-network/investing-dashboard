import { FC, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { CircleSpinner } from "react-spinners-kit"

import IconButton from "components/IconButton"
import Button from "components/Button"

import close from "assets/icons/close-gray.svg"
import check from "assets/icons/stepper-check.svg"

import {
  Container,
  Overlay,
  Header,
  Title,
  Close,
  Body,
  Description,
  StepsContainer,
  Step,
  Circle,
  Number,
  Label,
  Line,
  Track,
} from "./styled"

const stepperRoot = document.getElementById("stepper")

const predefinedOffset = {
  "2": 79,
  "3": 52,
  "4": 39,
}

export interface Step {
  title: string
  description: string
  buttonText: string
}

interface Props {
  isOpen: boolean
  title: string
  steps: Step[]
  current: number
  pending: boolean
  onClose: () => void
  onSubmit: () => void
}

const Stepper: FC<Props> = ({
  isOpen,
  title,
  steps,
  current,
  pending,
  children,
  onClose,
  onSubmit,
}) => {
  const calculateLineWidth = () => {
    const stepWidth = 100 / steps.length
    if (pending) {
      return stepWidth * current + stepWidth / 2
    }

    return stepWidth * current
  }

  return (
    stepperRoot &&
    createPortal(
      <>
        <Overlay
          onClick={onClose}
          animate={isOpen ? "visible" : "hidden"}
          initial="hidden"
          variants={{
            visible: {
              opacity: 0.4,
              display: "block",
            },
            hidden: {
              opacity: 0,
              transitionEnd: { display: "none" },
            },
          }}
        />
        <Container
          animate={isOpen ? "visible" : "hidden"}
          initial="hidden"
          variants={{
            visible: {
              opacity: 1,
              display: "block",
            },
            hidden: {
              opacity: 0,
              transitionEnd: { display: "none" },
            },
          }}
        >
          <Header>
            <Title>{title}</Title>
            <Close>
              <IconButton onClick={onClose} media={close} size={24} />
            </Close>
          </Header>
          <Body>
            {children}
            <Description>{steps[current].description}</Description>
            <StepsContainer>
              <Line
                offset={predefinedOffset[steps.length]}
                width={calculateLineWidth()}
              />
              <Track offset={predefinedOffset[steps.length]} />
              {steps.map((step, i) => (
                <Step active={i <= current} key={step.title}>
                  <Circle>
                    {i < current && <IconButton media={check} size={16} />}
                    {i > current && <Number>{i + 1}</Number>}
                    {i === current && pending && (
                      <CircleSpinner color="#A4EBD4" size={8} />
                    )}
                    {i === current && !pending && <Number>{i + 1}</Number>}
                  </Circle>
                  <Label>{step.title}</Label>
                </Step>
              ))}
            </StepsContainer>
            <Button onClick={onSubmit} size="large" full>
              {steps[current].buttonText}
            </Button>
          </Body>
        </Container>
      </>,
      stepperRoot
    )
  )
}

export default Stepper
