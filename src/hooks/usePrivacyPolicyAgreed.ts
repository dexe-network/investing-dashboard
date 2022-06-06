import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useWeb3React } from "@web3-react/core"
import { TransactionReceipt } from "@ethersproject/providers"

import useContract from "hooks/useContract"
import useTransactionWaiter from "hooks/useTransactionWaiter"
import { selectUserRegistryAddress } from "state/contracts/selectors"
import { UserRegistry } from "abi"

export default function usePrivacyPolicyAgreed(): [boolean, () => any] {
  const { account, library } = useWeb3React()

  const [privacyPolicyAgreed, setPrivacyPolicyAgreed] = useState<boolean>(false)
  const [privacySignatureHash, setPrivacySignatureHash] = useState<
    string | null
  >(null)

  const userRegistryAddress = useSelector(selectUserRegistryAddress)
  const userRegistry = useContract(userRegistryAddress, UserRegistry)

  const waitTx = useTransactionWaiter(library)

  const agreePrivacyPolicy = async () => {
    if (!userRegistry || !privacySignatureHash) return

    setPrivacyPolicyAgreed(true)
    const tx = await userRegistry.agreeToPrivacyPolicy(privacySignatureHash)
    const { promise } = waitTx(tx.hash)

    return promise.then((txReceipt) => {
      return txReceipt as TransactionReceipt
    })
  }

  useEffect(() => {
    if (!userRegistry || !account) return
    ;(async () => {
      const userInfos = await userRegistry.agreed(account)
      setPrivacyPolicyAgreed(userInfos)
    })()
  }, [userRegistry, account])

  useEffect(() => {
    if (!userRegistry || !account) return
    ;(async () => {
      const userData = await userRegistry.userInfos(account)
      setPrivacySignatureHash(userData.signatureHash)
    })()
  }, [userRegistry, account])

  return [privacyPolicyAgreed, agreePrivacyPolicy]
}
