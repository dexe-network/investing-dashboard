import styled from "styled-components"
import { Flex } from "theme"
import TokenIcon from "components/TokenIcon"

import notificationMuted from "assets/icons/notification-muted.svg"
import notificationActive from "assets/icons/notification-active.svg"

export const Container = styled(Flex)`
  width: 100%;
  padding: 19px 16px;
  flex-direction: column;
`
export const Header = styled(Flex)`
  width: 100%;
  flex-direction: column;
`
export const Tabs = styled(Flex)`
  justify-content: space-between;
  width: 100%;
  padding: 18px 6px;
`

export const Tab = styled(Flex)<{ active?: boolean }>`
  justify-content: center;
  width: 60px;
  font-family: Gilroy;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  height: 23px;
  color: ${(props) => (props.active ? "#24272D" : "#5a6071")};
  border-radius: 6px;

  background: ${(props) =>
    props.active
      ? "linear-gradient(244.44deg, #63B49B 0%, #A4EBD4 67.65%)"
      : "transparent"};
`

export const Body = styled(Flex)`
  flex-direction: column;
  width: 100%;
`

const CardContainer = styled.div`
  margin-bottom: 16px;
  padding: 16px;
  background: linear-gradient(64.44deg, #1f232c 32.35%, #282f3f 100%);
  backdrop-filter: blur(54.3656px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 6px;
`

const Head = styled(Flex)`
  width: 100%;
  justify-content: space-between;
`

const TitleRow = styled.div`
  padding: 8px 0 2px;
  font-family: Gilroy;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;

  color: #dadada;
`

const CardDescription = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  /* or 150% */

  color: rgba(218, 218, 218, 0.7);
`

const TokenInfo = styled(Flex)``

const Date = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 18px;
  /* identical to box height, or 138% */

  letter-spacing: -0.312px;
  color: #5a6071;
  padding: 0 8px;
`

const Owner = styled.div`
  font-family: Gilroy;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  transform: translateY(2px);

  color: #5a6071;
`

const ActionsContainer = styled(Flex)``

const IconButton = styled.img``

export const Card = ({ owner, title, description, date }) => {
  return (
    <CardContainer>
      <Head>
        <TokenInfo>
          <TokenIcon size={25} />
          <Owner>{owner}</Owner>
        </TokenInfo>
        <ActionsContainer>
          <Date>{date}</Date>
          <IconButton src={notificationActive} />
        </ActionsContainer>
      </Head>
      <TitleRow>{title}</TitleRow>
      <CardDescription>{description}</CardDescription>
    </CardContainer>
  )
}
