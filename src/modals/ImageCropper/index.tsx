import { useState, useCallback } from "react"
import Modal from "styled-react-modal"
import styled from "styled-components"
import Cropper from "react-easy-crop"
import close from "assets/icons/close.svg"
import { AllocateSlider } from "modals/CreateFund/styled"
import Button from "components/Button"
import getCroppedImg from "modals/ImageCropper/cropImage"

const StyledModal = Modal.styled`
  box-shadow: 0 3px 30px rgba(0, 0, 0, 0.4);
  background: linear-gradient(
    225deg,
    rgba(47, 60, 58, 1) -50%,
    rgba(45, 40, 67, 1) 100%
  );
  border-radius: 10px;
  max-width: 394px;
  width: 90%;
  height: 350px;
  position: relative;
  overflow: hidden;
`

const SliderContainer = styled.div`
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  margin: auto;
  height: 50px;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.5;
  transition: opacity 0.5s ease-in-out;

  &:hover {
    opacity: 0.9;
  }
`

const ButtonsContainer = styled.div`
  position: absolute;
  bottom: 3px;
  left: 0;
  right: 0;
  margin: auto;
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CloseIcon = styled.img`
  position: absolute;
  right: 15px;
  top: 15px;
  width: 20px;
  height: 20px;
  z-index: 50;
  cursor: pointer;
`

const ImageCropper: React.FC<{
  img: any
  submit: (img: any) => void
  onRequestClose: () => void
}> = ({ onRequestClose, img, submit }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [zoom, setZoom] = useState(1)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const onUploadClick = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(img, croppedAreaPixels, 0)

      submit(croppedImage)
      onRequestClose()
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, img, submit, onRequestClose])

  return (
    <StyledModal
      isOpen={!!img}
      onBackgroundClick={() => {}}
      onEscapeKeydown={onRequestClose}
    >
      <CloseIcon src={close} onClick={onRequestClose} />
      <Cropper
        style={{
          cropAreaStyle: {
            borderRadius: 150,
          },
          containerStyle: {
            borderRadius: "10px",
            bottom: "50px",
          },
          mediaStyle: {
            borderRadius: 3,
          },
        }}
        image={img}
        crop={crop}
        zoom={zoom}
        aspect={1 / 1}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
      />
      <SliderContainer>
        <AllocateSlider
          debounce={false}
          min={1}
          max={5}
          customMarks={{
            1: "1x",
            2: "3x",
            3: "4x",
            4: "5x",
            5: "6x",
          }}
          hideInput
          name="zoom"
          initial={zoom}
          onChange={(n, v) => setZoom(v)}
        />
      </SliderContainer>
      <ButtonsContainer>
        <Button full onClick={onUploadClick}>
          Upload
        </Button>
      </ButtonsContainer>
    </StyledModal>
  )
}

export default ImageCropper
