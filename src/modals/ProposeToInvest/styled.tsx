import styled from "styled-components"
import { Flex } from "theme"

const Styled = {
  ModalText: styled.div`
    width: inherit;
    padding: 0 16px 16px;
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 150%;
    text-align: center;
    color: #e4f2ff;
  `,
  ButtonContainer: styled(Flex)`
    width: inherit;
    padding: 0 16px 16px;
  `,
}

export default Styled
