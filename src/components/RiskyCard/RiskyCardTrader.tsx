import { FC, useState } from "react"

import { Flex } from "theme"
import IconButton from "components/IconButton"
import Button from "components/Button"

import RiskyCardHeader from "./Header"
import RiskyCardBody from "./Body"
import RiskyCardSettings from "./Settings"

import { Card, HeaderStyled as HeaderS } from "./styled"

import settingsIcon from "assets/icons/settings.svg"
import settingsGreenIcon from "assets/icons/settings-green.svg"

const TraderSubHeader = ({ active, settings }) => {
  const [isOpen, setIsOpen] = settings
  return (
    <>
      <HeaderS.Status active={active}>
        {active ? "Open investing" : "Closed"}
      </HeaderS.Status>
      <Flex m="0 0 0 4px">
        <IconButton
          size={12}
          media={isOpen ? settingsGreenIcon : settingsIcon}
          onClick={() => {
            setIsOpen(!isOpen)
          }}
        />
      </Flex>
    </>
  )
}

interface Props {
  positionAddress: string
  positionTokenData: any
  onInvest: () => void
}

const RiskyCardTrader: FC<Props> = ({
  positionAddress,
  onInvest,
  positionTokenData,
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false)

  return (
    <Card>
      <>
        <RiskyCardHeader
          isTrader
          positionAddress={positionAddress}
          positionTokenData={positionTokenData}
        >
          <TraderSubHeader
            active
            settings={[isSettingsOpen, setIsSettingsOpen]}
          />
          <RiskyCardSettings
            visible={isSettingsOpen}
            setVisible={setIsSettingsOpen}
          />
        </RiskyCardHeader>
        <RiskyCardBody>
          <Button full size="small" onClick={onInvest}>
            Terminal
          </Button>
        </RiskyCardBody>
      </>
    </Card>
  )
}

export default RiskyCardTrader
