import { Flex, To } from "theme"
import AreaChart from "components/AreaChart"
import BarChart from "components/BarChart"
import Avatar from "components/Avatar"
import TokenIcon from "components/TokenIcon"

import { Pool } from "constants/interfaces_v2"
import {
  MemberCard,
  MemberBase,
  AvatarContainer,
  Rank,
  FloatingText,
  Copiers,
  TextBig,
  TextSmall,
  Row,
  Button,
  BarChartWrapper,
  DetailedChart,
  Fee,
  ButtonGroup,
  PnlGroup,
  MiddleContent,
  FundsLimitGroup,
  PoolInfo,
  FundContainer,
} from "./styled"

interface Props {
  data: Pool
}

const Member: React.FC<Props> = ({ data }) => {
  const {} = data

  return (
    <MemberCard>
      <Flex full dir="column" ai="flex-start">
        <MemberBase>
          <FloatingText>
            {`Irvin Smith`}
            <Copiers>12</Copiers> copiers
          </FloatingText>

          <Row minW={235}>
            <AvatarContainer>
              <Avatar size={64} />
              <Rank>4</Rank>
            </AvatarContainer>

            <PoolInfo>
              <Flex ai="center">
                <TextBig>ISDX</TextBig>
                <FundContainer>
                  <TokenIcon
                    src={`https://tokens.1inch.exchange/0x....png`}
                    size={15}
                  />
                </FundContainer>
              </Flex>
              <TextSmall>
                {12.22} {"USDT"}
              </TextSmall>
              <TextSmall color="#999999">% & White List</TextSmall>
            </PoolInfo>
          </Row>

          <MiddleContent full p="0 20px">
            <PnlGroup>
              <TextBig align="center">{103.23}%</TextBig>
              <TextSmall align="center">P&L</TextSmall>
            </PnlGroup>

            <FundsLimitGroup>
              <TextSmall align="center">{0} LP/∞ LP</TextSmall>
              <TextBig align="center">0 USDT/ 0 USDT</TextBig>
              <TextSmall color="#999999" align="center">
                Traders funds/Total funds
              </TextSmall>
            </FundsLimitGroup>

            <BarChartWrapper>
              <BarChart
                pnlList={[12, 14, 17, 18, 19, 29, 12, 14, 17, 18, 19, 29]}
              />
            </BarChartWrapper>

            <DetailedChart>
              <AreaChart tooltipSize="sm" width={219} height={63} data={[]} />
            </DetailedChart>

            <Fee>
              <TextBig color="#999999" align="center">
                33%
              </TextBig>
              <TextSmall color="#999999" align="center">
                Fee
              </TextSmall>
            </Fee>
          </MiddleContent>

          <ButtonGroup>
            <To to={`/pool/0x.../invest`}>
              <Button>Invest</Button>
            </To>
            <Button secondary>Details</Button>
          </ButtonGroup>
        </MemberBase>
      </Flex>
    </MemberCard>
  )
}

export default Member
