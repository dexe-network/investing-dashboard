import { useState, useEffect, useMemo } from "react"
import { useParams } from "react-router-dom"
import { createClient, Provider as GraphProvider } from "urql"
import { useWeb3React } from "@web3-react/core"
import { RotateSpinner } from "react-spinners-kit"
import { format } from "date-fns"

import {
  Container,
  AvatarWrapper,
  LinkButton,
  Steps,
  Step,
  StepTitle,
  StepBody,
  BasicContainer,
  BasicItem,
  BasicTitle,
  BasicValue,
  BasicValueIcon,
  InputText,
  SwtichRow,
} from "./styled"
import { Flex } from "theme"
import Button from "components/Button"
import Avatar from "components/Avatar"
import TextArea from "components/TextArea"
import Input from "components/Input"
import AddressChips from "components/AddressChips"

import ManagersIcon from "assets/icons/Managers"
import InvestorsIcon from "assets/icons/Investors"
import EmissionIcon from "assets/icons/Emission"
import MinInvestIcon from "assets/icons/MinInvestAmount"
import link from "assets/icons/link.svg"
import info from "assets/icons/info.svg"

import { expandTimestamp, shortenAddress, formatBigNumber } from "utils"
import { parsePoolData } from "utils/ipfs"
import { useUpdateFundContext } from "context/UpdateFundContext"
import { usePool } from "state/pools/hooks"
import { useERC20 } from "hooks/useContract"

const poolsClient = createClient({
  url: process.env.REACT_APP_ALL_POOLS_API_URL || "",
})

const fundTypes = {
  BASIC_POOL: "Basic",
  INVEST_POOL: "Invest",
}

const FundDetailsEdit = () => {
  const { poolAddress } = useParams()
  const { account } = useWeb3React()

  const [, poolData, , poolInfoData] = usePool(poolAddress)
  const [, baseData] = useERC20(poolData?.baseToken)

  console.groupCollapsed("pool payload")
  console.log("poolData", poolData)
  console.log("poolInfoData", poolInfoData)
  console.groupEnd()

  const {
    loading,
    handleChange,
    setInitial,

    avatarBlobString,
    assets,

    description,
    strategy,

    totalLPEmission,
    minimalInvestment,

    managers,
    investors,
  } = useUpdateFundContext()

  const updateAwatar = useMemo(
    () => avatarBlobString.length > 0,
    [avatarBlobString]
  )
  const [isEmissionLimited, setEmission] = useState(totalLPEmission !== "")
  const [isMinimalInvest, setMinimalInvest] = useState(minimalInvestment !== "")
  const [isManagersAdded, setManagers] = useState(!!managers.length)
  const [isInvestorsAdded, setInvestors] = useState(!!investors.length)

  useEffect(() => {
    if (!poolData || !poolInfoData) return
    ;(async () => {
      const parsedIpfs = await parsePoolData(poolData.descriptionURL)

      // totalLPEmission
      // minimalInvestment

      if (!!parsedIpfs) {
        console.log("From IPFS:", parsedIpfs)
        setInitial({ ...parsedIpfs })
      }
    })()
  }, [poolData, poolInfoData, setInitial])

  const handleSubmit = async () => {
    console.log("Save changes")
    // Avatar Blob string must be array with previous avatars

    // const ipfsReceipt = await addFundMetadata(
    //   [avatarBlobString],
    //   description,
    //   strategy,
    //   account
    // )
  }

  if (loading) {
    return (
      <Container loading>
        <Flex full ai="center" jc="center">
          <RotateSpinner />
        </Flex>
      </Container>
    )
  }

  return (
    <Container>
      <AvatarWrapper>
        <Avatar
          m="0 auto"
          url={updateAwatar ? avatarBlobString : assets.at(-1)}
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
            <BasicContainer>
              <BasicItem>
                <BasicTitle>Owner</BasicTitle>
                <BasicValue>
                  {shortenAddress(account, 3)}
                  <BasicValueIcon src={link}></BasicValueIcon>
                </BasicValue>
              </BasicItem>
              <BasicItem>
                <BasicTitle>Created</BasicTitle>
                <BasicValue>
                  {format(expandTimestamp(poolData!.creationTime), "MM.dd.yy")}
                </BasicValue>
              </BasicItem>
              <BasicItem>
                <BasicTitle>Fund name</BasicTitle>
                <BasicValue>{poolData?.name}</BasicValue>
              </BasicItem>
              <BasicItem>
                <BasicTitle>Fund ticker</BasicTitle>
                <BasicValue>{poolData?.ticker}</BasicValue>
              </BasicItem>
              <BasicItem>
                <BasicTitle>Basic token</BasicTitle>
                <BasicValue>{baseData?.symbol}</BasicValue>
              </BasicItem>
              <BasicItem>
                <BasicTitle>Fund Type</BasicTitle>
                <BasicValue>
                  {fundTypes[poolData!.type]}
                  <BasicValueIcon src={info} />
                </BasicValue>
              </BasicItem>
              <BasicItem>
                <BasicTitle>Performance Fee 3 month</BasicTitle>
                <BasicValue>
                  {formatBigNumber(
                    poolInfoData?.parameters.commissionPercentage,
                    25,
                    0
                  )}
                  %
                </BasicValue>
              </BasicItem>
            </BasicContainer>
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
  )
}

export default function SwapWithProvider() {
  return (
    <GraphProvider value={poolsClient}>
      <FundDetailsEdit />
    </GraphProvider>
  )
}
