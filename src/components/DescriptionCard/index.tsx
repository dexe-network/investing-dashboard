import { DescriptionCardWrapper, Icon, Label, Content } from "./styled"
import pencil from "assets/icons/pencil-edit.svg"

interface Props {
  label: string
  value: any
}

const DescriptionCard: React.FC<Props> = ({ label, value }) => {
  return (
    <DescriptionCardWrapper isDefault={!value}>
      <Label>{label}</Label>
      <Content>{value}</Content>
      <Icon src={pencil} alt="pencil" />
    </DescriptionCardWrapper>
  )
}

export default DescriptionCard
