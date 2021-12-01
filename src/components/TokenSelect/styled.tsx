import { Flex, Text } from "theme"
import styled from "styled-components"

export const Input = styled.input`
  border-radius: 7px;
  appearance: none;
  border: none;
  background: linear-gradient(
    261deg,
    rgba(51, 62, 64, 1) 0%,
    rgba(128, 128, 128, 0.5) 100%
  );
  height: 48px;
  width: 100%;
  outline: none;
  padding: 18px 14px 14px;
  transition: all 0.5s;
  color: #c2c3c4;

  &::placeholder {
    vertical-align: middle;
    line-height: 16px;
    font-size: 16px;
    color: #c2c3c4;
  }

  &:focus {
    box-shadow: 0px 3px 6px 0 rgba(0, 0, 0, 0.23) inset;
    -webkit-box-shadow: 0px 3px 6px 0 rgba(0, 0, 0, 0.23) inset;
    -moz-box-shadow: 0px 3px 6px 0 rgba(0, 0, 0, 0.23) inset;

    &::placeholder {
      color: #999999;
    }
  }
`

export const CommonContainer = styled.div`
  max-width: 300px;
  margin: 25px 15px 0;
`

export const CommonsList = styled(Flex)`
  flex-wrap: wrap;
`

export const CommonItem = styled(Flex)`
  min-width: 86px;
  justify-content: flex-start;
  margin-bottom: 6px;
  margin-top: 7px;
  user-select: none;
  cursor: pointer;
`

export const FullList = styled(Flex)`
  margin-top: 23px;
  flex-direction: column;
  max-height: 373px;
  flex: 1;
  width: 100%;
  border-radius: 5px;
  box-shadow: 0px 3px 6px 0 rgba(0, 0, 0, 0.23) inset;
  -webkit-box-shadow: 0px 3px 6px 0 rgba(0, 0, 0, 0.23) inset;
  -moz-box-shadow: 0px 3px 6px 0 rgba(0, 0, 0, 0.23) inset;
  background: linear-gradient(
    219deg,
    rgba(41, 49, 52, 1) 0%,
    rgba(53, 52, 75, 1) 100%
  );
  overflow-y: auto;
`

export const FullItem = styled(Flex)`
  user-select: none;
  cursor: pointer;
  height: 48px;
  min-height: 48px;
  padding: 10px 15px;
  justify-content: flex-start;
  border-radius: 5px;
  transition: all 0.3s;

  &:hover {
    background: linear-gradient(
      94deg,
      rgba(51, 62, 64, 1) 0%,
      rgba(128, 128, 128, 0.5018382352941176) 100%
    );
    box-shadow: 0px 3px 6px 0 rgba(0, 0, 0, 0.23);
  }
`

export const Price = styled(Text)`
  color: #f7f7f7;
  font-size: 16px;
  font-weight: 500;
  margin-left: auto;
`

export const Title = styled(Text)`
  color: #c2c3c4;
  font-size: 14px;
  font-size: 500;
`
