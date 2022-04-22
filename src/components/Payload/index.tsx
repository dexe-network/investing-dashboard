import { FC } from "react"
import { SpinnerCircularFixed } from "spinners-react"

import IconButton from "components/IconButton"

import close from "assets/icons/close-big.svg"

import {
  Overlay,
  Container,
  Content,
  Title,
  Text,
  Header,
  ButtonWrapper,
} from "./styled"

const Payload: FC<{
  isOpen: boolean
  toggle: () => void
}> = ({ isOpen, toggle }) => {
  return (
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
          <Title>Waiting</Title>
          <ButtonWrapper>
            <IconButton media={close} onClick={() => {}} />
          </ButtonWrapper>
        </Header>
        <Content>
          <SpinnerCircularFixed
            size={100}
            style={{
              height: 100,
            }}
            thickness={46}
            speed={78}
            color="#8DEED3"
            secondaryColor="#0D1320"
          />
          <Text>Open your wallet and sign transactions</Text>
        </Content>
      </Container>
    </>
  )
}

export default Payload
