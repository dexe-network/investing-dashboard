import { useState } from "react"
import Header, { EHeaderTitles } from "components/Header"
import {
  Container,
  TransparentBg,
  MyFundContainer,
  AvatarContainer,
  ContentContainer,
  BasicSettingsContainer,
  SettingItemsContainer,
  Image,
} from "./styled"
import SettingItem from "./SettingItem"
import link from "assets/icons/link.svg"
import info from "assets/icons/info.svg"
import Avatar from "components/Avatar"
import Switch from "components/Switch"
import { Flex } from "theme"
import DescriptionComponent from "./DescriptionComponent"

const MyFund = () => {
  const basicSettingsData = [
    {
      field: "Owner",
      value: "0x0121239123812381",
      icon: link,
    },
    {
      field: "Created",
      value: "12.12.22",
      icon: null,
    },
    {
      field: "Fund name",
      value: "CRYPTOSUNRISE111",
      icon: null,
    },
    {
      field: "Fund ticker",
      value: "PTHPNH",
      icon: null,
    },
    {
      field: "Basic token",
      value: "DEXE",
      icon: null,
    },
    {
      field: "Fund Type",
      value: "Standart",
      icon: null,
    },
    {
      field: "Performance Fee 3 month",
      value: "30%",
      icon: null,
    },
  ]

  const [isActive, setActive] = useState()

  return (
    <MyFundContainer>
      {/* Delete background */}
      <TransparentBg>
        <Header title={EHeaderTitles.myFund} />
      </TransparentBg>
      <Container
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <ContentContainer ai="center" dir="column">
          <AvatarContainer dir="column" ai="center" className="asdf">
            <Avatar size={110} />
            {/* TODO: Add onClick */}
            <p>Change fund photo</p>
          </AvatarContainer>
          <BasicSettingsContainer dir="column" ai="flex-start">
            <h2>Basic settings</h2>
            <SettingItemsContainer dir="column">
              {basicSettingsData.map((item) => {
                const Right = function Right() {
                  switch (item.field) {
                    case "Owner":
                      return (
                        <Flex ai="center" onClick={() => alert("Todo")}>
                          <p>
                            {item.value.slice(0, 4) +
                              "..." +
                              item.value.slice(item.value.length - 5)}
                          </p>
                          <Image src={link}></Image>
                        </Flex>
                      )
                    case "Fund Type":
                      return (
                        <Flex ai="center" onClick={() => alert("Todo")}>
                          <p>{item.value}</p>
                          <Image src={info}></Image>
                        </Flex>
                      )
                    default:
                      return <p>{item.value}</p>
                  }
                }
                return (
                  <SettingItem
                    key={item.field}
                    title={item.field}
                    Right={Right()}
                  />
                )
              })}
            </SettingItemsContainer>
          </BasicSettingsContainer>
          <DescriptionComponent title="Fund description" />
          <DescriptionComponent title="Fund strategy" />
          <Switch name="Limited Emission" isOn={true} onChange={() => {}} />
        </ContentContainer>
      </Container>
    </MyFundContainer>
  )
}

export default MyFund
