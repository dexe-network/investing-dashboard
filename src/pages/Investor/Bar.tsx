import { Flex, device } from "theme"
import styled, { createGlobalStyle } from "styled-components"

const Container = styled(Flex)`
  width: 100%;
  justify-content: space-evenly;
  margin: 44px 0 22px;
`

const Bar = styled.div`
  box-shadow: inset 1px 2px 2px 2px rgba(0, 0, 0, 0.2);
  width: 16px;
  height: 40px;
  background: rgba(60, 66, 78, 0.5);
  border-radius: 4px;
`

const BarChart = () => {
  return (
    <Container>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((v) => (
        <Bar key={v} />
      ))}
    </Container>
  )
}

export default BarChart
