import styled from "styled-components"
import { Flex } from "theme"

const Styled = {
  List: styled.div`
    width: 100%;
    height: fill-content;
    height: calc(100vh - 174px);
    padding: 16px;
    position: relative;
    overflow-y: auto;

    @media all and (display-mode: standalone) {
      height: calc(100vh - 197px);
    }
  `,
  Content: styled(Flex)`
    width: 100%;
    height: inherit;
    align-items: center;
    justify-content: center;
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
