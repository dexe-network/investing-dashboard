import { useState, useEffect } from "react"

import IconSearch from "components/IconSearch"
import { useSelector } from "react-redux"

import { usePoolsFilters } from "state/pools/hooks"
import Popover from "components/Popover"
import NavTabs from "components/NavTabs"
import RadioButton from "components/RadioButton"

import more from "assets/icons/more-menu.svg"
import filtersIcon from "assets/icons/filters.svg"

import {
  StyledBar,
  SearchOverlay,
  ClickableArea,
  TabsMenu,
  Tabs,
  Tab,
  Icons,
  IconButton,
  Title,
  TitleMenu,
  tabsVariants,
  overlayVariants,
  FormLabel,
  FilterContainer,
  FilterSelectableItem,
  FiltersBody,
} from "./styled"
import { AppState } from "state"
import Header from "components/Header"

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

const TopMembersBar: React.FC = () => {
  const [filters, dispatchFilter] = usePoolsFilters()

  const [isSearchActive, setSearchActive] = useState(false)
  const [isFiltersActive, setFiltersActive] = useState(false)
  const [selectedFilter, setFilterState] = useState("")

  const totalBasicPools = useSelector<
    AppState,
    AppState["pools"]["pagination"]["basic"]["total"]
  >((state) => state.pools.pagination.basic.total)
  const totalInvestPools = useSelector<
    AppState,
    AppState["pools"]["pagination"]["invest"]["total"]
  >((state) => state.pools.pagination.invest.total)

  const handleSearchClick = () => !isSearchActive && setSearchActive(true)
  const handleFiltersClick = () => !isFiltersActive && setFiltersActive(true)

  const tabs = [
    {
      title: `Basic pools (${totalBasicPools})`,
      source: "basic",
      amount: 1,
    },
    {
      title: `Investment pools (${totalInvestPools})`,
      source: "invest",
      amount: 1,
    },
  ]

  const Left = () => (
    <Icons>
      <ClickableArea onClick={handleFiltersClick}>
        <IconButton src={filtersIcon} />
      </ClickableArea>
    </Icons>
  )

  const Right = () => (
    <Icons>
      <IconSearch
        q={filters.query}
        onChange={(q) => dispatchFilter("query", q)}
        onClick={handleSearchClick}
        active={isSearchActive}
        toggle={setSearchActive}
      />
      <ClickableArea onClick={() => {}}>
        <IconButton src={more} />
      </ClickableArea>
    </Icons>
  )

  // *hint.
  // in older versions listType was "all" || "risk" value,
  // but now it's deprecated.
  // so that side effect will make sure that
  // app not crashed
  useEffect(() => {
    if (filters.listType === "all" || filters.listType === "risk") {
      dispatchFilter("listType", "basic")
    }
  }, [filters.listType, dispatchFilter])

  return (
    <>
      <Header
        LeftComponent={Left}
        RightComponent={Right}
        tabs={tabs}
        title="Investing"
        isTitleHidden={isSearchActive}
      />

      <SearchOverlay
        initial="hidden"
        animate={!isSearchActive ? "hidden" : "visible"}
        variants={overlayVariants}
      />

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
