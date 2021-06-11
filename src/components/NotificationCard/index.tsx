import { Card, Header, Time, Title, Description, Body } from "./styled"
import DexeIcon from "assets/menu/DexeIcon"
import DexeInvestments from "assets/menu/DexeInvestments"

import formatDistance from "date-fns/formatDistance"

import { Flex } from "theme"
import { INotification } from "constants/interfaces"

const NotificationCard: React.FC<INotification> = ({
  title,
  description,
  link,
  createdAt,
}) => {
  return (
    <Card href={link} target="_blank" rel="noopener noreferrer">
      <Header p="3px 7px" full jc="space-between" ai="center">
        <Flex>
          <DexeIcon size={27} />
          <DexeInvestments styles={{ marginLeft: -18 }} scale={0.55} />
        </Flex>
        <Time>{formatDistance(new Date(createdAt), new Date())}</Time>
      </Header>
      <Body full dir="column" ai="flex-start" p="7px">
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Body>
    </Card>
  )
}

export default NotificationCard
