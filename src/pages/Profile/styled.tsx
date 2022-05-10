import styled from "styled-components"
import { Flex, ease, device, rotateVariants, GradientBorder } from "theme"
import { motion } from "framer-motion"

export const Container = styled(motion.div)`
  padding: 16px 16px 50px;
  height: -webkit-fill-available;
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100vh - 94px);

  @media all and (display-mode: standalone) {
    height: calc(100vh - 115px);
  }
`

export const ButtonContainer = styled(Flex)`
  padding: 8px 0 16px;
  justify-content: space-around;
  width: 100%;
`

export const Details = styled(GradientBorder)`
  padding: 0 16px 16px;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  border-radius: 16px;
  margin-top: 27px;
`

export const TextGrey = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 130%;
  color: #5a6071;
`

export const TextWhiteBig = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 130%;
  /* or 18px */

  display: flex;
  align-items: center;
  text-align: right;

  color: #c5d1dc;
`

// EMMISSION

export const LeftText = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 130%;
  color: #c5d1dc;
`

const BarContainer = styled.div`
  background: #373e4d;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  border-radius: 4px;
  height: 4px;
  width: 100%;
`

const BarProgress = styled.div<{ w: string }>`
  background: linear-gradient(64.44deg, #63b49b 12.29%, #a4ebd4 76.64%);
  box-shadow: 0px 1px 4px rgba(164, 235, 212, 0.29),
    0px 2px 5px rgba(164, 235, 212, 0.14);
  border-radius: 2px;
  height: 4px;
  width: ${(props) => props.w || "0%"};
`

const EmissionContainer = styled.div`
  width: 100%;
`

const Current = ({ value }) => {
  return <TextWhiteBig>{value}</TextWhiteBig>
}

const Total = ({ value }) => {
  return <LeftText>{value}</LeftText>
}

const ProgressBar = () => {
  return (
    <BarContainer>
      <BarProgress w="60%" />
    </BarContainer>
  )
}

export const FundsUsed: React.FC<{ total: string; current: string }> = ({
  total,
  current,
}) => {
  return (
    <EmissionContainer>
      <Flex full>
        <Total value={total} />
        <Current value={current} />
      </Flex>
      <Flex p="7px 0 6px" full>
        <ProgressBar />
      </Flex>
    </EmissionContainer>
  )
}
