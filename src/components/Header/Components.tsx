/**
 * Components which are used in Header
 */
import { Dispatch, SetStateAction, useEffect, useState } from "react"
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
import useContract from "hooks/useContract"
import { TraderPoolRegistry, TraderPool } from "abi"
import { PoolInfo } from "constants/interfaces_v2"
import { useSideBarContext } from "context/SideBarContext"

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
  const navigate = useNavigate()
  const ownedPools = useSelector(selectOwnedPools)

  const [basicPoolInfo, setBasicInfo] = useState<PoolInfo | null>(null)
  const [investPoolInfo, setInvestInfo] = useState<PoolInfo | null>(null)

  const traderPoolBasic = useContract(ownedPools.basic[0] || "", TraderPool)
  const traderPoolInvest = useContract(ownedPools.invest[0] || "", TraderPool)

  const noPools = !ownedPools.basic.length && !ownedPools.invest.length

  useEffect(() => {
    if (!traderPoolBasic) return
    ;(async () => {
      const poolInfo = await traderPoolBasic?.getPoolInfo()
      setBasicInfo(poolInfo)
    })()
  }, [traderPoolBasic])

  useEffect(() => {
    if (!traderPoolInvest) return
    ;(async () => {
      const poolInfo = await traderPoolInvest?.getPoolInfo()
      setInvestInfo(poolInfo)
    })()
  }, [traderPoolInvest])

  const onClick = () => {
    if (noPools) {
      navigate("/create-fund")
    }
  }

  if (!noPools) {
    return (
      <Funds>
        {!!basicPoolInfo && (
          <FundWrapper>
            <IpfsIcon
              size={24}
              hash={basicPoolInfo?.parameters.descriptionURL}
            />
          </FundWrapper>
        )}
        {!!investPoolInfo && (
          <FundWrapper>
            <IpfsIcon
              size={24}
              hash={investPoolInfo?.parameters.descriptionURL}
            />
          </FundWrapper>
        )}
      </Funds>
    )
  }

  return <PortraitsPlus onClick={onClick}>+</PortraitsPlus>
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
