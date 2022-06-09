import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react"
import { useSelector } from "react-redux"
import { useWeb3React } from "@web3-react/core"

import { isTxMined } from "utils"
import { UserRegistry } from "abi"
import useContract from "hooks/useContract"
import { useTransactionAdder } from "state/transactions/hooks"
import { selectUserRegistryAddress } from "state/contracts/selectors"

interface IResponce {
  privacyPolicyAgreed: boolean
  showPrivacyAgreement: boolean
  setShowPrivacyAgreement: Dispatch<SetStateAction<boolean>>
  agreePrivacyPolicy: (cb?: () => void) => any
}

export default function usePrivacyPolicyAgreed(): IResponce {
  const { account } = useWeb3React()

  const addTransaction = useTransactionAdder()

  const [privacyPolicyAgreed, setPrivacyPolicyAgreed] = useState<boolean>(false)
  const [privacySignatureHash, setPrivacySignatureHash] = useState<
    string | null
  >(null)
  const [showPrivacyAgreement, setShowPrivacyAgreement] = useState(false)

  const userRegistryAddress = useSelector(selectUserRegistryAddress)
  const userRegistry = useContract(userRegistryAddress, UserRegistry)

  const agreePrivacyPolicy = async (cb?: () => any) => {
    if (!userRegistry || !privacySignatureHash) return

    setPrivacyPolicyAgreed(true)
    const tx = await userRegistry.agreeToPrivacyPolicy(privacySignatureHash)
    const receipt = await addTransaction(tx, {
      type: "AGREE_TO_PRIVACY_POLICY",
    })

    if (isTxMined(receipt)) {
      cb && cb()
    }
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

  return {
    privacyPolicyAgreed,
    showPrivacyAgreement,
    setShowPrivacyAgreement,
    agreePrivacyPolicy,
  }
}

// TODO: refactor this to return one function instead of multiple
export function usePrivacyPolicyAdder() {
  const addTransaction = useTransactionAdder()

  const userRegistryAddress = useSelector(selectUserRegistryAddress)
  const userRegistry = useContract(userRegistryAddress, UserRegistry)

  const [signedHash, setSignedHash] = useState<string | null>(null)

  const signPrivacyPolicy = useCallback(async (data1, data2) => {
    //TODO: Sign some data in hash by wallet
    const hash = "0x" + data1 + data2

    setSignedHash(hash)
  }, [])

  const setPrivacyPolicyDocumentHash = useCallback(async () => {
    if (signedHash && userRegistry) {
      const tx = userRegistry?.setPrivacyPolicyDocumentHash(signedHash)

      addTransaction(tx, {
        type: "SET_PRIVACY_POLICY_HASH",
      })
    }
  }, [addTransaction, signedHash, userRegistry])

  return [signPrivacyPolicy, setPrivacyPolicyDocumentHash]
}
