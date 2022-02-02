// import React, { useState, useRef } from "react"
// import { motion } from "framer-motion"

import styled from "styled-components"

const RippleContainer = styled.div<{
  width: string
}>`
  width: ${(props) => props.width};
  height: 22px;
  border-radius: 2px;
  background: linear-gradient(
    90deg,
    #171b1f 0%,
    #5a6071 30%,
    #171b1f 55%,
    #5a6071 72%,
    #171b1f 100%
  );
  background-size: 200%;
  background-position: 0% 0%;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);

  animation-duration: 3s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: ripple;
  animation-timing-function: linear;

  @keyframes ripple {
    from {
      background-position: 0% 0%;
    }
    to {
      background-position: 100% 0%;
    }
  }
`

const Ripple: React.FC<{ width: string }> = ({ width }) => {
  return <RippleContainer width={width} />
}

export default Ripple
