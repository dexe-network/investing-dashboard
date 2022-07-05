import styled from "styled-components"

const Styled = {
  Content: styled.div`
    height: calc(100vh - 128px);
    padding: 16px 16px 0;
    position: relative;
    overflow-y: auto;

    @media all and (display-mode: standalone) {
      height: calc(100vh - 149px);
    }
  `,
}

export default Styled
