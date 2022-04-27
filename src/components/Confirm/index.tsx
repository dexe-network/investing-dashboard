import { FC } from "react"
import { createPortal } from "react-dom"

import IconButton from "components/IconButton"
import close from "assets/icons/close-big.svg"

import {
  Overlay,
  Container,
  Header,
  Content,
  Title,
  ButtonWrapper,
} from "./styled"

const confirmRoot = document.getElementById("confirm")

interface Props {
  isOpen: boolean
  title: string
  toggle: () => void
}

const Confirm: FC<Props> = ({ isOpen, title, children, toggle }) => {
  if (!confirmRoot) return null
  return createPortal(
    <>
      <Overlay
        onClick={toggle}
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
            display: "flex",
          },
          hidden: {
            opacity: 0,
            transitionEnd: { display: "none" },
          },
        }}
      >
        <Header>
          <Title>{title}</Title>
          <ButtonWrapper>
            <IconButton media={close} onClick={toggle} />
          </ButtonWrapper>
        </Header>
        <Content>{children}</Content>
      </Container>
    </>,
    confirmRoot
  )
}

export default Confirm
