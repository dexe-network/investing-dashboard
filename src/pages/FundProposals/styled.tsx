import styled from "styled-components"

const Styled = {
  Content: styled.div<{ withExtraTabs?: boolean }>`
    height: ${(props) =>
      props.withExtraTabs ? "calc(100vh - 174px)" : "calc(100vh - 128px)"};
    position: relative;

    @media all and (display-mode: standalone) {
      height: ${(props) =>
        props.withExtraTabs ? "calc(100vh - 197px)" : "calc(100vh - 149px)"};
    }
  `,
}

export default Styled
