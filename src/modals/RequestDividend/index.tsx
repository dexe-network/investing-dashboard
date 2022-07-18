import { FC, useMemo } from "react"

import Modal from "components/Modal"
import Token from "components/Token"

import {
  InfoRow,
  InfoGrey,
  InfoDropdown,
  InfoWhite,
} from "components/Exchange/styled"

import Tile from "./Tile"
import useRequestDividend from "./useRequestDividend"
import * as S from "./styled"
import { Flex } from "theme"
import { cutDecimalPlaces, fromBig } from "utils"
import Button from "components/Button"

interface Props {
  isOpen: boolean
  onClose: () => void
}

const RequestDividend: FC<Props> = ({ isOpen, onClose }) => {
  const { token } = useRequestDividend(
    "0x76fdc031b2d4107660618e66b0a367f9fd01aeb7",
    "0"
  )

  const proposalSize = useMemo(() => {
    return (
      <InfoRow>
        <InfoGrey>Your proposal size:</InfoGrey>
        <Flex gap="4">
          <InfoWhite>0</InfoWhite>
          <InfoGrey>/0 WBNB</InfoGrey>
        </Flex>
      </InfoRow>
    )
  }, [])

  const totalDividends = useMemo(() => {
    return (
      <Flex gap="4">
        <InfoGrey>$3000</InfoGrey>
      </Flex>
    )
  }, [])

  const dividendsList = useMemo(() => {
    return [
      {
        address: "0x8babbb98678facc7342735486c851abd7a0d17ca",
        amount: "0",
      },
      {
        address: "0xae13d989dac2f0debff460ac112a837c89baa7cd",
        amount: "0",
      },
    ].map((p) => <Token key={p.address} data={p} />)
  }, [])

  const lastWithdrawn = useMemo(() => {
    return (
      <Flex gap="4">
        <InfoWhite>3 month ago</InfoWhite>
      </Flex>
    )
  }, [])

  const withdrawsList = useMemo(() => {
    return (
      <InfoRow>
        <InfoWhite>Jun 12, 2022</InfoWhite>
        <Flex gap="4">
          <InfoWhite>0</InfoWhite>
          <InfoGrey>USD</InfoGrey>
        </Flex>
      </InfoRow>
    )
  }, [])

  return (
    <Modal isOpen={isOpen} toggle={onClose} title="Request a dividend">
      <Tile token={token} />
      <S.Body>
        {proposalSize}
        <InfoDropdown
          left={<InfoGrey>Dividends to withdraw: </InfoGrey>}
          right={totalDividends}
        >
          {dividendsList}
        </InfoDropdown>
        <InfoDropdown
          left={<InfoGrey>Last withdraw</InfoGrey>}
          right={lastWithdrawn}
        >
          {withdrawsList}
        </InfoDropdown>
        <Button
          m="10px 0 0"
          size="large"
          theme="primary"
          onClick={() => {}}
          fz={22}
          full
        >
          Confirm withdraw
        </Button>
      </S.Body>
    </Modal>
  )
}

export default RequestDividend
