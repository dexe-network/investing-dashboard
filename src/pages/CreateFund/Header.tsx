import styled from "styled-components"

interface HeaderProps {
  title: string
  description: string
  index: string
}

const MainContainer = styled.div`
  display: flex;
  align-items: center;
`

const Container = styled.div``

const Index = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  width: 27px;
  height: 27px;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  color: #e4f2ff;
  border: 2px;
  border-color: #3e5e88;
  border-style: solid;
  border-radius: 100px;
`

const Title = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 18px;
  color: #c5d1dc;
  text-align: left;
  margin-bottom: 12px;
`

const Description = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 10px;
  letter-spacing: 0.03em;
  text-align: left;
  color: #666f87;
`

const Header: React.FC<HeaderProps> = ({ title, description, index }) => {
  return (
    <MainContainer>
      <Index>{index}</Index>
      <Container>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Container>
    </MainContainer>
  )
}

export default Header
