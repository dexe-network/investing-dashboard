import { FC, useState, useEffect, useMemo } from "react"
import { useParams } from "react-router-dom"
import { createClient, Provider as GraphProvider } from "urql"
import { useWeb3React } from "@web3-react/core"
import { RotateSpinner } from "react-spinners-kit"
import { ethers } from "ethers"

import {
  Container,
  AvatarWrapper,
  LinkButton,
  Steps,
  Step,
  StepTitle,
  StepBody,
  InputText,
  SwtichRow,
} from "./styled"
import { Flex } from "theme"
import Button from "components/Button"
import Avatar from "components/Avatar"
import TextArea from "components/TextArea"
import Input from "components/Input"
import AddressChips from "components/AddressChips"
import Payload from "components/Payload"

import BasicSettings from "./BasicSettings"

import ManagersIcon from "assets/icons/Managers"
import InvestorsIcon from "assets/icons/Investors"
import EmissionIcon from "assets/icons/Emission"
import MinInvestIcon from "assets/icons/MinInvestAmount"

import { parsePoolData, addFundMetadata } from "utils/ipfs"
import { useUpdateFundContext } from "context/UpdateFundContext"
import { usePool } from "state/pools/hooks"
import useContract, { useERC20 } from "hooks/useContract"
import { TraderPool } from "abi"

const poolsClient = createClient({
  url: process.env.REACT_APP_ALL_POOLS_API_URL || "",
})

