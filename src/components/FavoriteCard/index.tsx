// import React, { useState, useRef } from "react"
// import { motion } from "framer-motion"
import styled from "styled-components"
import star from "assets/icons/star.svg"

const StyledContainer = styled.div`
  border-radius: 13px;
  box-shadow: 0 3px 15px 0 rgba(0, 0, 0, 0.35);
  background: linear-gradient(
    243deg,
    rgba(41, 49, 52, 1) 0%,
    rgba(53, 52, 75, 1) 100%
  );
  padding: 3px 7px 3px 3px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 5px;
  cursor: pointer;
  user-select: none;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.07);
  }
`

const Avatar = styled.img`
  height: 19px;
  width: 19px;
  border-radius: 50px;
`

const Symbol = styled.div`
  font-size: 17px;
  height: 16px;
  font-weight: bold;
  color: #e1e1e1;
  padding: 0 7px 0;
  height: 16px;
`

const Button = styled.img`
  height: 12px;
  width: 12px;
  opacity: 0.5;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`

const FavoriteCard: React.FC = () => {
  return (
    <StyledContainer>
      <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToKeNTAGsQxsIfqvAoiupyrX3px3NQP0miNw&usqp=CAU" />
      <Symbol>ISDX</Symbol>
      <Button src={star} />
    </StyledContainer>
  )
}

export default FavoriteCard
