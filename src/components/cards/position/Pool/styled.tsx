import styled, { css } from "styled-components"

const SharedAmount = css`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 100%;
  color: #e4f2ff;
  transform: translateY(2px);
`
const Styled = {
  PositionSymbol: styled.div`
    ${SharedAmount}
    margin: 0 4px;
  `,

  Amount: styled.div`
    ${SharedAmount}
    margin: 0 0 0 8px;
  `,
}

export default Styled
