/* eslint-disable @typescript-eslint/ban-ts-comment */
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core"
import Popover from "components/Popover"
import Button, { BorderedButton } from "components/Button"
import styled from "styled-components"
import { Text, Flex } from "theme"

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

export const PopoverText = styled(Text)`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 144%;
  text-align: center;
  letter-spacing: 0.5px;
  color: #c5d1dc;
  white-space: normal;
`

const UnsupportedChain: React.FC = () => {
  const { error, deactivate } = useWeb3React()
  const isUnsupportedChainIdError = error instanceof UnsupportedChainIdError

  const changeNetwork = () => {}

  const disconnect = () => deactivate()

  return (
    <Popover
      contentHeight={230}
      title="Unsupported Chain"
      toggle={() => {}}
      isOpen={isUnsupportedChainIdError}
    >
      <Flex dir="column" full p="0 37px">
        <PopoverText>
          App network (BSC Mainnet) doesn&apos;t match to network selected in
          wallet. Learn how to change network in wallet
        </PopoverText>
      </Flex>
      <Flex p="25px 37px 0" full>
        <Flex p="0 24px 0 0">
          <BorderedButton onClick={disconnect}>Disconnect</BorderedButton>
        </Flex>
        <Flex>
          <Button
            onClick={() =>
              alert("This feature is not supported by your wallet")
            }
          >
            Change network
          </Button>
        </Flex>
      </Flex>
    </Popover>
  )
}

export default UnsupportedChain
