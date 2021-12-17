import { InnerCircle, OuterCircle, Container } from "./styled"

const RadioButton: React.FC<{
  selected: any
  onChange: (value: any) => void
  value: any
}> = ({ selected, onChange, value }) => {
  return (
    <Container
      onClick={() => {
        onChange(value)
      }}
    >
      <OuterCircle unselected={value !== selected}>
        <InnerCircle unselected={value !== selected} />
      </OuterCircle>
    </Container>
  )
}

export default RadioButton
