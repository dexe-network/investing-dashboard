/**
 * Renders Header
 */
import { usePoolsFilters } from "state/pools/hooks"
import { Container, Bar, Title, Icons } from "./styled"
import { useState } from "react"
import HeaderTabs, { getHeaderTabs } from "./Tabs"
import { Filters, Profiles, GoBack, Link, Search, More } from "./Components"

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
  const [tabs] = useState(getHeaderTabs(title))

  const [filters, dispatchFilter] = usePoolsFilters()
  const [isFiltersActive, setFiltersActive] = useState(false)
  const [isSearchActive, setSearchActive] = useState(false)

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
    <Title>
      {getTitle(title)}
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
        {isTabSectionVisible && <HeaderTabs tabs={tabs} />}
      </Container>
    </>
  )
}

export default Header
