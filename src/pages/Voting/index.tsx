import React, { useState } from "react"
import InsuranceCard from "components/InsuranceCard"
import {
  VotingContainer,
  Body,
  ConfirmationText,
  VoicePoverContainer,
  VoicePoverText,
  Container,
  Amount,
  BtnContainer,
  ButtonsConteiner,
} from "./styled"
import Confirm from "components/Confirm"
import IpfsIcon from "components/IpfsIcon"
import Button, { SecondaryButton } from "components/Button"
import Payload from "components/Payload"
import TransactionSent from "modals/TransactionSent"

// confirm states
const confirmStates = {
  up: {
    description:
      "Ты уверен, что хочешь поддержать пропоузел про ISDX фонд? Это действие невозможно отменить.",
    button: "Up Voted",
  },
  down: {
    description:
      "Ты уверен, что  не хочешь поддержать пропоузел про ISDX фонд? Это действие невозможно отменить.",
    button: "Down Voted",
  },
}

const Voting = () => {
  const [votingState, setVotingState] = useState<"" | "up" | "down">("")
  const [pendingState, setPendingState] = useState(false)
  const [successState, setSuccessState] = useState(false)
  const isOpen = votingState !== ""

  const handleClose = () => setVotingState("")

  const handleVote = () => {
    setVotingState("")
    setPendingState(true)

    setTimeout(() => {
      setPendingState(false)
      setSuccessState(true)
    }, 3 * 1000)
  }

  return (
    <>
      <VotingContainer>
        <Body>
          <InsuranceCard startvoting={setVotingState} />
        </Body>
      </VotingContainer>

      <Payload isOpen={pendingState} toggle={() => setPendingState(false)} />

      <TransactionSent
        title="Success"
        description="Спасибо за твой голос. Мы оповестим тебя о результатах голосования."
        isOpen={successState}
        toggle={() => setSuccessState(false)}
      >
        <ButtonsConteiner>
          <SecondaryButton size="big">Go to disscuss</SecondaryButton>
          <Button size="big">Close</Button>
        </ButtonsConteiner>
      </TransactionSent>

      <Confirm
        isOpen={isOpen}
        toggle={() => handleClose()}
        title="Сonfirmation"
      >
        <ConfirmationText>
          {confirmStates[votingState]?.description}
        </ConfirmationText>
        <VoicePoverContainer>
          <VoicePoverText>Voice Power</VoicePoverText>
          <Container>
            <Amount>2400 DEXE</Amount>
            <IpfsIcon size={20} />
          </Container>
        </VoicePoverContainer>
        <BtnContainer>
          <Button onClick={handleVote} full size="big">
            {confirmStates[votingState]?.button}
          </Button>
        </BtnContainer>
      </Confirm>
    </>
  )
}

export default Voting
