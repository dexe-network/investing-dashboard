/**
 * Renders Header
 */
import {
  FilterContainer,
  FiltersBody,
  FilterSelectableItem,
  FormLabel,
  overlayVariants,
  SearchOverlay,
} from "components/TopMembersBar/styled"
import { usePoolsFilters } from "state/pools/hooks"
import { Container, Bar, Title, titleVariants, Icons } from "./styled"
import { useState } from "react"
import NavTabs from "components/NavTabs"
import Popover from "components/Popover"
import RadioButton from "components/RadioButton"
import HeaderTabs from "./Tabs"
import {
  Filters,
  Profiles,
  Portaits,
  GoBack,
  Link,
  Search,
  More,
} from "./Components"

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

/**
 * Possible components which can be in the header
 */
enum EFields {
  goBack = "go back",
  filters = "filters",
  profiles = "profiles",
  portraits = "portraits",
  link = "link",
  search = "search",
  // more = "more", // Probably this field is not needed since every header will have it
}

/**
 * Possible titles
 */
export enum EHeaderTitles {
  investing = "Investing",
  fundPositionsTrader = "Fund Positions Traider", // used to create different tabs with the same header
  fundPositionsInvestor = "Fund Positions Investor", // used to create different tabs with the same header
  insurance = "Insurance",
  myInvestorProfile = "My Investor Profile",
  myTraderProfile = "My trader profile",
  myWallet = "My Wallet",
  myInvestment = "My Investment",
  myFund = "My fund",
  wallet = "",
}

/**
 * Get components depending on the title
 */
const getHeaderFileds = (title: EHeaderTitles) => {
  switch (title) {
    case EHeaderTitles.investing:
      return [EFields.filters, EFields.search]
    case EHeaderTitles.fundPositionsTrader:
    case EHeaderTitles.fundPositionsInvestor:
    case EHeaderTitles.myInvestment:
    case EHeaderTitles.insurance:
    case EHeaderTitles.myFund:
      return [EFields.goBack]
    case EHeaderTitles.myInvestorProfile:
      return [EFields.profiles]
    case EHeaderTitles.myTraderProfile:
      return [EFields.profiles, EFields.portraits]
    case EHeaderTitles.wallet:
      return [EFields.goBack, EFields.link]
    case EHeaderTitles.myWallet:
    default:
      return []
  }
}

/**
 *  Main component
 */

interface Props {
  title: EHeaderTitles
  isTabSectionVisible?: boolean // provide with a 'false' value if need to hide
}
const Header = ({ title, isTabSectionVisible = true }: Props) => {
  const fundName = "ISDX"
  const [fields] = useState<EFields[]>(getHeaderFileds(title))

  const [filters, dispatchFilter] = usePoolsFilters()
  const [isFiltersActive, setFiltersActive] = useState(false)
  const [isSearchActive, setSearchActive] = useState(false)
  const [selectedFilter, setFilterState] = useState("")

  const handleFiltersClick = () => !isFiltersActive && setFiltersActive(true)
  const handleSearchClick = () => !isSearchActive && setSearchActive(true)

  const getTitle = (title: EHeaderTitles) => {
    const fundTitle = "Fund Positions"
    if (
      title === EHeaderTitles.fundPositionsInvestor ||
      title === EHeaderTitles.fundPositionsTrader
    )
      return fundTitle
    if (title === EHeaderTitles.myFund) return `My ${fundName} fund`
    return title
  }

  /**
   * Left part of the header
   */
  const Left = () => (
    <Icons>
      {fields.includes(EFields.filters) && (
        <Filters onClick={handleFiltersClick} />
      )}
      {fields.includes(EFields.profiles) && <Profiles />}
      {fields.includes(EFields.goBack) && <GoBack />}
    </Icons>
  )

  /**
   * Middle part of the header
   */
  const Middle = () => (
    <Title
      initial="visible"
      animate={isSearchActive ? "hidden" : "visible"}
      variants={titleVariants}
      transition={{ duration: 0.1, ease: [0.29, 0.98, 0.29, 1] }}
    >
      {getTitle(title)}
      {fields.includes(EFields.portraits) && <Portaits />}
      {fields.includes(EFields.link) && <Link />}
    </Title>
  )

  /**
   * Right part of the header
   */
  const Right = () => (
    <Icons>
      {fields.includes(EFields.search) && (
        <Search
          onClick={handleSearchClick}
          toggle={setSearchActive}
          isSearchActive={isSearchActive}
          filters={filters}
          dispatchFilter={dispatchFilter}
        />
      )}
      <More />
    </Icons>
  )

  return (
    <>
      {/* Header */}
      <Container
        initial={{ y: -102 }}
        animate={{ y: 0 }}
        exit={{ y: -102 }}
        transition={{ duration: 0.4, ease: [0.29, 0.98, 0.29, 1] }}
      >
        <Bar>
          <Left />
          <Middle />
          <Right />
        </Bar>
        {isTabSectionVisible && <HeaderTabs title={title} />}
      </Container>
      <SearchOverlay
        initial="hidden"
        animate={!isSearchActive ? "hidden" : "visible"}
        variants={overlayVariants}
      />

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

export default Header
