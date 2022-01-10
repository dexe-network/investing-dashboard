import styled from "styled-components"

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: #282a30;
  box-shadow: 1px 2px 4px 1px rgba(0, 0, 0, 0.25);
  border-radius: 50px;
  height: 32px;
  width: 32px;
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
