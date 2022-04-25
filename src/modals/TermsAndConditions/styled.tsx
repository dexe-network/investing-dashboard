import styled from "styled-components"

export const ModalText = styled.div`
  padding: 0 16px 0;
  box-sizing: border-box;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 130%;
  color: #e4f2ff;
  & > ul {
    padding-inline-start: 16px;
    margin-block-start: 0;
    margin-block-end: 0;
  }
  & ul > li {
    margin-bottom: 16px;
  }
  & ul > li:last-child {
    margin-bottom: 0;
  }
`

export const CheckBoxContent = styled.div`
  display: flex;
  align-items: center;
  padding: 28px 20px;
  box-sizing: border-box;
`

export const CheckboxText = styled.div`
  padding-left: 10px;
  box-sizing: border-box;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  letter-spacing: 0.03em;
  color: #e4f2ff;
`

export const CheckboxLink = styled.a`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  letter-spacing: 0.03em;
  color: #0076bc;
`

export const ButtonContainer = styled.div`
  padding: 0 16px 20px;
  box-sizing: border-box;
`

export const Button = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
  text-align: center;
  color: #202020;
`
