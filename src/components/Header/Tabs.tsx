/**
 * Render Tabs
 */
import { TabsMenu } from "components/TopMembersBar/styled"
import { ITab } from "constants/interfaces"
import { useLocation } from "react-router-dom"
import { To } from "theme"
import { EHeaderTitles } from "."
import { Tabs, Tab, TabAmount } from "./styled"

interface IHeaderTabsProps {
  tabs: ITab[]
}
const HeaderTabs = ({ tabs }: IHeaderTabsProps) => {
  const { pathname } = useLocation()

  return tabs.length > 0 ? (
    <TabsMenu>
      <Tabs>
        {tabs.map((tab: ITab) => {
          return (
            <To key={tab.title} to={tab.source}>
              <Tab active={pathname === tab.source}>{tab.title}</Tab>

              {(tab?.amount || 0) > 0 && <TabAmount>{tab.amount}</TabAmount>}
            </To>
          )
        })}
      </Tabs>
    </TabsMenu>
  ) : null
}

/**
 * Get Tabs depending on the title
 */
export const getHeaderTabs = (title: EHeaderTitles) => {
  switch (title) {
    case EHeaderTitles.investing:
      return [
        {
          title: `All funds`,
          source: "all",
        },
        {
          title: `Basic`,
          source: "basic",
        },
        {
          title: `Investment`,
          source: "invest",
        },
      ]
    case EHeaderTitles.myInvestment:
      return [
        {
          title: "Open positions",
          source: "basic",
          amount: 0,
        },
        {
          title: "Proposals",
          source: "invest",
          amount: 0,
        },
        {
          title: "Closed positions",
          source: "invest",
          amount: 0,
        },
      ]
    case EHeaderTitles.insurance:
      return [
        {
          title: "Management",
          source: "basic",
          amount: 0,
        },
        {
          title: "Proposals",
          source: "invest",
          amount: 0,
        },
        {
          title: "Voting",
          source: "invest",
          amount: 0,
        },
      ]
    case EHeaderTitles.fundPositionsTrader:
      return [
        {
          title: "Open positions",
          source: "basic",
          amount: 0,
        },
        {
          title: "Closed positions",
          source: "invest",
          amount: 0,
        },
      ]
    case EHeaderTitles.myFund:
      return [
        {
          title: "Fund details",
          source: "basic",
          amount: 0,
        },
        {
          title: "Performance Fees",
          source: "invest",
          amount: 0,
        },
      ]
    case EHeaderTitles.fundPositionsInvestor:
      return [
        {
          title: "Whitelist",
          source: "basic",
          amount: 0,
        },
        {
          title: "Risk Proposals",
          source: "invest",
          amount: 0,
        },
        {
          title: "Fund History",
          source: "invest",
          amount: 0,
        },
      ]
    default:
      return []
  }
}

export default HeaderTabs
