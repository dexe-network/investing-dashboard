import styled from "styled-components"
import { Flex } from "theme"

const Styled = {
  Container: styled(Flex)`
    flex-direction: column;
    width: 100%;
  `,
  Body: styled.div`
    width: calc(100% + 10px);
    overflow: "hidden";
    height: 130px;
  `,
  NoData: styled.div`
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 130%;
    letter-spacing: 0.03em;
    color: #616d8b;
    opacity: 0.9;
  `,
}

export default Styled
