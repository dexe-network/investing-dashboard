import { useState } from "react"
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
}> = ({ title, children, isOpen, toggle }) => {
  const [isDragging, setDragging] = useState(false)

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
            opacity: 0.3,
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
            bottom: "-20%",
          },
          hidden: {
            transitionEnd: { display: "none" },
            bottom: "-120%",
          },
        }}
      >
        <Handle active={isDragging} />
        <Container>
          <Header>{title}</Header>
          {children}
          {/* <Flex full p="20px">
            <Flex ai="flex-start" dir="column">
              <AccountTitle>Current account</AccountTitle>
              <AccountDescription>Connected with MetaMask</AccountDescription>
            </Flex>
            <AccountIcon src={metamask} />
          </Flex>
          <AccountAddress>
            {shortenAddress("0x1dF62f291b2E969fB0849d99D9Ce41e2F137006e", 12)}
          </AccountAddress>
          <AccountFooter>
            <TextButton theme="primary">Change</TextButton>
            <TextButton>Copy</TextButton>
            <TextButton>History</TextButton>
            <TextButton>Disconnect</TextButton>
          </AccountFooter> */}
        </Container>
      </FloatingContainer>
    </>
  )
}

export default Popover
