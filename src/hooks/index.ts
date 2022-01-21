import { useWeb3React } from "@web3-react/core"
import React, { useState, useEffect, useRef } from "react"
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock"

export function useActiveWeb3React() {
  const web3 = useWeb3React()

  return web3
}

export function useKeyPress(targetKey: string): boolean {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false)
  // If pressed key is our target key then set to true
  function downHandler({ key }): void {
    if (key === targetKey) {
      setKeyPressed(true)
    }
  }
  // If released key is our target key then set to false
  const upHandler = ({ key }): void => {
    if (key === targetKey) {
      setKeyPressed(false)
    }
  }
  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler)
    window.addEventListener("keyup", upHandler)
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler)
      window.removeEventListener("keyup", upHandler)
    }
  }, []) // Empty array ensures that effect is only run on mount and unmount
  return keyPressed
}

export const useFocus = (): [any, any] => {
  const htmlElRef = useRef<any>(null)
  const setFocus = () => {
    htmlElRef.current && htmlElRef.current?.focus && htmlElRef.current.focus()
  }

  return [htmlElRef, setFocus]
}

export const useBodyLock = () => {
  const ref = React.createRef()

  useEffect(() => {
    if (!ref.current) return
    disableBodyScroll(ref.current)

    return () => clearAllBodyScrollLocks()
  }, [ref])

  return ref
}
