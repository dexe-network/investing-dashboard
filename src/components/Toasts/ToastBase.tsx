import { Flex } from "theme"
import { Container, Body, Content, Icon, Close } from "./styled"
import IconButton from "components/IconButton"

import close from "assets/icons/close-gray.svg"
import success from "assets/icons/alert-check.svg"
import waiting from "assets/icons/alert-clock.svg"
import warning from "assets/icons/alert-warning.svg"

const iconMapper = {
  info: <Icon src={waiting} />,
  success: <Icon src={success} />,
  warning: <Icon src={warning} />,
}

interface IProps {
  type: string
  children: React.ReactNode
  onClose: () => void
}

const ToastBase: React.FC<IProps> = ({
  type,
  children,
  onClose = () => {},
}) => {
  return (
    <>
      <Container>
        <Close>
          <IconButton
            onClick={onClose}
            media={close}
            size={16}
            aria-label="close"
          />
        </Close>
        <Body>
          <Flex m="0 7px 0 0">{type && iconMapper[type]}</Flex>
          <Content>{children}</Content>
        </Body>
      </Container>
    </>
  )
}

export default ToastBase
