import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core"
import styled from "styled-components"
import { External } from "theme"

export const Unsupported = styled.div`
  background: rgb(252, 14, 14);
  color: #fff;
  padding: 5px;
  text-align: center;
  z-index: 30;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`

const UnsupportedChain: React.FC = () => {
  const { error } = useWeb3React()
  const isUnsupportedChainIdError = error instanceof UnsupportedChainIdError
  return isUnsupportedChainIdError ? (
    <Unsupported>
      Unsupported network selected. See{" "}
      <External href="https://dexe.network">
        how to setup network connection
      </External>
    </Unsupported>
  ) : null
}

export default UnsupportedChain
