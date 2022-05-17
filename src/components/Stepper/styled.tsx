import { motion } from "framer-motion"
import styled from "styled-components"
import { Flex } from "theme"

export const Container = styled(motion.div)`
  position: fixed;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 343px;
  height: fit-content;
  background: #181e2c;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  border-radius: 15px;
  z-index: 90;
`

export const Overlay = styled(motion.div)`
  background: rgba(27, 27, 27, 0.6);
  backdrop-filter: blur(6px);
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 80;
  height: 100%;
  width: 100%;
`

export const Header = styled(Flex)`
  position: relative;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 42px;
`

export const Body = styled(Flex)`
  width: 100%;
  flex-direction: column;
  padding: 0 16px 16px;
  box-sizing: border-box;
`

export const Title = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 20px;
  text-align: center;
  color: #e4f2ff;
`

export const Description = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 130%;
  text-align: center;
  letter-spacing: 0.03em;
  color: #616d8b;
  max-width: 275px;
  margin-top: 28px;
`

export const Close = styled.div`
  position: absolute;
  height: 24px;
  width: 24px;
  top: 18px;
  right: 12px;
`

export const StepsContainer = styled(Flex)`
  width: 100%;
  margin: 35px 4px 28px;
  box-sizing: border-box;
  position: relative;
`

export const Number = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 700;
  font-size: 11px;
  line-height: 12px;
  text-align: center;
`

export const Label = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  letter-spacing: 0.3px;
  padding-top: 6px;
  transition: all 0.3s ease-in-out;
  transition-delay: 0.2s;
`

export const Circle = styled(Flex)`
  justify-content: center;
  height: 20px;
  width: 20px;
  background: #181e2c;
  border-radius: 50px;
  z-index: 5;
  transition: all 0.3s ease-in-out;
  transition-delay: 0.2s;
`

export const Line = styled.div<{ width: number; offset: number }>`
  background: linear-gradient(65.03deg, #a4ebd4 12.07%, #63b49b 78.73%);
  box-shadow: 0px 1px 4px rgba(164, 235, 212, 0.29),
    0px 2px 5px rgba(164, 235, 212, 0.14);
  height: 1px;
  width: ${({ width }) => width}%;
  left: ${({ offset }) => offset}px;
  top: 11px;
  position: absolute;
  transition: all 0.2s ease-in-out;
  z-index: 4;
`

export const Track = styled.div<{ offset: number }>`
  background: #141925;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  height: 1px;
  position: absolute;
  left: ${({ offset }) => offset}px;
  top: 11px;
  right: ${({ offset }) => offset}px;
`

export const Step = styled(Flex)<{ active?: boolean; failed?: boolean }>`
  flex-direction: column;
  flex: 1;

  ${Number} {
    color: ${({ active }) => (active ? "#9ae2cb" : "#616D8B")};
  }

  ${Label} {
    color: ${({ active }) => (active ? "#e4f2ff" : "#616D8B")};
  }

  ${Circle} {
    border: 1px solid
      ${({ active, failed }) =>
        active ? (failed ? "#DB6D6D" : "#9ae2cb") : "#616D8B"};
  }
`
