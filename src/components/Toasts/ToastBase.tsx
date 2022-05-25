import { Flex } from "theme"
import { Container, Body, Content, Icon, Close } from "./styled"
import IconButton from "components/IconButton"

import { ToastType } from "./types"

import close from "assets/icons/close-gray.svg"
import success from "assets/icons/alert-check.svg"
import waiting from "assets/icons/alert-clock.svg"
import warning from "assets/icons/alert-warning.svg"

const iconMapper = {
  [ToastType.Waiting]: <Icon src={waiting} />,
  [ToastType.Success]: <Icon src={success} />,
  [ToastType.Warning]: <Icon src={warning} />,
}

interface IProps {
  type: string
  children: React.ReactNode
  onClose: () => void
  visible: boolean
}

const ToastBase: React.FC<IProps> = ({
  type,
  children,
  onClose = () => {},
  visible,
}) => {
  return (
    <>
      <Container
        animate={visible ? "visible" : "hidden"}
        initial="hidden"
        variants={{
          visible: {
            x: 0,
          },
          hidden: {
            x: "100vw",
          },
        }}
      >
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
