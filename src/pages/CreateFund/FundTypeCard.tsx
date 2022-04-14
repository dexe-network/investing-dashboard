import RadioButton from "components/RadioButton"
import React from "react"
import styled from "styled-components"

interface FundTypeCardProps {
  label: string
  description: string
  name: "basic" | "investment"
  selected: string
  handleSelect: (value: any) => void
  link: string
}

const ContainerCard = styled.div<{
  withBackground?: boolean
  shadow?: boolean
}>`
  padding: 28px 10px 26px 16px;
  box-sizing: border-box;
  background: linear-gradient(64.44deg, #10151f 32.35%, #181d26 100%);
  mix-blend-mode: normal;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.01);
  border: 1px solid #26324482;
  border-radius: 16px;
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
  line-height: 14px;
  color: #e4f2ff;
  text-align: left;
  margin-bottom: 12px;
`

const Description = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.03em;
  color: #e4f2ff;
`

const Link = styled.a`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.03em;
  color: #0165c2;
  text-decoration: none;
`

const FundTypeCard: React.FC<FundTypeCardProps> = ({
  label,
  description,
  selected,
  name,
  handleSelect,
  link,
}) => {
  const isActive = name === selected
  return (
    <ContainerCard
      onClick={() => handleSelect(name)}
      withBackground={isActive}
      shadow={isActive}
    >
      <Body>
        <RadioButton selected={selected} value={name} onChange={handleSelect} />
        <Text>
          <Label>{label}</Label>
          <Description>{description}</Description>
          <Link href={link}>Read more</Link>
        </Text>
      </Body>
    </ContainerCard>
  )
}

export default FundTypeCard
