import styled from "styled-components"
import { Flex } from "theme"

const Styled = {
  Container: styled.div`
    height: calc(100vh - 174px);
    padding: 16px;
    position: relative;
    overflow-y: auto;

    @media all and (display-mode: standalone) {
      height: calc(100vh - 197px);
    }
  `,

  Content: styled(Flex)`
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
  WithoutData: styled.div`
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 16px;
    color: #e4f2ff;
  `,
}

export default Styled
