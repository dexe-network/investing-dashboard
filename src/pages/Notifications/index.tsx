import { useState } from "react"
import Search from "components/Search"
import { Flex } from "theme"
import { Container, Header, Tabs, Tab, Body, Card } from "./styled"

const notifications = [
  {
    date: "12.12.21, 12:27",
    title: "New Investment",
    description:
      "Notification text would be placed right here. This is where notification text would be placed.",
    owner: "Bill Trade",
  },
  {
    date: "12.12.21, 12:15",
    title: "New Fund created",
    description:
      "Notification text would be placed right here. This is where notification text would be placed.",
    owner: "Bill Trade",
  },
  {
    date: "12.12.21, 12:00",
    title: "Welcome to Investing",
    description:
      "Notification text would be placed right here. This is where notification text would be placed.",
    owner: "Bill Trade",
  },
]

const Notifications: React.FC = () => {
  const [query, setQuery] = useState("")
  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Header>
        <Flex full>
          <Search
            value={query}
            handleChange={(v) => setQuery(v)}
            placeholder="Name, Ticker, Address"
            height="35px"
          />
        </Flex>
      </Header>
      <Tabs>
        <Tab active>All</Tab>
        <Tab>Promo</Tab>
        <Tab>My fund</Tab>
        <Tab>Investing</Tab>
      </Tabs>
      <Body>
        {notifications.map((notification) => (
          <Card
            key={notification.date}
            date={notification.date}
            title={notification.title}
            description={notification.description}
            owner={notification.owner}
          />
        ))}
      </Body>
    </Container>
  )
}

export default Notifications
