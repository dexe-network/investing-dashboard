import { Flex } from "theme"
import styled from "styled-components"

const Container = styled(Flex)`
  width: 100%;
  justify-content: center;
  padding: 20px 0;
  position: relative;
`

const FundsList: React.FC = () => {
  return <Container>pools list widget</Container>
}

export default FundsList
