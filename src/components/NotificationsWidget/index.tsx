import styled from "styled-components"
import { Block, Text, Flex } from "theme"
import Avatar from "components/Avatar"
import bell from "assets/icons/notification-bell.svg"

interface NotificationsWidgetProps {
  notifications?: any[]
}

const Symbol = styled(Text)`
  height: 25px;
  font-size: 25px;
  font-family: "Gilroy-Bold";
font-weight: 700;;
  color: #c2c3c4;
  padding: 0 6px;
  margin-left: 4px;
`

const Name = styled(Text)`
  height: 14px;
  font-size: 14px;
  color: #999999;
  font-family: "Gilroy-Regular";
font-weight: 400;
`

const Message = styled(Text)`
  height: 14px;
  color: #ffffff;
  opacity: 0.8;
  font-family: "Gilroy-Bold";
font-weight: 700;;
`

const BageContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 15px;
  margin-bottom: 15px;
  height: 18px;
  padding: 2px 5px 0;
  background: #ff4c42;
  border-radius: 8px;
  display: flex;
  align-items: center;
`

const BageCounter = styled(Text)`
  color: #fff;
  font-family: "Gilroy-Bold";
font-weight: 700;;
  font-size: 14px;
`

const BageIcon = styled.img`
  height: 10px;
  margin-left: 5px;
  margin-bottom: 2px;
`

const Bage: React.FC<{ index: number }> = ({ index }) => (
  <BageContainer>
    <BageCounter>{index}</BageCounter>
    <BageIcon src={bell} alt="bell icon" />
  </BageContainer>
)

const Card = () => {
  return (
    <Flex full dir="column" ai="flex-start">
      <Flex full jc="space-between" p="0 0 4px">
        <Flex>
          <Avatar
            url="https://i.guim.co.uk/img/media/4d65894cd46a446612b10fbc1337fe9394c6d291/0_100_3112_1867/master/3112.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=41118f27e08c30514642e4a4c6723db2"
            m="-2px 0 0 0"
            size={40}
          />
          <Symbol>ISDX</Symbol>
          <Name>Bill Trade</Name>
        </Flex>
      </Flex>
      <Flex full>
        <Message>
          Proposal for a new{" "}
          <Text color="#FF7F7F" fw={800}>
            risky
          </Text>{" "}
          asset
        </Message>
        <Flex>
          <Avatar
            url="https://s2.coinmarketcap.com/static/img/coins/64x64/9110.png"
            m="0 6px 0 0"
            size={30}
          />
          <Text color="#FFFFFF" fz={18} fw={800}>
            KTN
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

const NotificationsWidget: React.FC<NotificationsWidgetProps> = (props) => {
  const { notifications } = props
  const body =
    !notifications || !notifications.length ? (
      <Text fz={16}>No new notifications</Text>
    ) : (
      <>
        <Bage index={notifications.length} />
        <Card />
      </>
    )

  return <Block p="7px 10px 6px 10px">{body}</Block>
}

export default NotificationsWidget
