import { createGlobalStyle } from "styled-components"
import styled from "styled-components"
import { device } from "theme"
import { motion } from "framer-motion"
import background from "assets/background/dashboard-overlay.png"

const GlobalStyle = createGlobalStyle`
  body {
    width:100%;
    overflow-x:hidden;
    overflow-y:hidden;

    /* height: calc(var(--vh, 1vh) * 100);
    min-height: calc(var(--vh, 1vh) * 100); */
    min-height: -webkit-fill-available;
    touch-action: none;
    overscroll-behavior: none;
    user-select: none;
  }

  html {
    height: -webkit-fill-available;
    touch-action: none;
    overscroll-behavior: none;
  }

  #root * {
    box-sizing: border-box;
    font-family: Gilroy, Open-Sans, Helvetica, Sans-Serif;
  }

  #root {
    min-height: fill-available;
    min-height: -webkit-fill-available;
    touch-action: none;
    overscroll-behavior: none;
  }

  .ReactVirtualized__Grid,
  .ReactVirtualized__List {
    &:focus {
      outline: none;
    }
  }

  p {
    margin: 3px 0 2px;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }

  @keyframes animateButton {
    from {
      background: linear-gradient(
        90deg,
        rgba(127, 255, 212, 0.75) 0%,
        rgba(38, 128, 235, 0.75) 100%
      );
    }

    to {
      background: linear-gradient(
        90deg,
        rgba(127, 255, 212, 0.75) 0%,
        rgba(255, 127, 127, 0.75) 100%
      );
    }
  }
`

export const SpecialModalBackground = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  background: linear-gradient(
    214deg,
    rgba(41, 49, 52, 0.6) -50%,
    rgba(53, 52, 75, 0.6) 100%
  );
  backdrop-filter: blur(3px);
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;

  @media only screen and (${device.sm}) {
    bottom: 62px;
    height: auto;
  }
`

export const AppWrapper = styled.div`
  display: grid;
  min-height: -webkit-fill-available;
  background: linear-gradient(13.79deg, #141618 9.61%, #2c2f36 88.48%);
  grid-template-columns: 50px 1fr;
  grid-template-areas: "menu content";
  height: inherit;
  overscroll-behavior: none;
  touch-action: none;

  @media only screen and (${device.sm}) {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 62px;
    grid-template-areas: "content" "bottom";
    gap: 0px 0px;
    justify-items: stretch;
    align-items: stretch;
  }
`

// export const Overlay = styled.div`
//   background: url(${background});
//   background-repeat: no-repeat;
//   background-size: cover;
//   background-position: center;
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   z-index: 1;
// `

export const Content = styled.div<{ min?: boolean }>`
  z-index: 5;
  grid-area: content;
  touch-action: none;
  overflow-y: hidden;
  overscroll-behavior: none;
  transition: 0.2s all;
  transform: scale(${(props) => (props.min ? 0.9 : 1)});

  @media only screen and (${device.xs}) {
    /* padding-bottom: 62px; */
  }
`

export const Unsupported = styled.div`
  background: rgb(252, 14, 14);
  color: #fff;
  padding: 5px;
  text-align: center;
  z-index: 30;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`

export const RestrictedContainer = styled(motion.div)`
  height: calc(100% - 49px);
  padding-bottom: 42px;
`

export default GlobalStyle
