import { FC, ReactNode } from "react"
import styled from "styled-components"
import { Flex } from "theme"

export const contentVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    transition: {
      duration: 0.3,
    },
    opacity: 1,
  },
}

export const Container = styled(Flex)`
  width: 100%;
  height: calc(100vh - 94px);
  padding: 16px;
  align-items: center;
  flex-direction: column;
  overflow-y: scroll;

  @media all and (display-mode: standalone) {
    height: calc(100vh - 115px);
  }
`

export const Card = styled(Flex)`
  flex-direction: column;
  background: linear-gradient(64.44deg, #191e2b 32.35%, #272e3e 100%);
  width: 100%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  max-height: fit-content;
  margin: auto;
`

export const Content = styled(Flex)`
  overflow-y: auto;
  flex-direction: column;
  align-items: flex-start;
  width: fill-available;
`

export const Title = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  color: #e4f2ff;

  &:nth-child(2) {
    margin: 0 4px -2px 8px;
  }
`

export const SubTitle = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 12px;
  color: #e4f2ff;
  text-align: left;
  margin-bottom: 16px;
`

export const Link = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  color: #2680eb;
  transform: translateY(1px);
  margin-right: auto;
`

export const CardHeader = styled(Flex)`
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

export const Body = styled(Flex)<{ noPaddings?: boolean }>`
  width: fill-available;
  flex-direction: column;
  align-items: flex-start;
  padding: ${(props) => (props.noPaddings ? "16px 0 0" : "16px 16px 24px")};
`

export const FaqText = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 140%;
  letter-spacing: 0.03em;
  color: #e4f2ff;
  opacity: 0.8;
`

export const CheckboxLabel = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0.03em;
  color: #e4f2ff;
  margin-left: 8px;
  transform: translateY(3px);
`

export const CalendarIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
  transform: translateY(-1px);
`

export const TokenContainer = styled(Flex)`
  padding: 0 16px;
  background: linear-gradient(
    266.2deg,
    rgba(169, 221, 251, 0) 2.35%,
    rgba(193, 218, 255, 0.04) 96.05%
  );
  height: 50px;
  margin-top: 16px;
  width: 100%;
`

export const TokenInfo = styled(Flex)`
  flex-direction: column;
  align-items: flex-start;
  margin-right: auto;
`

export const Symbol = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  text-align: left;
  letter-spacing: 0.0168em;
  font-feature-settings: "tnum" on, "lnum" on;
  color: #e4f2ff;
`

export const Name = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 142%;
  text-align: left;
  letter-spacing: 0.03em;
  font-feature-settings: "tnum" on, "lnum" on;
  color: #616d8b;
`

export const Price = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 130%;
  text-align: right;
  letter-spacing: 0.03em;
  color: #e4f2ff;
`

export const HintText = styled.div`
  padding: 16px 0 40px;
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #616d8b;
`

export const LabelText = styled(Flex)`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0.5px;
  color: #e4f2ff;
  margin: 0 6px;
  justify-content: flex-start;
  transform: translateY(-1.5px);
`

interface Props {
  icon: ReactNode
  right?: ReactNode
}
export const Label: FC<Props> = ({ icon, right, children }) => {
  return (
    <Flex p="0 0 10px" full>
      {icon}
      <Flex full>
        <LabelText>{children}</LabelText>
        <LabelText>{right}</LabelText>
      </Flex>
    </Flex>
  )
}

export const Row = styled(Flex)`
  width: 100%;
  padding: 10px 0;
  flex-direction: column;
  align-items: flex-start;
`

export const TextBase = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  text-align: right;
`

export const White = styled(TextBase)`
  color: #e1f2ff;
  margin: 0 5px;
`

export const Grey = styled(TextBase)`
  color: #5e6d8e;
`
