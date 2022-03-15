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
      <StyledBar
        initial={{ y: -102 }}
        animate={{ y: 0 }}
        exit={{ y: -102 }}
        transition={{ duration: 0.4, ease: [0.29, 0.98, 0.29, 1] }}
      >
        <TitleMenu>
          <Icons>
            <ClickableArea onClick={handleFiltersClick}>
              <IconButton src={filtersIcon} />
            </ClickableArea>
          </Icons>
          <Title
            initial="visible"
            animate={isSearchActive ? "hidden" : "visible"}
            variants={tabsVariants}
            transition={{ duration: 0.1, ease: [0.29, 0.98, 0.29, 1] }}
          >
            Investing
          </Title>
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
        </TitleMenu>
        <TabsMenu>
          <Tabs>
            <Tab
              active={filters.listType === "basic"}
              onClick={() => dispatchFilter("listType", "basic")}
            >
              Basic pools ({totalBasicPools})
            </Tab>
            <Tab
              active={filters.listType === "invest"}
              onClick={() => dispatchFilter("listType", "invest")}
            >
              Investment pools ({totalInvestPools})
            </Tab>
          </Tabs>
        </TabsMenu>
      </StyledBar>

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
