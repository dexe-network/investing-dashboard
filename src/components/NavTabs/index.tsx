import { useState, useEffect } from "react"

import { TabContainer, Tab } from "./styled"

interface Props {
  tabs: { name: string }[]
}

const NavTabs: React.FC<Props> = ({ tabs }) => {
  const [activeTab, setActive] = useState<null | string>(null)

  useEffect(() => {
    if (!tabs) return

    if (activeTab === null) {
      setActive(tabs[0].name)
    }
  }, [tabs, activeTab])

  return (
    <TabContainer>
      {tabs.map((tab) => (
        <Tab
          onClick={() => setActive(tab.name)}
          active={tab.name === activeTab}
          key={tab.name}
        >
          {tab.name}
        </Tab>
      ))}
    </TabContainer>
  )
}

export default NavTabs
