import styled from "styled-components"

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  border-radius: 50px;
  height: 45px;
  width: 45px;
`

interface Props {
  icon: string
}

const FloatingButton: React.FC<Props> = ({ icon }) => {
  return (
    <Button>
      <img src={icon} />
    </Button>
  )
}

export default FloatingButton
