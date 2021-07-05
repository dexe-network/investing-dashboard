import { useMemo, useEffect, useState } from "react"
import { Contract } from "@ethersproject/contracts"
import {
  TraderPoolFactoryUpgradeable,
  PoolUpgradeable,
  IUniswapV2Router02,
  PancakeExchangeTool,
  ERC20,
  TraderPoolUpgradeable,
  IPoolLiquidityToken,
  PoolLiquidityTokenUpgradeable,
} from "abi"
import { getContract } from "utils/getContract"
import { useActiveWeb3React } from "hooks"
import { BigNumber } from "@ethersproject/bignumber"
import { ITokenBase } from "constants/interfaces"

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

export function useERC20(
  address: string
): [Contract | null, ITokenBase | null] {
  const [tokenData, setTokenData] = useState<ITokenBase | null>(null)
  const contract = useContract(address, ERC20)
  const { account } = useActiveWeb3React()

  useEffect(() => {
    if (!contract) return

    const getTokenData = async () => {
      try {
        const balance = await contract.balanceOf(account)
        const symbol = await contract.symbol()
        const decimals = await contract.decimals()
        const name = await contract.name()

        setTokenData({
          address,
          name,
          balance,
          symbol,
          decimals,
        })
      } catch (e) {
        console.log(e)
      }
    }

    getTokenData()
  }, [contract, account, address])

  return [contract, tokenData]
}

export function usePoolUpgradeable(address: string): Contract | null {
  return useContract(address, PoolUpgradeable)
}

export function useTraderPoolUpgradeable(address: string): Contract | null {
  return useContract(address, TraderPoolUpgradeable)
}

export function useIPoolLiquidityToken(address: string): Contract | null {
  return useContract(address, IPoolLiquidityToken)
}

export function usePoolLiquidityToken(address: string): Contract | null {
  return useContract(address, PoolLiquidityTokenUpgradeable)
}
