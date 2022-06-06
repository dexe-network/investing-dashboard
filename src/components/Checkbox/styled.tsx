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
  padding-left: 16px;
`

export const Checkmark = styled.span<{ error: boolean }>`
  position: absolute;
  left: 0;
  height: 16px;
  width: 16px;
  background-color: transparent;
  border: 2px solid ${({ error }) => (error ? "#DB6D6D" : "#7fffd4")};
  box-sizing: border-box;
  border-radius: 2px;
  transition: all 0.15s ease-in-out;

  &:after {
    content: "";
    position: absolute;
    display: none;

    transition: all 0.15s ease-in-out;
    border: solid ${({ error }) => (error ? "#DB6D6D" : "#7fffd4")};
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
  left: 0;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

  &:checked ~ ${Checkmark}:after {
    display: block;
  }
`
