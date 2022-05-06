import styled from "styled-components"
import { Flex } from "theme"

export const Container = styled(Flex)<{ withBackground: boolean }>`
  height: 26px;
  width: 26px;
  justify-content: center;
  text-align: center;
  border-radius: 9px;

  background: ${({ withBackground }) =>
    withBackground ? "#1C2230" : "transparent"};
`

export const Icon = styled.img<{ size: number }>`
  height: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
`
