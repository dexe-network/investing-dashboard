import styled from "styled-components"
import { Flex } from "theme"

export const Container = styled(Flex)`
  width: fill-available;
  padding: 0 16px 0;
  box-sizing: border-box;
`

export const TrackerPart = styled.div`
  display: flex;
  height: 3px;
  flex: 1;
  background: #131927;
  border-radius: 6px;
  &:last-child {
    margin-left: 2px;
    justify-content: flex-end;
  }
`

const Fill = styled.div<{ percent?: number }>`
  height: 3px;
  box-shadow: 0px 1px 4px rgba(164, 235, 212, 0.29),
    0px 2px 5px rgba(164, 235, 212, 0.14);
  border-radius: 2px;
  width: ${(props) => props.percent || 0}%;
`

export const UpFill = styled(Fill)`
  background: linear-gradient(65.03deg, #a4ebd4 12.07%, #63b49b 78.73%);
`
export const DownFill = styled(Fill)`
  background: linear-gradient(267.88deg, #d75e65 -0.85%, #e77171 98.22%);
`
