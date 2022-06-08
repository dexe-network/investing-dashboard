import { FC, useMemo } from "react"
import { format } from "date-fns"
import { BigNumber } from "@ethersproject/bignumber"

import {
  BasicContainer,
  BasicItem,
  BasicTitle,
  BasicValue,
  BasicValueText,
} from "./styled"
import Tooltip from "components/Tooltip"
import ExternalLink from "components/ExternalLink"

import { useActiveWeb3React } from "hooks"
import { expandTimestamp, shortenAddress, formatBigNumber } from "utils"
import getExplorerLink, { ExplorerDataType } from "utils/getExplorerLink"
import { IPoolQuery } from "constants/interfaces_v2"

const fundTypes = {
  BASIC_POOL: "Basic",
  INVEST_POOL: "Invest",
}

const BasicSettings: FC<{
  poolData: IPoolQuery | undefined
  baseToken: any | undefined
  commissionPercentage: BigNumber | undefined
}> = ({ poolData, baseToken, commissionPercentage }) => {
  const { chainId, account } = useActiveWeb3React()

  const address = useMemo(() => {
    if (!!poolData) {
      return shortenAddress(poolData.trader, 3)
    }

    return ""
  }, [poolData])

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

  return (
    <BasicContainer>
      <BasicItem>
        <BasicTitle>Owner</BasicTitle>
        <BasicValue>
          {chainId && account && (
            <ExternalLink
              href={getExplorerLink(chainId, account, ExplorerDataType.ADDRESS)}
              iconColor="#0065c2"
            >
              {address}
            </ExternalLink>
          )}
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
        <BasicValue>
          {chainId && !!baseToken && (
            <ExternalLink
              href={getExplorerLink(
                chainId,
                baseToken.address,
                ExplorerDataType.TOKEN
              )}
              iconColor="#0065c2"
            >
              {baseToken.symbol}
            </ExternalLink>
          )}
        </BasicValue>
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
