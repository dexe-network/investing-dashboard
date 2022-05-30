import { useMemo } from "react"
import { Container, Text, BaseIcon } from "./styled"

interface IProps {
  href: string
  target?: string
  rel?: string

  color?: string
  iconPosition?: string
  iconSize?: string
  iconColor?: string
  icon?: React.ReactNode
  removeIcon?: boolean
  fw?: string
  fz?: string
  children: React.ReactNode
}

const ExternalLink: React.FC<IProps> = ({
  href,
  target = "_blank",
  rel = "noopener noreferrer",

  color = "white",
  iconPosition = "right",
  iconColor,
  icon = null,
  removeIcon = false,
  fw,
  fz,
  children,
}) => {
  const Icon = useMemo(() => {
    if (removeIcon) {
      return null
    }

    if (icon !== null) {
      return icon
    }

    return <BaseIcon color={iconColor ?? color} iconPosition={iconPosition} />
  }, [color, icon, iconColor, iconPosition, removeIcon])

  return (
    <Container href={href} target={target} rel={rel}>
      <Text color={color} iconPosition={iconPosition} fw={fw} fz={fz}>
        {children}
      </Text>
      {Icon}
    </Container>
  )
}

export default ExternalLink
