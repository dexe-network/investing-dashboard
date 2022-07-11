import styled, { css } from "styled-components"
import { Flex } from "theme"

const ContainerBase = css`
  width: 100%;
  height: calc(100vh - 128px);

  @media all and (display-mode: standalone) {
    height: calc(100vh - 149px);
  }
`

const Styled = {
  Container: styled.div`
    ${ContainerBase}
    box-sizing: border-box;
  `,
  List: styled.div`
    ${ContainerBase}
    height: fill-content;
    padding: 16px;
    position: relative;
    overflow-y: auto;
  `,
  Content: styled(Flex)`
    ${ContainerBase}
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
