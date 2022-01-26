import React, { useState, useRef, useEffect, Children } from "react"
import { createPortal } from "react-dom"
import closeIcon from "assets/icons/modal-close.svg"
import { Container, Overlay, Head, Title, Close } from "./styled"

const modalRoot = document.getElementById("modal")

const Modal: React.FC<{
  isOpen: boolean
  toggle: () => void
  title: string
}> = ({ children, isOpen, toggle, title }) => {
  if (!modalRoot) return null
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
            display: "block",
          },
          hidden: {
            opacity: 0,
            transitionEnd: { display: "none" },
          },
        }}
      >
        <Head>
          <Title>{title}</Title>
          <Close onClick={toggle} src={closeIcon} />
        </Head>
        {children}
      </Container>
    </>,
    modalRoot
  )
}

export default Modal
