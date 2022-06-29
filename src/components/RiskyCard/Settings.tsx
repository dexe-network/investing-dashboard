import { Dispatch, FC, SetStateAction, useState } from "react"

import Tooltip from "components/Tooltip"
import Input from "components/Input"
import Button, { SecondaryButton } from "components/Button"

import { SettingsStyled as S } from "./styled"

import { accordionSummaryVariants } from "motion/variants"
import DatePicker from "components/DatePicker"
import { format } from "date-fns"
import { expandTimestamp } from "utils"

interface Props {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
}

const RiskyCardSettings: FC<Props> = ({ visible, setVisible }) => {
  const [isDateOpen, setDateOpen] = useState(false)
  const [timestampLimit, setTimestampLimit] = useState(new Date().valueOf())

  return (
    <S.Container
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
      exit="hidden"
      variants={accordionSummaryVariants}
    >
      <div>
        <S.Row minInputW="94px">
          <Tooltip id="rp-expiration-date">End of risky proposal</Tooltip>
          <S.Title>Expiration date:</S.Title>
          <div>
            <Input
              disabled
              theme="grey"
              size="small"
              value=""
              placeholder={format(
                expandTimestamp(timestampLimit),
                "MM.dd.yyyy, HH:mm"
              )}
              onClick={() => setDateOpen(!isDateOpen)}
            />
            <DatePicker
              isOpen={isDateOpen}
              timestamp={expandTimestamp(timestampLimit)}
              toggle={() => setDateOpen(false)}
              onChange={setTimestampLimit}
            />
          </div>
          <S.InputType>GMT</S.InputType>
        </S.Row>
        <S.Row minInputW="79px">
          <Tooltip id="rp-available-staking">Staking</Tooltip>
          <S.Title>LPs available for staking</S.Title>
          <Input
            theme="grey"
            size="small"
            type="number"
            inputmode="decimal"
            value={"0"}
            placeholder="---"
            onChange={(v) => console.log("available-staking", v)}
          />
          <S.InputType>TRX</S.InputType>
        </S.Row>
        <S.Row>
          <Tooltip id="rp-max-invest">Maximum invest price</Tooltip>
          <S.Title>Maximum invest price</S.Title>
          <Input
            theme="grey"
            size="small"
            type="number"
            inputmode="decimal"
            value={"0"}
            placeholder="---"
            onChange={(v) => console.log("maximum-invest-price", v)}
          />
          <S.InputType>TRX</S.InputType>
        </S.Row>
      </div>
      <S.ButtonGroup>
        <SecondaryButton full size="small" onClick={() => setVisible(false)}>
          Сancel
        </SecondaryButton>
        <Button full size="small">
          Apply changes
        </Button>
      </S.ButtonGroup>
    </S.Container>
  )
}

export default RiskyCardSettings
