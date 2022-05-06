import styled from "styled-components"
import { Flex } from "theme"

export const Container = styled(Flex)`
  background: linear-gradient(64.44deg, #1f232c 32.35%, #282f3f 100%);
  box-shadow: 8px 3px 22px 10px rgba(0, 0, 0, 0.17);
  border-radius: 16px;
  padding: 24px;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: fit-content;
  height: fit-content;
  flex-direction: column;
  max-width: 308px;
  z-index: 90;
  margin: auto;
`

export const Overlay = styled(Flex)`
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

export const TimeLabel = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #e4f2ff;
`

export const TimeInput = styled.input`
  border-radius: 15px;
  appearance: none;
  outline: none;
  background: none;
  border: 1px solid #406089;
  height: 30px;
  width: 63px;

  font-family: "Gilroy";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  text-align: center;
  color: #e4f2ff;

  &[type="time"]::-webkit-calendar-picker-indicator {
    background: none;
    display: none;
  }
`
