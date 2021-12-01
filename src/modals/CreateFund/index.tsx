import Modal from "styled-react-modal"
import { device } from "theme"

// import Slider from "./Slider"

const StyledModal = Modal.styled`
  box-shadow: 0 3px 30px rgba(0, 0, 0, 0.4);
  background: linear-gradient(
    225deg,
    rgba(47, 60, 58, 1) -50%,
    rgba(45, 40, 67, 1) 100%
  );
  border-radius: 10px;
  width: 494px;
  height: 569px;


  @media only screen and (${device.sm}) {
    height: 470px;
    width: calc(100% - 44px);
  }
`

export default function CreateFund({ isOpen, onRequestClose }) {
  return (
    <StyledModal
      isOpen={isOpen}
      onBackgroundClick={onRequestClose}
      onEscapeKeydown={onRequestClose}
    >
      {/* <Slider close={onRequestClose} /> */}
    </StyledModal>
  )
}