const FundDetailsEdit: FC = () => {
  const { poolAddress } = useParams()
  const { account } = useWeb3React()

  const [, poolData, , poolInfoData] = usePool(poolAddress)
  const [, baseData] = useERC20(poolData?.baseToken)
  const traderPool = useContract(poolData?.id, TraderPool)

  const {
    loading,
    handleChange,
    setInitial,
    setDefault,
    isIpfsDataUpdated,

    avatarBlobString,
    assets,

    description,
    strategy,

    totalLPEmission,
    minimalInvestment,

    managers,
    managersInitial,
    managersRemoved,
    managersAdded,

    investors,
    investorsInitial,
    investorsRemoved,
    investorsAdded,
  } = useUpdateFundContext()

  const avatar = useMemo(() => {
    if (avatarBlobString.length > 0) {
      return avatarBlobString
    }
    return assets.at(-1)
  }, [avatarBlobString, assets])

  const [isEmissionLimited, setEmission] = useState(false)
  const [isMinimalInvest, setMinimalInvest] = useState(false)
  const [isManagersAdded, setManagers] = useState(!!managers.length)
  const [isInvestorsAdded, setInvestors] = useState(!!investors.length)

  const [isCreating, setCreating] = useState(false)

  const handleSubmit = async () => {
    if (!traderPool || !poolData || !account) return

    setCreating(true)

    try {
      let ipfsReceipt
      if (isIpfsDataUpdated()) {
        // Avatar Blob string must be array with previous avatars
        const assetsParam = assets
        if (avatarBlobString !== "") {
          assetsParam.push(avatarBlobString)
        }
        ipfsReceipt = await addFundMetadata(
          assetsParam,
          description,
          strategy,
          account
        )
      } else {
        ipfsReceipt = poolData.descriptionURL
      }

      await traderPool.changePoolParameters(
        ipfsReceipt.path,
        Number(poolData.investorsCount) > 0,
        ethers.utils
          .parseEther(totalLPEmission !== "" ? totalLPEmission : "0")
          .toHexString(),
        ethers.utils
          .parseEther(minimalInvestment !== "" ? minimalInvestment : "0")
          .toHexString()
      )

      setCreating(false)
    } catch (e) {
      console.log(e)
      // TODO: handle error
    }
  }

  useEffect(() => {
    if (!poolData || !poolInfoData) return
    ;(async () => {
      const parsedIpfs = await parsePoolData(poolData.descriptionURL)
      const totalEmission =
        poolInfoData &&
        ethers.utils.formatEther(poolInfoData.parameters.totalLPEmission)
      const minInvestment =
        poolInfoData &&
        ethers.utils.formatEther(poolInfoData.parameters.minimalInvestment)

      if (!!parsedIpfs) {
        setInitial({
          ...parsedIpfs,
          totalLPEmission: totalEmission,
          minimalInvestment: minInvestment,
        })
      }
    })()
  }, [poolData, poolInfoData, setInitial])

  useEffect(() => {
    if (totalLPEmission !== "") {
      setEmission(true)
    }
  }, [totalLPEmission])

  useEffect(() => {
    if (minimalInvestment !== "") {
      setMinimalInvest(true)
    }
  }, [minimalInvestment])

  useEffect(() => {
    return () => {
      setDefault()
    }
  }, [])

  if (loading || !poolData || !poolInfoData) {
    return (
      <Container loading>
        <Flex full ai="center" jc="center">
          <RotateSpinner />
        </Flex>
      </Container>
    )
  }

  return (
    <>
      <Payload isOpen={isCreating} toggle={() => setCreating(false)} />
      <Container>
        <AvatarWrapper>
          <Avatar
            m="0 auto"
            url={avatar}
            onCrop={handleChange}
            showUploader
            size={100}
          >
            <LinkButton>Change fund photo</LinkButton>
          </Avatar>
        </AvatarWrapper>
        <Steps>
          <Step>
            <StepTitle>Basic settings</StepTitle>
            <StepBody>
              <BasicSettings
                poolData={poolData}
                symbol={baseData?.symbol}
                commissionPercentage={
                  poolInfoData?.parameters.commissionPercentage
                }
              />
            </StepBody>
          </Step>
          <Step>
            <StepTitle>Fund Details</StepTitle>
            <StepBody>
              <Flex full p="0">
                <TextArea
                  theme="grey"
                  defaultValue={description}
                  name="description"
                  placeholder="Fund description"
                  onChange={handleChange}
                />
              </Flex>
              <Flex full p="32px 0 0">
                <TextArea
                  theme="grey"
                  defaultValue={strategy}
                  name="strategy"
                  placeholder="Fund strategy"
                  onChange={handleChange}
                />
              </Flex>
            </StepBody>
          </Step>
          <Step>
            <StepTitle>Investment</StepTitle>
            <StepBody>
              <SwtichRow
                icon={<EmissionIcon active={isEmissionLimited} />}
                title="Limited Emission"
                isOn={isEmissionLimited}
                name="_emissionLimited"
                onChange={setEmission}
              >
                <Flex full p="12px 0">
                  <Input
                    label="LP tokens emission"
                    value={totalLPEmission}
                    onChange={(value) => handleChange("totalLPEmission", value)}
                    rightIcon={<InputText>LP</InputText>}
                  />
                </Flex>
              </SwtichRow>
              <SwtichRow
                icon={<MinInvestIcon active={isMinimalInvest} />}
                title="Minimum investment amount"
                isOn={isMinimalInvest}
                name="_minInvestRestricted"
                onChange={setMinimalInvest}
              >
                <Input
                  placeholder="---"
                  onChange={(v) => handleChange("minimalInvestment", v)}
                  label="Minimum investment amount"
                  value={minimalInvestment}
                  rightIcon={<InputText>{baseData?.symbol}</InputText>}
                />
              </SwtichRow>
              <SwtichRow
                icon={<ManagersIcon active={isManagersAdded} />}
                title="New fund managers"
                isOn={isManagersAdded}
                name="_managersRestricted"
                onChange={setManagers}
              >
                <AddressChips
                  items={managers}
                  onChange={(v) => handleChange("managers", v)}
                  limit={100}
                  label="0x..."
                />
              </SwtichRow>
              <SwtichRow
                icon={<InvestorsIcon active={isInvestorsAdded} />}
                title="Invited investors"
                isOn={isInvestorsAdded}
                name="_investorsRestricted"
                onChange={setInvestors}
              >
                <AddressChips
                  items={investors}
                  onChange={(v) => handleChange("investors", v)}
                  limit={100}
                  label="0x..."
                />
              </SwtichRow>
            </StepBody>
          </Step>
        </Steps>
        <Flex full p="0 16px 61px">
          <Button full size="large" onClick={handleSubmit}>
            Confirm changes
          </Button>
        </Flex>
      </Container>
    </>
  )
}

export default function SwapWithProvider() {
  return (
    <GraphProvider value={poolsClient}>
      <FundDetailsEdit />
    </GraphProvider>
  )
}
