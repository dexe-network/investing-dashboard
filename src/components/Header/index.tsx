import {
  StyledBar,
  TitleMenu,
  TabsMenu,
  FilterContainer,
  FiltersBody,
  FilterSelectableItem,
  FormLabel,
  overlayVariants,
  SearchOverlay,
} from "components/TopMembersBar/styled"
import { ITab, ITopMembersFilters } from "constants/interfaces"
import IconSearch from "components/IconSearch"
import filtersIcon from "assets/icons/filters.svg"
import more from "assets/icons/more-menu.svg"
import link from "assets/icons/link.svg"
import goBack from "assets/icons/pagination-prev.svg"
import people from "assets/icons/people.svg"
import { usePoolsFilters } from "state/pools/hooks"
import {
  Tabs,
  Tab,
  Title,
  titleVariants,
  TabAmount,
  Icons,
  ClickableArea,
  IconButton,
  PortraitsPlus,
} from "./styled"
import { Dispatch, SetStateAction, useState } from "react"
import NavTabs from "components/NavTabs"
import Popover from "components/Popover"
import RadioButton from "components/RadioButton"
import { useSelector } from "react-redux"
import { AppState } from "state"
interface Props {
  title: EHeaderTitles
  isTabSectionVisible?: boolean // provide with a 'false' value if need to hide
}

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

enum EFields {
  goBack = "go back",
  filters = "filters",
  profiles = "profiles",
  portraits = "portraits",
  link = "link",
  search = "search",
  // more = "more", // Probably this field is not needed since every header will have it
}

export enum EHeaderTitles {
  investing = "Investing",
  fundPositionsTrader = "Fund Positions Traider",
  fundPositionsInvestor = "Fund Positions Investor",
  insurance = "Insurance",
  myInvestorProfile = "My Investor Profile",
  myTraiderProfile = "My traider profile",
  myWallet = "My Wallet",
  myInvestment = "My Investment",
  myISDXfund = "My ISDX fund",
  wallet = "",
}

const getHeaderFileds = (title: EHeaderTitles) => {
  switch (title) {
    case EHeaderTitles.investing:
      return [EFields.filters, EFields.search]
    case EHeaderTitles.fundPositionsTrader:
    case EHeaderTitles.fundPositionsInvestor:
    case EHeaderTitles.myInvestment:
    case EHeaderTitles.insurance:
    case EHeaderTitles.myISDXfund:
      return [EFields.goBack]
    case EHeaderTitles.myInvestorProfile:
      return [EFields.profiles]
    case EHeaderTitles.myTraiderProfile:
      return [EFields.profiles, EFields.portraits]
    case EHeaderTitles.wallet:
      return [EFields.goBack, EFields.link]
    case EHeaderTitles.myWallet:
    default:
      return []
  }
}

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
              active={filters.listType === tab.source}
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
    case EHeaderTitles.myISDXfund:
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
interface IFiltersProps {
  onClick: () => void
}
const Filters = ({ onClick }: IFiltersProps) => {
  return (
    <ClickableArea onClick={onClick}>
      <IconButton src={filtersIcon} />
    </ClickableArea>
  )
}

interface IProfilesProps {}
const Profiles = ({}: IProfilesProps) => {
  return (
    <ClickableArea onClick={() => {}}>
      <IconButton src={people} />
    </ClickableArea>
  )
}

interface IGoBackProps {}
const GoBack = ({}: IGoBackProps) => {
  return (
    <ClickableArea onClick={() => {}}>
      <IconButton src={goBack} />
    </ClickableArea>
  )
}

interface IPortaitsProps {}
const Portaits = ({}: IPortaitsProps) => {
  return <PortraitsPlus>+</PortraitsPlus>
}

interface ILinkProps {}
const Link = ({}: ILinkProps) => {
  return (
    <ClickableArea onClick={() => {}}>
      <IconButton src={link} />
    </ClickableArea>
  )
}

interface ISearchProps {
  onClick: () => void
  toggle: Dispatch<SetStateAction<boolean>>
  isSearchActive: boolean
  filters: ITopMembersFilters
  dispatchFilter: (field: string, value: string) => void
}
const Search = ({
  onClick,
  toggle,
  isSearchActive,
  filters,
  dispatchFilter,
}: ISearchProps) => {
  return (
    <IconSearch
      q={filters.query}
      onChange={(q) => dispatchFilter("query", q)}
      onClick={onClick}
      active={isSearchActive}
      toggle={toggle}
    />
  )
}

const Header = ({ title, isTabSectionVisible = true }: Props) => {
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
    return title
  }

  const Left = () => (
    <Icons>
      {fields.includes(EFields.filters) && (
        <Filters onClick={handleFiltersClick} />
      )}
      {fields.includes(EFields.profiles) && <Profiles />}
      {fields.includes(EFields.goBack) && <GoBack />}
    </Icons>
  )

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
      <ClickableArea onClick={() => {}}>
        <IconButton src={more} />
      </ClickableArea>
    </Icons>
  )

  return (
    <>
      <StyledBar
        initial={{ y: -102 }}
        animate={{ y: 0 }}
        exit={{ y: -102 }}
        transition={{ duration: 0.4, ease: [0.29, 0.98, 0.29, 1] }}
      >
        <TitleMenu>
          <Left />
          <Middle />
          <Right />
        </TitleMenu>
        {isTabSectionVisible && <HeaderTabs title={title} />}
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

export default Header
