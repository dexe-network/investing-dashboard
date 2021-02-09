/// <reference types="react-scripts" />

declare module "jazzicon" {
  export default function (diameter: number, seed: number): HTMLElement
}

interface Window {
  ethereum?: {
    isMetaMask?: true
    on?: (...args: any[]) => void
    removeListener?: (...args: any[]) => void
  }
  web3?: unknown
}
