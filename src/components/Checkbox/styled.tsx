import styled from "styled-components"

export const Container = styled.label`
  display: block;
  position: relative;
  height: 16px;
  cursor: pointer;
  font-size: 12px;
  line-height: 16px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

export const Checkmark = styled.span`
  position: absolute;
  height: 16px;
  width: 16px;
  background-color: transparent;
  border: 2px solid #7fffd4;
  box-sizing: border-box;
  border-radius: 2px;
  transition: all 0.15s ease-in-out;

  &:after {
    content: "";
    position: absolute;
    display: none;

    transition: all 0.15s ease-in-out;
    border: solid #7fffd4;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    left: 2px;
    top: 1px;
    width: 5px;
    height: 5px;
    border-width: 0 2px 2px 0;
  }
`

export const Input = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

  &:checked ~ ${Checkmark}:after {
    display: block;
  }
`

export const Label = styled.span`
  font-family: Gilroy;
  font-size: 14px;
  line-height: 14px;
  letter-spacing: 0.4px;
  color: #fff;
  margin-left: 15px;
  display: flex;
  align-items: center;
  font-weight: 400;
`
