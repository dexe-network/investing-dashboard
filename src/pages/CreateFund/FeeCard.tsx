import React from "react"
import styled from "styled-components"
import RadioButton from "components/RadioButton"

interface FeeCardProps {
  label: string
  description: string
  name: number
  selected: number
  handleSelect: (value: any) => void
}

const ContainerCard = styled.div``

const Body = styled.div``

const Text = styled.div``

const Label = styled.div``

const Description = styled.div``

const FeeCard: React.FC<FeeCardProps> = ({
  label,
  description,
  name,
  selected,
  handleSelect,
}) => {
  return (
    <ContainerCard onClick={() => handleSelect(name)}>
      <Body>
        <RadioButton
          selected={selected.toString()}
          value={name.toString()}
          onChange={handleSelect}
        />
        <Text>
          <Label>{label}</Label>
          <Description>{description}</Description>
        </Text>
      </Body>
    </ContainerCard>
  )
}

export default FeeCard
