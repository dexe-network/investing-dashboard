import { FC, useState } from "react"

import { Container, Tab } from "./styled"

interface ITab {
  name: string
  child: any
}

interface IProps {
  tabs: Array<ITab>
}

const TabsLight: FC<IProps> = ({ tabs }) => {
  const [activeTab, setTab] = useState(0)

  return (
    <>
      <Container>
        {tabs.map(({ name }, index) => {
          return (
            <Tab
              onClick={() => setTab(index)}
              active={activeTab === index}
              key={name}
            >
              {name}
            </Tab>
          )
        })}
      </Container>
      {tabs[activeTab].child}
    </>
  )
}

export default TabsLight
