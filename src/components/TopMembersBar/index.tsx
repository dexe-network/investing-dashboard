import { FC, useState } from "react"
import { useLocation } from "react-router-dom"
import { createPortal } from "react-dom"
import { useSelector } from "react-redux"
import { Flex } from "theme"

import Header from "components/Header/Layout"
import { Filters, Search } from "components/Header/Components"
import NavTabs from "components/NavTabs"
import Popover from "components/Popover"
import RadioButton from "components/RadioButton"

import { ITab } from "constants/interfaces"
import { usePoolsFilters } from "state/pools/hooks"
import {
  selectTotalBasicPools,
  selectTotalInvestPools,
} from "state/pools/selectors"

import { titleVariants } from "motion/variants"

import {
  FilterContainer,
  FiltersBody,
  FilterSelectableItem,
  FormLabel,
  overlayVariants,
  SearchOverlay,
} from "./styled"

const sortFilter = [
  "Rating",
  "P&L in %",
  "P&L in currency",
  "Invested",
  "Trades",
  "Avg.trades per day",
  "Avg. position time",
  "Max Loss",
]

const overlayRoot = document.getElementById("overlay")

const TopMembersBar: FC = () => {
  const [selectedFilter, setFilterState] = useState("")
  const location = useLocation()

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
        left={<Filters onClick={handleFiltersClick} />}
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
      {overlayRoot &&
        createPortal(
          <SearchOverlay
            initial="hidden"
            animate={!isSearchActive ? "hidden" : "visible"}
            variants={overlayVariants}
          />,
          overlayRoot
        )}

      {/* Helpers */}
      <Popover
        contentHeight={650}
        title="Filters"
        isOpen={isFiltersActive}
        toggle={setFiltersActive}
      >
        <FiltersBody>
          <FormLabel>Sort by period</FormLabel>
          <NavTabs
            tabs={[
              { name: "All" },
              { name: "Day" },
              { name: "Week" },
              { name: "Month" },
              { name: "3 Month" },
              { name: "1 Year" },
            ]}
          />
          <FormLabel>Sort by traders</FormLabel>
          <FilterContainer>
            {sortFilter.map((item) => (
              <FilterSelectableItem
                active={item === selectedFilter}
                key={item}
                onClick={() => setFilterState(item)}
              >
                {item}
                <RadioButton
                  value={item}
                  selected={selectedFilter}
                  onChange={() => {}}
                />
              </FilterSelectableItem>
            ))}
          </FilterContainer>
        </FiltersBody>
      </Popover>
    </>
  )
}

export default TopMembersBar
