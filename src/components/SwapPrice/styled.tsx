import styled from "styled-components"
import { Flex, GradientBorder } from "theme"
import { motion } from "framer-motion"

export const Container = styled(GradientBorder)`
  width: 100%;
  justify-content: space-between;
  padding: 0 20px 0 14px;
  align-items: center;
  height: 46px;
  border-radius: 15px;
`

export const WhiteText = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 100%;
  letter-spacing: 0.3px;

  color: #e4f2ff;
`

export const TokenPrice = styled(WhiteText)`
  padding-right: 4px;
`

export const UsdPrice = styled(WhiteText)`
  color: #646f89;
`

export const GasPrice = styled.div`
  font-family: "Gilroy";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 11px;
  letter-spacing: 0.3px;
  padding: 0 8px 0 6px;
  transform: translateY(1px);

  color: #e4f2ff;
`

export const GasIcon = styled.img`
  width: 12.67px;
  height: 12px;
`

export const AngleIcon = styled(motion.img)`
  transform: translateY(1px);
`
