import { useState, useEffect, Dispatch, SetStateAction } from "react"
import styled from "styled-components"
import ImageCropper from "modals/ImageCropper"
import defaultAvatar from "assets/icons/default-avatar.svg"
import picture from "assets/icons/picture.svg"
import { device } from "theme"
import { blobToBase64 } from "utils/ipfs"

const Img = styled.img<{ size: number }>`
  display: block;
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  min-width: ${(props) => `${props.size}px`};
  min-height: ${(props) => `${props.size}px`};
  border-radius: 150px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(24, 30, 44, 0.87);
  border-radius: 150px;
`

const HoverCamera = styled.div`
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
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
  top: 24px;

  @media only screen and (${device.xs}) {
    bottom: 25px;
  }
`

const Container = styled.div<{ margin: string }>`
  position: relative;
  border-radius: 150px;
  width: fit-content;
  height: fit-content;
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

interface Props {
  url?: string
  size?: number
  m?: string
  showUploader?: boolean
  onCrop?: any
}

const Avatar: React.FC<Props> = ({
  url,
  size = 28,
  m = "0",
  showUploader = false,
  onCrop,
  children,
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
    if (!croppedImg) return
    ;(async () => {
      const url = await blobToBase64(croppedImg)
      onCrop("avatarBlobString", url)
    })()
  }, [croppedImg, onCrop])

  if (!url || !url.length) {
    url = defaultAvatar
  } else {
    url = `${url}`
  }

  return (
    <Container margin={m}>
      <Img
        src={croppedImg ? URL.createObjectURL(croppedImg) : url}
        size={size}
      />
      {showUploader && !url && <Overlay />}
      {showUploader && !url && <CameraIcon src={picture} />}
      {showUploader && (
        <>
          <FileUpload
            type="file"
            accept="image/*"
            onChange={handleSelectFile}
          />

          <ImageCropper
            submit={setCroppedImg}
            img={upImg}
            onRequestClose={() => setUpImg(null)}
          />
        </>
      )}
      {children}
    </Container>
  )
}

export default Avatar
