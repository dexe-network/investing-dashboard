import styled from "styled-components"
import { Flex } from "theme"

export const Styled = {
  Container: styled(Flex)`
    width: 100%;
  `,
  Content: styled.div`
    display: grid;
    grid-template-columns: 0.5fr 0.25fr 0.25fr;
    gap: 18px;
    width: 100%;
    align-items: flex-start;
    padding: 12px 15px;
  `,
  Item: styled(Flex)`
    width: 100%;
    flex: 0 1 auto;
    flex-direction: column;
    align-items: flex-start;
  `,
  Label: styled.div`
    width: 100%;
    margin-bottom: 4px;
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 500;
    font-size: 11px;
    line-height: 13px;
    color: #788ab4;
  `,
  Value: styled.div`
    width: 100%;
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: 0.03em;
    color: #e4f2ff;
  `,
  Direction: styled.span<{ isBuy?: boolean }>`
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: 0.03em;
    color: ${(props) => (props.isBuy ? "#9AE2CB" : "#DB6D6D")};
  `,
}

export default Styled
