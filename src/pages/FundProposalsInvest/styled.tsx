import styled from "styled-components"

const Styled = {
  Content: styled.div`
    height: calc(100vh - 174px);
    padding: 16px;
    position: relative;
    overflow-y: auto;

    @media all and (display-mode: standalone) {
      height: calc(100vh - 197px);
    }
  `,
}

export default Styled
