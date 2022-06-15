import { useCallback } from "react"
import html2canvas, { Options } from "html2canvas"

interface IMethod {
  (element: HTMLElement, options?: Partial<Options>): Promise<string>
}

export default function useScreenshot(): IMethod {
  return useCallback(async (element, options?) => {
    if (!element) return ""

    const opts = {
      backgroundColor: null,
      ...(options !== null ? options : {}),
    }

    const canvas = await html2canvas(element, opts)

    return canvas.toDataURL("image/png")
  }, [])
}
