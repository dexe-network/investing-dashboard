import { OneValueCardWrapper, Label, Value, Icon } from "./styled"
import pencil from "assets/icons/pencil-edit.svg"

import React from "react"

interface OneValueCardProps {
  label: string
  value: string
}

const OneValueCard: React.FC<OneValueCardProps> = ({ label, value }) => {
  return (
    <OneValueCardWrapper>
      <Label>{label}</Label>
      <Value>{value}</Value>
      <Icon src={pencil} alt="pencil" />
    </OneValueCardWrapper>
  )
}

export default OneValueCard
