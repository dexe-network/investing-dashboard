import { useState, useRef } from "react"
import { useWeb3React } from "@web3-react/core"
import { Flex } from "theme"
import {
  FloatingContainer,
  Header,
  Overlay,
  Container,
  Handle,
  AccountCard,
  AccountTitle,
  AccountDescription,
  AccountIcon,
  AccountAddress,
  AccountFooter,
  TextButton,
} from "./styled"

import metamask from "assets/wallets/metamask.svg"
import { shortenAddress } from "utils"

// TODO: if content height > greater than window height, then use scroll of that content

const Popover: React.FC<{
  title: string
  isOpen: boolean
  toggle: (state: boolean) => void
  contentHeight: number
}> = ({ title, children, isOpen, toggle, contentHeight }) => {
  const [isDragging, setDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  // detect dragging down by 25% of screen height
  const handleDragEnd = (e, info) => {
    setDragging(false)
    if (window?.innerHeight / 2 + window?.innerHeight / 15 < info.point.y) {
      toggle(false)
    }
  }

  const handleDragStart = () => {
    setDragging(true)
  }

  return (
    <>
      <Overlay
        onClick={() => toggle(!isOpen)}
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
      <FloatingContainer
        drag="y"
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 5 }}
        dragElastic={0.5}
        animate={isOpen ? "visible" : "hidden"}
        initial="hidden"
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        transition={{ duration: 0.4, ease: [0.29, 0.98, 0.29, 1] }}
        variants={{
          visible: {
            display: "block",
            top: `${window.innerHeight - contentHeight}px`,
          },
          hidden: {
            transitionEnd: { display: "none" },
            top: `${window.innerHeight}px`,
          },
        }}
      >
        <Container ref={containerRef}>
          <Handle active={isDragging} />
          <Header>{title}</Header>
          {children}
        </Container>
      </FloatingContainer>
    </>
  )
}

export default Popover
