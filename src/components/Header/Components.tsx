/**
 * Components which are used in Header
 */
import { Dispatch, SetStateAction } from "react"
import { ITopMembersFilters } from "constants/interfaces"
import IconSearch from "components/IconSearch"

import { getRedirectedPoolAddress } from "utils"
import { selectLoadingState, selectOwnedPools } from "state/user/selectors"

import {
  ClickableArea,
  IconButton,
  PortraitsPlus,
  Funds,
  FundWrapper,
} from "./styled"

import filtersIcon from "assets/icons/filters.svg"
import link from "assets/icons/link.svg"
import goBack from "assets/icons/pagination-prev.svg"
import people from "assets/icons/people.svg"
import more from "assets/icons/more-menu.svg"
import { useLocation, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import IpfsIcon from "components/IpfsIcon"

interface IFiltersProps {
  onClick: () => void
}
export const Filters = ({ onClick }: IFiltersProps) => {
  return (
    <ClickableArea onClick={onClick}>
      <IconButton src={filtersIcon} />
    </ClickableArea>
  )
}

interface IProfilesProps {
  onClick?: () => void
}
export const Profiles = ({ onClick }: IProfilesProps) => {
  return (
    <ClickableArea onClick={onClick}>
      <IconButton src={people} />
    </ClickableArea>
  )
}

interface IGoBackProps {
  onClick?: () => void
}
export const GoBack = ({ onClick }: IGoBackProps) => {
  return (
    <ClickableArea onClick={onClick}>
      <IconButton src={goBack} />
    </ClickableArea>
  )
}

interface IPortaitsProps {}
export const Portaits = ({}: IPortaitsProps) => {
  // const ownedPools = useSelector(selectOwnedPools)
  // console.log(ownedPools)
  // if (ownedPools.basic.length && ownedPools.invest.length) {
  //   return (
  //     <Funds>
  //       {basicPools.slice(0, 2).map((pool) => (
  //         <FundWrapper key={pool.id}>
  //           <IpfsIcon size={24} address={pool.baseToken} />
  //         </FundWrapper>
  //       ))}
  //     </Funds>
  //   )
  // }
  return <PortraitsPlus>+</PortraitsPlus>
}

interface ILinkProps {}
export const Link = ({}: ILinkProps) => {
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
export const Search = ({
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

interface IMoreProps {}
export const More = ({}: IMoreProps) => {
  return (
    <ClickableArea onClick={() => {}}>
      <IconButton src={more} />
    </ClickableArea>
  )
}
