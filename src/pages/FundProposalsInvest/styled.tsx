import styled from "styled-components"
import { Flex } from "theme"

const Styled = {
  Container: styled.div`
    height: calc(100vh - 128px);
    padding: 16px 16px 0;
    position: relative;
    overflow-y: auto;

    @media all and (display-mode: standalone) {
      height: calc(100vh - 149px);
    }
  `,
  Content: styled(Flex)`
    width: 100%;
    height: calc(100vh - 128px);
    justify-content: center;
    align-items: center;

    @media all and (display-mode: standalone) {
      height: calc(100vh - 149px);
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
