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
    margin: 0 0 0 4px;
  `,

  Amount: styled.div`
    ${SharedAmount}
    margin: 0 0 0 8px;
  `,

  FundSymbol: styled.div`
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 100%;
    color: #616d8b;
    transform: translateY(2px);
    margin-right: 4px;
  `,

  Symbols: styled.div`
    position: relative;
    width: 41px;
    height: 26px;
  `,

  SymbolItem: styled.div`
    position: absolute;

    &:nth-child(1) {
      z-index: 1;
      left: 0;
      top: 1px;
    }
    &:nth-child(2) {
      z-index: 2;
      right: 0;
      top: 0;
    }
  `,
}

export default Styled
