import { Dispatch, FC, SetStateAction, useState } from "react"
import { format } from "date-fns"

import { expandTimestamp } from "utils"
import { accordionSummaryVariants } from "motion/variants"

import Input from "components/Input"
import Tooltip from "components/Tooltip"
import DatePicker from "components/DatePicker"
import Button, { SecondaryButton } from "components/Button"

import { SettingsStyled as S } from "./styled"

interface Props {
  visible: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
}

const InvestCardSettings: FC<Props> = ({ visible, setVisible }) => {
  const [isDateOpen, setDateOpen] = useState(false)
  const [timestampLimit, setTimestampLimit] = useState(new Date().valueOf())

  const onClose = (e) => {
    e.stopPropagation()
    setVisible(false)
  }

  return (
    <S.Container
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
      exit="hidden"
      variants={accordionSummaryVariants}
    >
      <S.Head>
        <S.Title>Investment proposal 1/JBR settings</S.Title>
      </S.Head>
      <S.Content>
        <S.Row minInputW="94px">
          <Tooltip id="rp-expiration-date">End of risky proposal</Tooltip>
          <S.Label>Expiration date:</S.Label>
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
          <S.Label>LPs available for staking:</S.Label>
          <Input
            theme="grey"
            size="small"
            type="number"
            inputmode="decimal"
            value={"0"}
            placeholder="---"
            onChange={(v) => console.log("available-staking", v)}
          />
          <S.InputType> 1/JBR</S.InputType>
        </S.Row>
        <S.ButtonGroup>
          <SecondaryButton full size="small" onClick={onClose}>
            Сancel
          </SecondaryButton>
          <Button full size="small">
            Apply changes
          </Button>
        </S.ButtonGroup>
      </S.Content>
    </S.Container>
  )
}

export default InvestCardSettings
