import { useState, useEffect } from "react"
import { useTraderPoolFactory } from "hooks/useContract"
import { useWeb3React } from "@web3-react/core"
import { TransactionReceipt } from "@ethersproject/providers"

// let traderWallet = accounts[0];
// let basicTokenAddress = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56';//busd @ BSC
// let commissions = [toBN(10),toBN(3), toBN(10),toBN(3), toBN(10),toBN(3)];
// let createResult = await traderPoolFactory.createTraderContract(traderWallet, basicTokenAddress, toBN(0), commissions, true, false, "Trader token 1", "TRT1");

interface IProps {
  _traderWallet: string
  _basicToken: string
  _totalSupply: number
  _comm: number[]
  _actual: boolean
  _investorRestricted: boolean
  _name: string
  _symbol: string
}

const getTraderPoolAddress = (receipt: TransactionReceipt): string => {
  console.log(receipt)
  const data = receipt.logs[receipt.logs.length - 1]?.data
  const poolAddress = "0x" + data.substring(26)
  return poolAddress
}

export default function useCreateFund() {
  const [loading, setLoading] = useState(false)
  const [address, setAddress] = useState(null)
  const factory = useTraderPoolFactory()
  const { library } = useWeb3React()

  // useEffect(() => {
  //   if (!factory) {
  //     return
  //   }

  //   factory?.on("TraderContractCreated", (address) => {
  //     console.log(address)
  //     // setLoading(false)
  //   })
  // }, [factory])

  const submit = async (props: IProps) => {
    console.log(props)
    const res = await factory?.createTraderContract(
      props._traderWallet,
      props._basicToken,
      props._totalSupply,
      props._comm,
      props._actual,
      props._investorRestricted,
      props._name,
      props._symbol
    )
    console.log(res)
    const receipt = await library.getTransactionReceipt(res.hash)

    // const address = getTraderPoolAddress(receipt)
    console.log(receipt)
  }

  return [submit, loading, address] as const
}
