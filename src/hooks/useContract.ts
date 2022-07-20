import { useMemo, useEffect, useState, useCallback } from "react"
import { Contract } from "@ethersproject/contracts"
import {
  ERC20,
  TraderPool,
  TraderPoolRiskyProposal,
  BasicTraderPool,
  PriceFeed,
  TraderPoolRegistry,
  TraderPoolInvestProposal,
} from "abi"
import { getContract } from "utils/getContract"
import { useActiveWeb3React } from "hooks"
import { BigNumber } from "@ethersproject/bignumber"
import { ITokenBase } from "constants/interfaces"
import { isAddress } from "utils"
import { ethers } from "ethers"
import { useSelector } from "react-redux"
import {
  selectPriceFeedAddress,
  selectTraderPoolRegistryAddress,
} from "state/contracts/selectors"

const provider = new ethers.providers.JsonRpcProvider(
  "https://data-seed-prebsc-1-s1.binance.org:8545/"
)

export default function useContract(
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true
): Contract | null {
  const { library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !ABI || !isAddress(address)) return null

    try {
      return getContract(
        address,
        ABI,
        library || provider,
        withSignerIfPossible && account ? account : undefined
      )
    } catch (error) {
      console.error("Failed to get contract", error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export function useERC20(
  address: string | undefined
): [
  Contract | null,
  { address: string; name: string; symbol: string; decimals: number } | null,
  BigNumber,
  () => void
] {
  const { account, library } = useActiveWeb3React()

  const [storedAddress, setAddress] = useState("")
  const [tokenData, setTokenData] = useState<ITokenBase | null>(null)
  const [balance, setBalance] = useState<BigNumber>(BigNumber.from(0))

  const contract = useContract(storedAddress, ERC20)

  const init = useCallback(() => {
    if (!contract || !library || !storedAddress) return
    ;(async () => {
      try {
        const symbol = await contract.symbol()
        const decimals = await contract.decimals()
        const name = await contract.name()

        setTokenData({
          address: storedAddress,
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
        const isMainAsset =
          storedAddress.toLocaleLowerCase() ===
          "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"

        const balance = await (isMainAsset
          ? library.getBalance(account)
          : contract.balanceOf(account))

        setBalance(balance)
      } catch (e) {
        // console.log(e, e.message)
      }
    })()
  }, [account, storedAddress, contract, library])

  // check address and save
  useEffect(() => {
    if (!address) return

    if (address === storedAddress) return

    try {
      isAddress(address)
      setAddress(address)
    } catch (e) {}

    setTokenData(null)
    setBalance(BigNumber.from(0))
  }, [address, storedAddress])

  useEffect(() => {
    init()
  }, [contract, account, storedAddress, library, init])

  return [contract, tokenData, balance, init]
}

export function useTraderPoolContract(
  poolAddress: string | undefined
): Contract | null {
  return useContract(poolAddress, TraderPool)
}

export function useBasicPoolContract(
  poolAddress: string | undefined
): Contract | null {
  return useContract(poolAddress, BasicTraderPool)
}

export function usePriceFeedContract(): Contract | null {
  const priceFeedAddress = useSelector(selectPriceFeedAddress)

  return useContract(priceFeedAddress, PriceFeed)
}

export function useTraderPoolRegistryContract(): Contract | null {
  const traderPoolRegistryAddress = useSelector(selectTraderPoolRegistryAddress)

  return useContract(traderPoolRegistryAddress, TraderPoolRegistry)
}

export function useProposalAddress(poolAddress) {
  const [proposalAddress, setProposalAddress] = useState("")

  const traderPool = useTraderPoolContract(poolAddress)

  useEffect(() => {
    if (!traderPool) return
    ;(async () => {
      const proposalAddress = await traderPool.proposalPoolAddress()
      setProposalAddress(proposalAddress)
    })()
  }, [traderPool])

  return proposalAddress
}

export function useRiskyProposalContract(
  poolAddress: string | undefined
): [Contract | null, string] {
  const [riskyProposalAddress, setRiskyProposalAddress] = useState("")

  const traderPool = useTraderPoolContract(poolAddress)
  const proposalPool = useContract(
    riskyProposalAddress,
    TraderPoolRiskyProposal
  )

  useEffect(() => {
    if (!traderPool) return
    ;(async () => {
      const proposalAddress = await traderPool.proposalPoolAddress()
      setRiskyProposalAddress(proposalAddress)
    })()
  }, [traderPool])

  return [proposalPool, riskyProposalAddress]
}

export function useInvestProposalContract(
  poolAddress: string | undefined
): [Contract | null, string] {
  const proposalAddress = useProposalAddress(poolAddress)

  const proposalPool = useContract(proposalAddress, TraderPoolInvestProposal)

  return [proposalPool, proposalAddress]
}
