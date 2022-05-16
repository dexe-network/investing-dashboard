import { FC, MouseEventHandler, useMemo } from "react"
import { useWeb3React } from "@web3-react/core"
import { format } from "date-fns"
import { BigNumber } from "@ethersproject/bignumber"

import {
  BasicContainer,
  BasicItem,
  BasicTitle,
  BasicValue,
  BasicValueIcon,
  BasicValueText,
} from "./styled"
import Tooltip from "components/Tooltip"

import link from "assets/icons/link.svg"

import { expandTimestamp, shortenAddress, formatBigNumber } from "utils"
import { IPoolQuery } from "constants/interfaces_v2"

const fundTypes = {
  BASIC_POOL: "Basic",
  INVEST_POOL: "Invest",
}

const BasicSettings: FC<{
  poolData: IPoolQuery | undefined
  symbol: string | undefined
  commissionPercentage: BigNumber | undefined
}> = ({ poolData, symbol, commissionPercentage }) => {
  const { account } = useWeb3React()

  const address = useMemo(() => {
    if (!!account) {
      return shortenAddress(account, 3)
    }

    return ""
  }, [account])

  const creationTime = useMemo(() => {
    if (!!poolData) {
      return format(expandTimestamp(poolData.creationTime), "MM.dd.yy")
    }

    return ""
  }, [poolData])

  const name = useMemo(() => {
    if (!!poolData) {
      return poolData.name
    }

    return ""
  }, [poolData])

  const ticker = useMemo(() => {
    if (!!poolData) {
      return poolData.ticker
    }

    return ""
  }, [poolData])

  const fundType = useMemo(() => {
    if (!!poolData) {
      return fundTypes[poolData.type]
    }

    return ""
  }, [poolData])

  const commission = useMemo(() => {
    if (!!commissionPercentage) {
      return `${formatBigNumber(commissionPercentage, 25, 0)}%`
    }

    return ""
  }, [commissionPercentage])

  const handleTokenRedirect = (address: string) =>
    window.open(`https://bscscan.com/address/${address}`, "_blank")

  const handleTokenLinkClick: MouseEventHandler = (e) => {
    e.stopPropagation()
    handleTokenRedirect(account!)
  }

  return (
    <BasicContainer>
      <BasicItem>
        <BasicTitle>Owner</BasicTitle>
        <BasicValue>
          <BasicValueText>{address}</BasicValueText>
          <BasicValueIcon
            onClick={handleTokenLinkClick}
            src={link}
          ></BasicValueIcon>
        </BasicValue>
      </BasicItem>
      <BasicItem>
        <BasicTitle>Created</BasicTitle>
        <BasicValue>{creationTime}</BasicValue>
      </BasicItem>
      <BasicItem>
        <BasicTitle>Fund name</BasicTitle>
        <BasicValue>{name}</BasicValue>
      </BasicItem>
      <BasicItem>
        <BasicTitle>Fund ticker</BasicTitle>
        <BasicValue>{ticker}</BasicValue>
      </BasicItem>
      <BasicItem>
        <BasicTitle>Basic token</BasicTitle>
        <BasicValue>{symbol}</BasicValue>
      </BasicItem>
      <BasicItem>
        <BasicTitle>Fund Type</BasicTitle>
        <BasicValue>
          <BasicValueText>{fundType}</BasicValueText>
          <Tooltip id="fund-type-info">Lorem ipsum</Tooltip>
        </BasicValue>
      </BasicItem>
      <BasicItem>
        <BasicTitle>Performance Fee 3 month</BasicTitle>
        <BasicValue>{commission}</BasicValue>
      </BasicItem>
    </BasicContainer>
  )
}

export default BasicSettings
