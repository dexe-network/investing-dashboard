import { useState } from "react"

const MAX_LENGTH = 113

interface IValues {
  full: string
  inView: string
  isExpand: boolean
  canToggle: boolean
}
interface IMethods {
  setContent: (content: string) => void
  toggle: () => void
}

export default function useReadMore(): [IValues, IMethods] {
  const [full, setFull] = useState("")
  const [inView, setInView] = useState("")
  const [isExpand, setIsExpand] = useState(false)
  const [canToggle, setCanToggle] = useState(false)

  const setContent = (content: string) => {
    setFull(content)

    if (content.length > MAX_LENGTH) {
      const short = content.substring(0, MAX_LENGTH)
      setInView(short)
      setCanToggle(true)
    } else {
      setInView(content)
      setCanToggle(false)
    }
  }

  const showAll = () => {
    setInView(full)
  }

  const showPart = () => {
    setInView(full.substring(0, MAX_LENGTH))
  }

  const toggle = () => {
    if (isExpand) {
      setIsExpand(false)
      showPart()
    } else {
      setIsExpand(true)
      showAll()
    }
  }

  return [
    { full, inView, isExpand, canToggle },
    { setContent, toggle },
  ]
}
