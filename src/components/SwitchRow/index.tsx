import { ReactNode, FC } from "react"
import { opacityVariants } from "motion/variants"

import { Flex } from "theme"
import Switch from "components/Switch"

import { RowContainer, FormLabel } from "./styled"

export { InputText } from "./styled"

interface SwitchRowProps {
  icon: ReactNode
  title: string
  isOn: boolean
  name: string
  onChange: (state: boolean) => void
}

const SwitchRow: FC<SwitchRowProps> = ({
  icon,
  title,
  isOn,
  name,
  children,
  onChange,
}) => {
  return (
    <>
      <RowContainer>
        <Flex ai="center">
          {icon}
          <FormLabel>{title}</FormLabel>
        </Flex>
        <Switch isOn={isOn} name={name} onChange={(n, s) => onChange(s)} />
      </RowContainer>
      <Flex
        p="15px 0 15px"
        initial={isOn ? "visible" : "hidden"}
        variants={opacityVariants}
        transition={{ duration: 0.4 }}
        animate={isOn ? "visible" : "hidden"}
        full
        dir="column"
      >
        {children}
      </Flex>
    </>
  )
}

export default SwitchRow
