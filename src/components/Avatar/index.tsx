import { useState, useEffect, Dispatch, SetStateAction } from "react"
import styled from "styled-components"
import ImageCropper from "modals/ImageCropper"
import defaultAvatar from "assets/icons/default-avatar.svg"
import camera from "assets/icons/camera-icon.svg"
import { device } from "theme"

interface Props {
  url?: string
  size?: number
  m?: string
  showUploader?: boolean
  onCrop?: Dispatch<SetStateAction<Blob | null>>
}

const Img = styled.img<{ size: number }>`
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  min-width: ${(props) => `${props.size}px`};
  min-height: ${(props) => `${props.size}px`};
  border-radius: 150px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
`

const HoverCamera = styled.div`
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.2) 70%,
    rgba(0, 0, 0, 0.3) 100%
  );
  height: fill-available;
  width: 100%;
  border-radius: 150px;
  transition: all 0.4s ease-in-out;

  @media only screen and (${device.xs}) {
    opacity: 1;
  }
`

const FileUpload = styled.input`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  bottom: 0;
  -webkit-appearance: none;
  outline: none;
  height: fill-available;
  width: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 20;
`

const CameraIcon = styled.img`
  margin: auto;
  transition: all 0.2s cubic-bezier(0.63, 0.08, 0.49, 0.84);
  position: absolute;
  left: 0;
  right: 0;
  bottom: 10px;
  width: 18px;

  @media only screen and (${device.xs}) {
    bottom: 25px;
  }
`

const Container = styled.div<{ size: number; margin: string }>`
  position: relative;
  border-radius: 150px;
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  min-width: ${(props) => `${props.size}px`};
  min-height: ${(props) => `${props.size}px`};
  margin: ${(props) => props.margin};
  /* overflow: hidden; */

  &:hover {
    ${HoverCamera} {
      opacity: 1;
    }
    ${CameraIcon} {
      bottom: 25px;
    }
  }
`

const Avatar: React.FC<Props> = ({
  url,
  size = 28,
  m = "0",
  showUploader = false,
  onCrop,
}) => {
  const [upImg, setUpImg] = useState<string | ArrayBuffer | null>()
  const [croppedImg, setCroppedImg] = useState<Blob | null>(null)

  const handleSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()

      reader.addEventListener("load", () => setUpImg(reader.result))
      reader.readAsDataURL(e.target.files[0])
    }
  }

  useEffect(() => {
    if (!croppedImg || !onCrop) return

    onCrop(croppedImg)
  }, [croppedImg, onCrop])

  if (!url || !url.length) {
    url = defaultAvatar
  } else {
    url = `${url}`
  }

  // console.log(url)
  return (
    <Container size={size} margin={m}>
      <Img
        src={croppedImg ? URL.createObjectURL(croppedImg) : url}
        size={size}
      />
      {showUploader && (
        <>
          <HoverCamera>
            <FileUpload
              type="file"
              accept="image/*"
              onChange={handleSelectFile}
            />
            {/* <CameraIcon src={camera} alt="upload avatar" /> */}
          </HoverCamera>
          <ImageCropper
            submit={setCroppedImg}
            img={upImg}
            onRequestClose={() => setUpImg(null)}
          />
        </>
      )}
    </Container>
  )
}

export default Avatar
