/**
 * Render Tabs
 */
import { TabsMenu } from "components/TopMembersBar/styled"
import { ITab } from "constants/interfaces"
import { useState } from "react"
import { useSelector } from "react-redux"
import { AppState } from "state"
import { usePoolsFilters } from "state/pools/hooks"
import { EHeaderTitles } from "."
import { Tabs, Tab, TabAmount } from "./styled"

interface IHeaderTabsProps {
  title: EHeaderTitles
}
const HeaderTabs = ({ title }: IHeaderTabsProps) => {
  const [filters, dispatchFilter] = usePoolsFilters()
  {
    /**
        TODO: rework next 10 lines (till useState with tabs). 
        They are not OK I think. We need to get totalBasicPools and totalInvestPools only if it's "investing" header, 
        however we can't use hooks inside functions
      */
  }
  const totalBasicPools = useSelector<
    AppState,
    AppState["pools"]["pagination"]["basic"]["total"]
  >((state) => state.pools.pagination.basic.total)
  const totalInvestPools = useSelector<
    AppState,
    AppState["pools"]["pagination"]["invest"]["total"]
  >((state) => state.pools.pagination.invest.total)
  const [tabs] = useState(
    getHeaderTabs(title, totalBasicPools, totalInvestPools)
  )
  return tabs.length > 0 ? (
    <TabsMenu>
      <Tabs>
        {tabs.map((tab: ITab) => {
          return (
            <Tab
              key={tab.title}
              active={false}
              onClick={() => dispatchFilter("listType", tab.source)}
            >
              {tab.title}

              {tab.amount > 0 && <TabAmount>{tab.amount}</TabAmount>}
            </Tab>
          )
        })}
      </Tabs>
    </TabsMenu>
  ) : null
}

/**
 * Get Tabs depending on the title
 */
const getHeaderTabs = (
  title: EHeaderTitles,
  firstPool?: number,
  secondPool?: number
) => {
  switch (title) {
    case EHeaderTitles.investing:
      return [
        {
          title: `All funds (1201)`,
          source: "invest",
          amount: 2,
        },
        {
          title: `Basic ${firstPool ? `(${firstPool})` : ""}`,
          source: "basic",
          amount: 0,
        },
        {
          title: `Investment ${secondPool ? `(${secondPool})` : ""}`,
          source: "invest",
          amount: 2,
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
