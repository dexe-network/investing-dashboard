import styled from "styled-components"
import { Flex } from "theme"

const Styled = {
  Container: styled(Flex)`
    height: calc(100vh - 128px);
    position: relative;

    @media all and (display-mode: standalone) {
      height: calc(100vh - 149px);
    }
  `,
}

export default Styled
