import styled from "styled-components"
import { Flex } from "theme"

const Styled = {
  List: styled.div`
    width: 100%;
    height: fill-content;
    height: calc(100vh - 128px);
    padding: 16px;
    position: relative;
    overflow-y: auto;

    @media all and (display-mode: standalone) {
      height: calc(100vh - 149px);
    }
  `,
  Content: styled(Flex)`
    width: 100%;
    height: inherit;
    align-items: center;
    justify-content: center;
  `,
}

export default Styled
