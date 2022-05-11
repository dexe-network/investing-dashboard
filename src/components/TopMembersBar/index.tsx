import { FC, useState } from "react"
import { useSelector } from "react-redux"
import { Flex } from "theme"
import { titleVariants } from "motion/variants"

import Header from "components/Header/Layout"
import { Filters, Search } from "components/Header/Components"
import TradersSort from "components/TradersSort"

import { ITab } from "constants/interfaces"
import { usePoolsFilters } from "state/pools/hooks"

import {
  selectTotalBasicPools,
  selectTotalInvestPools,
} from "state/pools/selectors"

const TopMembersBar: FC = () => {
  const totalBasicPools = useSelector(selectTotalBasicPools)
  const totalInvestPools = useSelector(selectTotalInvestPools)

  const [filters, dispatchFilter] = usePoolsFilters()
  const [isFiltersActive, setFiltersActive] = useState(false)
  const [isSearchActive, setSearchActive] = useState(filters.query !== "")

  const handleFiltersClick = () => !isFiltersActive && setFiltersActive(true)
  const handleSearchClick = () => !isSearchActive && setSearchActive(true)

  const tabs: ITab[] = [
    {
      title: `All funds (${totalBasicPools + totalInvestPools})`,
      source: "/",
    },
    {
      title: `Basic (${totalBasicPools})`,
      source: "/basic",
    },
    {
      title: `Investment (${totalInvestPools})`,
      source: "/invest",
    },
  ]

  return (
    <>
      <Header
        tabs={tabs}
        left={
          <Filters onClick={handleFiltersClick}>
            <TradersSort
              handleClose={() => setFiltersActive(false)}
              isOpen={isFiltersActive}
            />
          </Filters>
        }
        right={
          <Search
            onClick={handleSearchClick}
            toggle={setSearchActive}
            isSearchActive={isSearchActive}
            filters={filters}
            dispatchFilter={dispatchFilter}
          />
        }
      >
        <Flex
          initial="visible"
          animate={isSearchActive ? "hidden" : "visible"}
          variants={titleVariants}
          transition={{ duration: 0.1, ease: [0.29, 0.98, 0.29, 1] }}
        >
          Top funds
        </Flex>
      </Header>
    </>
  )
}

export default TopMembersBar
