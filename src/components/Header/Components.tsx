/**
 * Components which are used in Header
 */
import { Dispatch, SetStateAction, FC } from "react"
import { ITopMembersFilters } from "constants/interfaces"
import IconSearch from "components/IconSearch"

import { ClickableArea, IconButton } from "./styled"

import filtersIcon from "assets/icons/filters.svg"
import link from "assets/icons/link.svg"
import goBack from "assets/icons/pagination-prev.svg"
import people from "assets/icons/people.svg"
import more from "assets/icons/more-menu.svg"
import { useSideBarContext } from "context/SideBarContext"
import { useNavigate } from "react-router-dom"

interface IFiltersProps {
  onClick: () => void
}
export const Filters: FC<IFiltersProps> = ({ onClick, children }) => {
  return (
    <ClickableArea onClick={onClick}>
      <IconButton src={filtersIcon} />
      {children}
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

interface IGoBackProps {}
export const GoBack = ({}: IGoBackProps) => {
  const navigate = useNavigate()

  return (
    <ClickableArea onClick={() => navigate(-1)}>
      <IconButton src={goBack} />
    </ClickableArea>
  )
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
  const { toggleSideBar } = useSideBarContext()
  return (
    <ClickableArea onClick={toggleSideBar}>
      <IconButton src={more} />
    </ClickableArea>
  )
}
