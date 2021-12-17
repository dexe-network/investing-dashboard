import { useState } from "react"

import IconSearch from "components/IconSearch"

import { usePoolsFilters } from "state/pools/hooks"
import Popover from "components/Popover"
import NavTabs from "components/NavTabs"
import RadioButton from "components/RadioButton"

import filtersIcon from "assets/icons/filters.svg"

import {
  StyledBar,
  ClickableArea,
  TopMenu,
  BottomMenu,
  Tabs,
  Tab,
  Icons,
  IconButton,
  Badge,
  tabsVariants,
  FormLabel,
  FilterContainer,
  FilterSelectableItem,
  FiltersBody,
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

const TopMembersBar: React.FC = () => {
  const commonBases = ["ALL", "USDT", "BUSD", "ETH", "BNB"]
  const [filters, dispatchFilter] = usePoolsFilters()

  const [isSearchActive, setSearchActive] = useState(false)
  const [isFiltersActive, setFiltersActive] = useState(false)
  const [selectedFilter, setFilterState] = useState("")

  const handleSearchClick = () => !isSearchActive && setSearchActive(true)
  const handleFiltersClick = () => !isFiltersActive && setFiltersActive(true)

  return (
    <>
      <StyledBar
        initial={{ y: -102 }}
        animate={{ y: 0 }}
        exit={{ y: -102 }}
        transition={{ duration: 0.4, ease: [0.29, 0.98, 0.29, 1] }}
      >
        <TopMenu>
          <Tabs
            initial="visible"
            animate={isSearchActive ? "hidden" : "visible"}
            variants={tabsVariants}
            transition={{ duration: 0.1, ease: [0.29, 0.98, 0.29, 1] }}
          >
            <Tab
              active={filters.listType === "all"}
              onClick={() => dispatchFilter("listType", "all")}
            >
              All Pools
            </Tab>
            <Tab
              active={filters.listType === "risk"}
              onClick={() => dispatchFilter("listType", "risk")}
            >
              Risk Pools
            </Tab>
          </Tabs>

          <Icons>
            <ClickableArea onClick={handleSearchClick}>
              <IconSearch active={isSearchActive} toggle={setSearchActive} />
            </ClickableArea>
            <ClickableArea onClick={handleFiltersClick}>
              <IconButton src={filtersIcon} />
            </ClickableArea>
          </Icons>
        </TopMenu>
        <BottomMenu>
          {commonBases.map((symbol) => (
            <Badge active={symbol === "ALL"} key={symbol}>
              {symbol}
            </Badge>
          ))}
        </BottomMenu>
      </StyledBar>

      <Popover
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
