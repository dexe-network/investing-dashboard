// import React, { useState, useRef } from "react"
import NotificationsSlashed from "assets/menu/NotificationsSlashed"
import close from "assets/icons/close.svg"
import { NotificationsStyled, Header, Title, Body } from "./styled"
import { IconButton } from "theme"
import useNotifications from "hooks/useNotifications"

import NotificationCard from "components/NotificationCard"

interface IProps {
  isOpen: boolean
  onRequestClose: () => void
}

const Notifications: React.FC<IProps> = ({ isOpen, onRequestClose }) => {
  // const data = useNotifications()

  return (
    <NotificationsStyled
      variants={{
        visible: {
          x: 0,
          display: "flex",
        },
        hidden: {
          x: 500,
          transitionEnd: {
            display: "none",
          },
        },
      }}
      animate={isOpen ? "visible" : "hidden"}
      initial={isOpen ? "visible" : "hidden"}
    >
      <Header full p="0 21px">
        <Title>Notifications</Title>
        <IconButton>
          <NotificationsSlashed />
        </IconButton>
        <IconButton onClick={onRequestClose}>
          <img src={close} />
        </IconButton>
      </Header>
      <Body full dir="column" jc="flex-start">
        {/* {data.map((v) => (
          <NotificationCard {...v} key={v._id} />
        ))} */}
      </Body>
    </NotificationsStyled>
  )
}

export default Notifications
