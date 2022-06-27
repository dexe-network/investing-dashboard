import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react"
import { useSelector } from "react-redux"
import { useWeb3React } from "@web3-react/core"
import Web3 from "web3"

import { isTxMined } from "utils"
import { UserRegistry } from "abi"
import useContract from "hooks/useContract"
import { TransactionType } from "state/transactions/types"
import { useTransactionAdder } from "state/transactions/hooks"
import { selectUserRegistryAddress } from "state/contracts/selectors"

const web3 = new Web3()

const usePrivacyPolicySign = () => {
  const { account, library, chainId } = useWeb3React()
  const userRegistryAddress = useSelector(selectUserRegistryAddress)

  return useCallback(
    async (_hash) => {
      if (account && library) {
        const hash = await web3.utils.soliditySha3(_hash)

        const EIP712Domain = [
          { name: "name", type: "string" },
          { name: "version", type: "string" },
          { name: "chainId", type: "uint256" },
          { name: "verifyingContract", type: "address" },
          // { name: "salt", type: "bytes32" },
        ]

        const Agreement = [{ name: "documentHash", type: "bytes32" }]

        const domain = {
          name: "DEXE Investment",
          version: "1",
          chainId: chainId,
          verifyingContract: userRegistryAddress,
        }

        const message = {
          documentHash: hash,
        }

        const data = {
          primaryType: "Agreement",
          types: { EIP712Domain, Agreement },
          domain: domain,
          message: message,
        }

        console.log(library?.provider?.bnbSign)

        const signer = library.getSigner(account)

        return signer._signTypedData(domain, { Agreement }, message)
        // return signer.signMessage(JSON.stringify(message))
      }
    },
    [account, chainId, library, userRegistryAddress]
  )
}

interface IResponce {
  privacyPolicyAgreed: boolean
  showPrivacyAgreement: boolean
  setShowPrivacyAgreement: Dispatch<SetStateAction<boolean>>
  agreePrivacyPolicy: (cb?: () => void) => any
}
export default function usePrivacyPolicyAgreed(): IResponce {
  const { account } = useWeb3React()

  const addTransaction = useTransactionAdder()
  const sign = usePrivacyPolicySign()

  const [privacyPolicyAgreed, setPrivacyPolicyAgreed] = useState<boolean>(false)
  const [privacyHash, setPrivacyHash] = useState<string | null>(null)
  const [showPrivacyAgreement, setShowPrivacyAgreement] = useState(false)

  const userRegistryAddress = useSelector(selectUserRegistryAddress)
  const userRegistry = useContract(userRegistryAddress, UserRegistry)

  const agreePrivacyPolicy = async (cb?: () => any) => {
    if (!userRegistry || !privacyHash || !account) return

    try {
      const signature = await sign(privacyHash)

      console.log("result signature", signature)

      // const tx = await userRegistry.agreeToPrivacyPolicy(signature)
      // const receipt = await addTransaction(tx, {
      //   type: TransactionType.PRIVACY_POLICY_AGREE,
      // })

      // if (isTxMined(receipt)) {
      //   setPrivacyPolicyAgreed(true)
      //   cb && cb()
      // }
    } catch (error) {
      console.error(error)
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
      setPrivacyHash(userData.profileURL)
    })()
  }, [userRegistry, account])

  return {
    privacyPolicyAgreed,
    showPrivacyAgreement,
    setShowPrivacyAgreement,
    agreePrivacyPolicy,
  }
}
