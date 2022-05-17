import { FC } from "react"
import { createPortal } from "react-dom"
import { CircleSpinner } from "react-spinners-kit"
import { Flex } from "theme"

import IconButton from "components/IconButton"
import Button, { SecondaryButton } from "components/Button"

import close from "assets/icons/close-gray.svg"
import check from "assets/icons/stepper-check.svg"
import fail from "assets/icons/stepper-fail.svg"

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
  failed?: boolean
  onClose: () => void
  onSubmit: () => void
}

const Stepper: FC<Props> = ({
  isOpen,
  title,
  steps,
  current,
  pending,
  failed,
  children,
  onClose,
  onSubmit,
}) => {
  const calculateLineWidth = () => {
    const stepWidth = 100 / steps.length
    if (pending) {
      return stepWidth * current + stepWidth / 2
    }

    return stepWidth * (failed ? current - 1 : current)
  }

  const getCircleContent = (i) => {
    if (i < current) {
      return <IconButton media={check} size={16} />
    }

    if (i > current) {
      return <Number>{i + 1}</Number>
    }

    if (i === current && pending) {
      return <CircleSpinner color="#A4EBD4" size={8} />
    }

    if (i === current && failed) {
      return <IconButton media={fail} size={16} />
    }

    return <Number>{i + 1}</Number>
  }

  const buttonWithFailed = failed ? (
    <Button onClick={onSubmit} size="large" fz={16} full>
      Try again
    </Button>
  ) : (
    <Button onClick={onSubmit} size="large" fz={16} full>
      {steps[current].buttonText}
    </Button>
  )

  const buttonWithPending = pending ? (
    <SecondaryButton theme="disabled" size="large" fz={16} full>
      <Flex>
        <Flex p="0 4px 0 0">Loading</Flex>
        <CircleSpinner color="#616D8B" size={8} />
      </Flex>
    </SecondaryButton>
  ) : (
    buttonWithFailed
  )

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
                <Step
                  failed={i === current && failed}
                  active={i <= current}
                  key={step.title}
                >
                  <Circle>{getCircleContent(i)}</Circle>
                  <Label>{step.title}</Label>
                </Step>
              ))}
            </StepsContainer>
            {buttonWithPending}
          </Body>
        </Container>
      </>,
      stepperRoot
    )
  )
}

export default Stepper
