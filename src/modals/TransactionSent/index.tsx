import React, { FC } from "react"
import Confirm from "components/Confirm"
import Wow from "assets/transaction-sent-icons/wow.svg"
import LinkIcon from "assets/transaction-sent-icons/link-icon.svg"
import {
  Body,
  WowImg,
  Text,
  ButtonsContainer,
  SecondaryButtonText,
  ButtonContentContainer,
  ButtonText,
  ButtonImg,
} from "./styled"
import Button, { SecondaryButton } from "components/Button"

interface TransactionSentProps {
  title: string
  description: string
  isOpen: boolean
  toggle: () => void
}

const TransactionSent: FC<TransactionSentProps> = ({
  title,
  description,
  isOpen,
  children,
  toggle,
}) => {
  return (
    <Confirm title={title} isOpen={isOpen} toggle={toggle}>
      <Body>
        <WowImg>
          <img src={Wow} alt="wow-img" />
        </WowImg>
        <Text>{description}</Text>
        <ButtonsContainer>
          {children}
          {/* <SecondaryButton size="big">
            <SecondaryButtonText>Close</SecondaryButtonText>
          </SecondaryButton> */}
          {/* <Button size="big">
            <ButtonContentContainer>
              <ButtonText>BscScan</ButtonText>
              <ButtonImg>
                <img src={LinkIcon} alt="link-icon" />
              </ButtonImg>
            </ButtonContentContainer>
          </Button> */}
        </ButtonsContainer>
      </Body>
    </Confirm>
  )
}

export default TransactionSent
