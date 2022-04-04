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

const ContainerCard = styled.div<{
  withBackground?: boolean
  shadow?: boolean
}>`
  padding: 17px 6px 24px 16px;
  box-sizing: border-box;
  background: linear-gradient(64.44deg, #10151f 32.35%, #181d26 100%);
  mix-blend-mode: normal;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.01);
  border: 1px solid #26324482;
  border-radius: 15px;
  margin-bottom: 16px;
  background: ${(props) =>
    props.withBackground
      ? "linear-gradient(64.44deg, #10151F 32.35%, #181D26 100%)"
      : "transparent"};
  box-shadow: ${(props) =>
    props.shadow ? "0px 4px 4px rgba(0, 0, 0, 0.01)" : "none"};
`

const Body = styled.div`
  display: flex;
  align-items: center;
`

const Text = styled.div``

const Label = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #e4f2ff;
  margin-bottom: 7px;
`

const Description = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #e4f2ff;
  opacity: 0.9;
`

const FeeCard: React.FC<FeeCardProps> = ({
  label,
  description,
  name,
  selected,
  handleSelect,
}) => {
  const isActive = name === selected
  return (
    <ContainerCard
      onClick={() => handleSelect(name)}
      withBackground={isActive}
      shadow={isActive}
    >
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
