import { motion } from "framer-motion"
import styled from "styled-components"
import { Flex } from "theme"

const Styled = {
  ModalText: styled.div`
    width: inherit;
    padding: 0 16px 16px;
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 150%;
    text-align: center;
    color: #e4f2ff;
  `,
  Overlay: styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background: rgba(13, 18, 28, 0.3);
    backdrop-filter: blur(2px);
  `,
  ButtonContainer: styled(Flex)`
    width: inherit;
    padding: 0 16px 16px;
  `,
}

export default Styled
