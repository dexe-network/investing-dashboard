import { useState, useEffect, useCallback } from "react"
import Compressor from "compressorjs"
import ImageCropper from "modals/ImageCropper"
import defaultAvatar from "assets/icons/default-avatar.svg"
import picture from "assets/icons/picture.svg"
import { blobToBase64 } from "utils/ipfs"

import {
  Img,
  Overlay,
  HoverCamera,
  FileUpload,
  CameraIcon,
  Container,
} from "./styled"

const getNormalizedFile = (file) => {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      maxWidth: 1000,
      maxHeight: 1000,
      success(normalizedFile) {
        resolve(normalizedFile)
      },
      error(error) {
        reject(error)
      },
    })
  })
}

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

  const readFile = useCallback((file): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        getNormalizedFile(file)
          .then((normalizedFile: any) => reader.readAsDataURL(normalizedFile))
          .catch((error) => reject(error))
      } catch (error) {
        reject(error)
      }
    })
  }, [])

  const handleSelectFile = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const imageDataUrl = await readFile(file)
      setUpImg(imageDataUrl || null)
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
