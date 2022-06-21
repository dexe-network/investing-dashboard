import styled from "styled-components"

const Styled = {
  Container: styled.div<{ m?: string }>`
    display: grid;
    grid-template-columns: 33% 35.7% 1fr;
    width: 100%;
    margin: ${(props) => props.m ?? 0};
  `,
  First: styled.div``,
  Time: styled.div`
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 15px;
    font-feature-settings: "tnum" on, "lnum" on;
    color: #788ab4;
  `,
  Percentage: styled.div`
    margin-top: 2px;
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 16px;
    color: #9ae2cb;
  `,
}

export default Styled
