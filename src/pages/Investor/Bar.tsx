import { Flex, device } from "theme"
import styled, { createGlobalStyle } from "styled-components"
import tooltipIcon from "assets/others/tooltip-bar.svg"

const Container = styled(Flex)`
  width: 100%;
  justify-content: space-evenly;
  margin: 44px 0 22px;
`

const Tip = styled.img`
  position: absolute;
  top: -50px;
  left: -13px;
  height: 46px;
  width: 129px;
  display: none;
`

const Bar = styled.div<{ active?: boolean }>`
  position: relative;
  box-shadow: inset 1px 2px 2px 2px rgba(0, 0, 0, 0.2);
  width: 16px;
  height: 40px;
  background: rgba(60, 66, 78, 0.5);
  border-radius: 4px;

  &:first-child {
    &:before {
      content: "";
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 50%;
      margin: auto;
      background: linear-gradient(
        179.35deg,
        #63b49b 1.92%,
        #63b49b 1.93%,
        rgba(164, 235, 212, 0) 99.53%
      );
      box-shadow: 0px -4px 8px -1px rgba(154, 226, 203, 0.2);
      border-radius: 4px 4px 0px 0px;
      display: ${(props) => (props.active ? "block" : "none")};
    }
    & ${Tip} {
      display: block;
    }
  }
`

const BarChart: React.FC<{ withTip?: boolean }> = ({ withTip }) => {
  return (
    <Container>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((v) => (
        <Bar active={withTip} key={v}>
          {withTip && <Tip src={tooltipIcon} />}
        </Bar>
      ))}
    </Container>
  )
}

export default BarChart
