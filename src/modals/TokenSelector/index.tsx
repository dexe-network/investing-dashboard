import Modal from "styled-react-modal"
import { Flex, device } from "theme"
import closeIcon from "assets/icons/modal-close.svg"
import TokenSelect from "components/TokenSelect"
import { Title, Close } from "./styled"
import React from "react"

const StyledModal = Modal.styled`
  box-shadow: 0 3px 30px rgba(0, 0, 0, 0.4);
  background: linear-gradient(233deg, rgba(53,52,75,1) 0%, rgba(41,49,52,1) 100%);
  padding: 17px 15px 15px;
  border-radius: 5px;
  width: 331px;
  height: fit-content;

  @media only screen and (${device.sm}) {
    // transform: translateY(-62px);
  }
`

const TokenSelector: React.FC<{
  isOpen: boolean
  onRequestClose: () => void
  onSelect: (address: string) => void
  tokensList?: any[]
}> = ({ isOpen, onRequestClose, onSelect, tokensList }) => {
  return (
    <StyledModal
      isOpen={isOpen}
      onBackgroundClick={onRequestClose}
      onEscapeKeydown={onRequestClose}
    >
      <Flex full p="0 0 15px">
        <Title>Select a token</Title>
        <Close onClick={onRequestClose} src={closeIcon} alt="" />
      </Flex>
      <TokenSelect />
    </StyledModal>
  )
}

export default TokenSelector
