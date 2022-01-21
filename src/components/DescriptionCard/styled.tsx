import styled from "styled-components"

export const DescriptionCardWrapper = styled.div<{ isDefault?: boolean }>`
  padding: 27px 11px 16px 13px;
  box-sizing: border-box;
  position: relative;
  // overflow: hidden;
  height: fit-content;
  width: 100%;
  background: linear-gradient(64.44deg, #24272f 32.35%, #2c313c 100%);
  mix-blend-mode: normal;
  border-radius: 6px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08);

  &::before {
    content: "";
    position: absolute;
    width: 3px;
    top: 0;
    bottom: 0;
    left: 0;
    background: ${(props) =>
      props.isDefault
        ? "rgb(92, 97, 102)"
        : "linear-gradient(244.44deg, #63b49b 0%, #a4ebd4 67.65%)"};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    border-radius: 10px 0 0 10px;
  }
`

export const Label = styled.div`
  font-family: Gilroy;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #9ae2cb;
`

export const Content = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 130%;
  letter-spacing: 0.1px;
  color: #848a9a;
  margin-top: 7px;
`

export const Icon = styled.img`
  position: absolute;
  fill: #5c6166;
  bottom: 0;
  right: 0;
  width: 32px;
  height: 32px;
`

export default {}
