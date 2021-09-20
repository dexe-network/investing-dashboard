import { useMemo, useEffect, useState, useCallback } from "react"
import { Contract } from "@ethersproject/contracts"
import {
  TraderPoolFactoryUpgradeable,
  PoolUpgradeable,
  IUniswapV2Router02,
  UniswapExchangeTool,
  PancakeExchangeTool,
  ERC20,
  TraderPoolUpgradeable,
  IPoolLiquidityToken,
  PoolLiquidityTokenUpgradeable,
} from "abi"
import { getContract } from "utils/getContract"
import { formatBigNumber } from "utils"
import { useActiveWeb3React } from "hooks"
import { BigNumber } from "@ethersproject/bignumber"
import { ITokenBase } from "constants/interfaces"
import { ethers } from "ethers"

export default function useContract(
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true
): Contract | null {
  const { library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined
      )
    } catch (error) {
      console.error("Failed to get contract", error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export function useTraderPoolFactory(): Contract | null {
  return useContract(
    process.env.REACT_APP_TRADER_POOL_FACTORY_UPGRADEABLE,
    TraderPoolFactoryUpgradeable
  )
}

export function useUniswapExchangeTool(): Contract | null {
  return useContract(
    process.env.REACT_APP_UNISWAP_EXCHANGE_TOOL,
    IUniswapV2Router02
  )
}

export function usePancakeExchangeTool(): Contract | null {
  return useContract(
    process.env.REACT_APP_PANCAKE_EXCHANGE_TOOL,
    PancakeExchangeTool
  )
}

export function useDexeExchangeTool(): Contract | null {
  return useContract(
    process.env.REACT_APP_DEXE_EXCHANGE_TOOL,
    UniswapExchangeTool
  )
}

export function useERC20(
  address: string
): [
  Contract | null,
  { address: string; name: string; symbol: string; decimals: number } | null,
  BigNumber,
  () => void
] {
  const [tokenData, setTokenData] = useState<ITokenBase | null>(null)
  const [balance, setBalance] = useState<BigNumber>(BigNumber.from(0))
  const contract = useContract(address, ERC20)
  const { account, library } = useActiveWeb3React()
  const isETH =
    address.toLocaleLowerCase() === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"

  const init = useCallback(() => {
    // GET token info that doesn't need user address
    if (!contract || !library) return
    ;(async () => {
      try {
        const symbol = isETH ? "ETH" : await contract.symbol()
        const decimals = isETH ? 18 : await contract.decimals()
        const name = isETH ? "Ethereum" : await contract.name()

        setTokenData({
          address,
          name,
          symbol,
          decimals,
        })
      } catch (e) {
        // console.log(e, e.message)
      }
    })()

    // GET token account info
    if (typeof account !== "string" || account.length !== 42) return
    ;(async () => {
      try {
        const balance = await (isETH
          ? library.getBalance(account)
          : contract.balanceOf(account))
        setBalance(balance)
      } catch (e) {
        // console.log(e, e.message)
      }
    })()
  }, [account, address, library, contract, isETH])

  useEffect(() => {
    init()
  }, [contract, account, address, library, init])

  return [contract, tokenData, balance, init]
}

export function usePoolUpgradeable(address: string): Contract | null {
  return useContract(address, PoolUpgradeable)
}

// getTotalValueLocked() -> [bn, bn]
// tvl = [totalCap, totalSupply]
// 1) totalCap value - total capitalization, including profits and losses, denominated in BasicTokens. i.e. total amount of BasicTokens that porfolio is worhs of.
// 2) totalSupply of the TraderPool liquidity tokens (or total amount of trader tokens sold to Users).

// getUserData() -> [bn, bn, bn]
// 1) total amount of BasicTokens deposited (historical value)
// 2) average traderToken price of the investor deposit (historical value)
// 3) current amount of TraderPool liquidity tokens that User has on the balance.
// 4) max open position amount

type ITvlPool = [BigNumber, BigNumber]
type IPoolUserData = [BigNumber, BigNumber, BigNumber]
type IPoolUserDataExtended = [BigNumber, BigNumber, BigNumber, BigNumber]

export function useTraderPoolUpgradeable(
  poolAddress: string,
  ownerAddress?: string
): [Contract | null, string, ITvlPool, IPoolUserDataExtended, () => void] {
  const TraderPoolContractU = useContract(
    poolAddress,
    TraderPoolUpgradeable,
    false
  )
  const TraderPoolContract = useContract(poolAddress, TraderPoolUpgradeable)

  // STATE
  const [baseToken, setBaseToken] = useState("")
  const [tvl, setTvl] = useState<ITvlPool>([
    BigNumber.from(0),
    BigNumber.from(0),
  ])
  const [userData, setUserData] = useState<IPoolUserDataExtended>([
    BigNumber.from(0),
    BigNumber.from(0),
    BigNumber.from(0),
    BigNumber.from(0),
  ])

  const init = useCallback(async () => {
    if (!TraderPoolContract || !TraderPoolContractU) return

    try {
      const basicToken = await TraderPoolContract.basicToken()
      const tvl: ITvlPool = await TraderPoolContractU.getTotalValueLocked()
      const tvlU: ITvlPool = await TraderPoolContract.getTotalValueLocked()

      setBaseToken(basicToken)
      setTvl(tvlU)

      if (ownerAddress) {
        const data: IPoolUserData = await TraderPoolContract.getUserData(
          ownerAddress
        )
        const maxPositionAmount: BigNumber = await TraderPoolContract.getMaxPositionOpenAmount()
        setUserData([...data, maxPositionAmount])
      }

      // if (!TraderPoolContractUnsigned) return

      // const tvlU: ITvlPool = await TraderPoolContractUnsigned.getTotalValueLocked()
      console.info(
        `Cap    ✅/⛔️: ${formatBigNumber(tvl[0], 6)} / ${formatBigNumber(
          tvlU[0],
          6
        )}`
      )
      console.info(
        `Supply ✅/⛔️: ${formatBigNumber(tvl[1])} / ${formatBigNumber(
          tvlU[1]
        )}`
      )
      console.log(poolAddress)
      console.log("--------")
    } catch (err) {
      // console.error(err, err.name, err.code)
    }
  }, [TraderPoolContract, ownerAddress, TraderPoolContractU, poolAddress])

  useEffect(() => {
    init()
  }, [TraderPoolContract, init])

  return [TraderPoolContract, baseToken, tvl, userData, init]
}

export function useIPoolLiquidityToken(address: string): Contract | null {
  return useContract(address, IPoolLiquidityToken)
}

export function usePoolLiquidityToken(address: string): Contract | null {
  return useContract(address, PoolLiquidityTokenUpgradeable)
}
