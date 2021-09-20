import Modal from "styled-react-modal"

import Statistics from "pages/Portfolio/Statistics"

const StyledModal = Modal.styled`
  width: 100%;
  max-width: 420px;
`

export default function PortfolioModal({ isOpen, onRequestClose }) {
  return (
    <StyledModal
      isOpen={isOpen}
      onBackgroundClick={onRequestClose}
      onEscapeKeydown={onRequestClose}
    >
      <Statistics />
    </StyledModal>
  )
}
