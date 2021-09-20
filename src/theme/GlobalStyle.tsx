import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  body {
    width:100%;
    overflow-x:hidden;
    overflow-y:hidden;

    height: calc(var(--vh, 1vh) * 100);
    min-height: calc(var(--vh, 1vh) * 100);
    min-height: -webkit-fill-available;
  }

  html {
    height: -webkit-fill-available;
  }

  #root * {
    box-sizing: border-box;
    font-family: Gilroy, Open-Sans, Helvetica, Sans-Serif;
  }

  #root {
    min-height: fill-available;
    min-height: -webkit-fill-available;
  }

  .ReactVirtualized__Grid,
  .ReactVirtualized__List {
    &:focus {
      outline: none;
    }
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

export default GlobalStyle
