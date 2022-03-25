import React from "react"
import {
  Container,
  Body,
  Header,
  HeaderContent,
  MainTitle,
  Line,
  Steps,
  Step,
  FundTypeCards,
} from "./styled"
import Avatar from "components/Avatar"
import HeaderStep from "./Header"
import { useCreateFundContext } from "context/CreateFundContext"
import Close from "assets/icons/close-gray.svg"
import Menu from "assets/icons/menu-dots.svg"
import FundTypeCard from "./FundTypeCard"

const CreateFund: React.FC = () => {
  const { handleChange, fundType } = useCreateFundContext()
  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={Close} alt="close" />
          <MainTitle>Create Fund</MainTitle>
          <img src={Menu} alt="menu-dots" />
        </HeaderContent>
        <Line></Line>
      </Header>
      <Body>
        <Avatar
          top="-35px"
          m="0 auto"
          onCrop={handleChange}
          showUploader
          size={85}
        />
        <Steps>
          <Step>
            <HeaderStep
              title="Basic settings"
              description="This settings can not be changed afrer creation"
              index="1"
            />
          </Step>
          <Step>
            <HeaderStep
              title="Type of fund"
              description="This settings can not be changed afrer creation"
              index="2"
            />
            <FundTypeCards>
              <FundTypeCard
                name="basic"
                selected={fundType}
                label="Standard - Low risk"
                description="Trading on assets from the white list
                + non-whitelisted assets through the proposals..."
                link="Read More"
                handleSelect={(value: any) => handleChange("fundType", value)}
              />
              <FundTypeCard
                name="investment"
                selected={fundType}
                label="Investment - High risk "
                description="Manage the assets on your own..
                Manage the assets on your own..."
                link="Read More"
                handleSelect={(value: any) => handleChange("fundType", value)}
              />
            </FundTypeCards>
          </Step>
          <Step>
            <HeaderStep
              title="Investment"
              description="This settings can be changed in account ater"
              index="3"
            />
          </Step>
          <Step>
            <HeaderStep
              title="Fund Details"
              description="This settings can be changed in account ater"
              index="4"
            />
          </Step>
          <Step>
            <HeaderStep
              title="Management Fee"
              description="This settings can not be changed afrer creation"
              index="5"
            />
          </Step>
        </Steps>
      </Body>
    </Container>
  )
}

export default CreateFund
