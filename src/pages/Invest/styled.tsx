import styled from "styled-components"
import { Flex, Text, BaseButton } from "theme"

export const ErrorText = styled(Text)`
  font-size: 18px;
  color: #ff7f7f;
  font-weight: bold;
`

export const ApproveButton = styled(BaseButton)`
  background: linear-gradient(
    34deg,
    rgba(51, 62, 64, 1) 0%,
    rgba(79, 81, 85, 1) 100%
  );
  box-shadow: 0px 0px 7px #ff7f7f;
  font-size: 22;
  color: #dbdbdb;
  font-weight: bold;
  padding: 22px 15px 19px;
  width: 100%;
  border-radius: 10px;
`
