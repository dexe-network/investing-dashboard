import { Flex, Text, BasicCard } from "theme"
import styled from "styled-components"

export const Title = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  color: #e4f2ff;
  margin: 0 0 -2px 16px;
`

export const Container = styled(Flex)`
  width: 100%;
  height: calc(100vh - 104px);
  padding: 16px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const Card = styled(BasicCard)`
  flex-direction: column;
`

export const CardHeader = styled(Flex)`
  flex-direction: column;
  width: 100%;
  padding: 24px 16px;
  justify-content: flex-start;
  position: relative;

  &:before {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    width: 100%;
    content: "";
    height: 1px;
    background: radial-gradient(
          54.8% 53% at 50% 50%,
          #587eb7 0%,
          rgba(88, 126, 183, 0) 100%
        )
        /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
      radial-gradient(
          60% 51.57% at 50% 50%,
          #6d99db 0%,
          rgba(109, 153, 219, 0) 100%
        )
        /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */,
      radial-gradient(
          69.43% 69.43% at 50% 50%,
          rgba(5, 5, 5, 0.5) 0%,
          rgba(82, 82, 82, 0) 100%
        )
        /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
    opacity: 0.1;
  }
`

export const TitleContainer = styled(Flex)`
  width: 100%;
  justify-content: flex-start;
`
