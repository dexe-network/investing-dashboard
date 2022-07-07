import styled from "styled-components"
import { Flex } from "theme"

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

  PageLoading: styled(Flex)`
    height: calc(100vh - 128px);

    @media all and (display-mode: standalone) {
      height: calc(100vh - 149px);
    }
  `,

  ListLoading: styled(Flex)`
    height: calc(100vh - 174px);

    @media all and (display-mode: standalone) {
      height: calc(100vh - 197px);
    }
  `,
}

export default Styled
