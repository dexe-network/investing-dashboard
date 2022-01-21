import React, { useState, useRef, useEffect, Children } from "react"
import { createPortal } from "react-dom"
import { Container, Overlay } from "./styled"

const modalRoot = document.getElementById("modal")
const Modal: React.FC = ({ children }) => {
  return createPortal(
    <>
      <Overlay />
      <Container>{children}</Container>
    </>,
    modalRoot
  )
}

export default Modal
