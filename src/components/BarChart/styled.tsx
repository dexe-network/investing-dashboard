import styled from "styled-components"

export const pnlToBarHeight = (pnl) => {
  const val = pnl < 0 ? pnl * -1 : pnl
  const pnlInHeight = val * 0.32

  const height = pnlInHeight > 32 ? 32 : pnlInHeight
  return `${height}px`
}

export const StyledBarChart = styled.div`
  width: 175px;
  height: 64px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
`

export const TickContainer = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  position: relative;
  height: 64px;
  width: 10px;
`

export const Tick = styled.div<{ pnl: number }>`
  position: absolute;
  left: 0;
  right: 0;
  background: #464857;
  width: 10px;
  margin: 0 2.5px;
  transition: all 0.4s cubic-bezier(0.63, 0.08, 0.49, 0.84);
`

export const TickUp = styled(Tick)`
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  bottom: 32px;

  border-top: 2px solid ${(props) => (props.pnl > 0 ? "#7fffd4" : "#464857")};
  height: ${(props) =>
    props.pnl && props.pnl > 0 ? pnlToBarHeight(props.pnl) : "2px"};

  &:hover {
    background: #7fffd4;
  }
`

export const TickDown = styled(Tick)`
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  top: 32px;

  border-bottom: 2px solid ${(props) => (props.pnl < 0 ? "#ff7f7f" : "#464857")};
  height: ${(props) =>
    props.pnl && props.pnl < 0 ? pnlToBarHeight(props.pnl) : "2px"};

  &:hover {
    background: ${(props) => (props.pnl <= 0 ? "#ff7f7f" : "transparent")};
  }
`
