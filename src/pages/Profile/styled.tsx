import styled from "styled-components"
import { Flex, ease } from "theme"
import { motion } from "framer-motion"

import { useUserProMode } from "state/user/hooks"

import arrowDown from "assets/icons/arrow-down.svg"

const rotateVariants = {
  visible: { rotate: 180 },
  hidden: { rotate: 0 },
}

const calendarVariants = {
  visible: {
    opacity: 0,
    y: -10,
    transition: { ease },
  },
  hidden: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.5, ease, duration: 1 },
  },
}

const detailedVariants = {
  visible: {
    y: -100,
    transition: {
      duration: 0.6,
      delay: 0.2,
      when: "beforeChildren",
      staggerChildren: 0.1,
      ease,
    },
  },
  hidden: {
    y: 0,
    transition: { duration: 1, ease },
  },
}

const pieVariants = {
  visible: {
    y: 30,
  },
  hidden: {
    y: -20,
  },
}

const listItemVariants = {
  visible: ([i, max]) => ({
    opacity: 1,
    display: "flex",
    transition: { delay: i * 0.01, ease },
    height: i < max ? 25 : 0,
  }),
  hidden: ([i, max]) => ({
    opacity: i < max ? 1 : 0,
    height: i < max ? 25 : 0,
    transition: { delay: i * 0.01, ease },
    transitionEnd: {
      display: i < max ? "flex" : "none",
    },
  }),
}

const overlayVariants = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
}

const Overlay = styled(motion.div)`
  background: linear-gradient(
    0deg,
    rgba(24, 29, 32, 0) 0%,
    rgba(24, 29, 32, 0.3) 25%,
    rgba(53, 52, 75, 0) 100%
  );
  /* background: linear-gradient(
    0deg,
    rgba(24, 29, 32, 0) 0%,
    rgb(52 73 94) 25%,
    rgba(53, 52, 75, 0) 100%
  ); */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
`

const Button = styled.div`
  padding: 15px 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #202020;
  border-radius: 5px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.5);
  white-space: nowrap;
  font-size: 16px;
  color: #f5f5f5;
  font-weight: 500;
  user-select: none;
  cursor: pointer;
  transition: all 0.1s ease-in-out;

  &:hover {
    color: #7fffd4;
  }
`

const AvatarPlaceholder = styled.div`
  width: 185px;
  height: 60px;
`

const Wrapper = styled(Flex)`
  max-width: 840px;
`

const ChartWrapper = styled.div`
  height: 230px;
  width: 100%;
  position: relative;
`

const Title = styled.div`
  color: #dddddd;
  font-size: 16px;
  font-weight: bold;
  width: 100%;
  padding-left: 35px;
  margin: 15px 0 10px;
  display: flex;
`

const PieWrapper = styled(motion.div)`
  height: 150px;
  width: 150px;
`

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  max-width: 424px;
  width: 100%;
  height: 60px;
`

const StatisticsIcon = styled.img`
  margin: 0 5px;
`

const Text = styled.div`
  color: #f5f5f5;
  font-size: 14px;
  font-weight: 500;
  margin: 0 5px;
`

const StatisticGroup = styled.div`
  min-width: 95px;
  font-size: 14px;
  color: #707070;
  font-style: italic;
  font-weight: 500;
  padding: 5px 0;
`

const StatisticsBody = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  max-width: 537px;
  width: 100%;
`
const StatisticsLabel = styled.div`
  color: #9b9b9d;
  font-size: 14px;
  font-weight: 300;
`
const StatisticsValue = styled(StatisticsLabel)`
  font-weight: bold;
`

const StatisticsItem = styled(Flex)`
  flex: 0 50%;
  min-width: 268px;
`

const ProStyled = styled(Flex)<{ onClick: () => void }>`
  position: relative;
  padding-left: 24px;
  color: #9a9aa5;
  font-size: 16px;
  cursor: pointer;
  user-select: none;
`

const ProIcon = styled(motion.img)`
  margin: 0 6px;
  width: 10px;
  height: 10px;
`

const StatisticsWrapper = styled.div`
  max-height: 150px;
`

const ProButton = () => {
  const [isOpen, setOpen] = useUserProMode()

  return (
    <ProStyled onClick={() => setOpen()}>
      Pro
      <ProIcon
        variants={rotateVariants}
        animate={isOpen ? "visible" : "hidden"}
        src={arrowDown}
      />
    </ProStyled>
  )
}

const DetailedStatistics = (props: {
  label: string
  data: { label: string; value: string }[]
  max?: number
}) => (
  <Flex p="5px 0 0" ai="flex-start">
    <StatisticGroup>{props.label}</StatisticGroup>
    <StatisticsBody>
      {props.data.map((s, i) => (
        <StatisticsItem
          initial="hidden"
          variants={listItemVariants}
          custom={[i, props.max]}
          full
          p="0 25px"
          key={s.label}
        >
          <StatisticsLabel>{s.label}</StatisticsLabel>
          <StatisticsValue>{s.value}</StatisticsValue>
        </StatisticsItem>
      ))}
    </StatisticsBody>
  </Flex>
)

export {
  Overlay,
  Button,
  DetailedStatistics,
  ProButton,
  AvatarPlaceholder,
  Wrapper,
  ChartWrapper,
  Title,
  PieWrapper,
  Card,
  StatisticsIcon,
  StatisticsWrapper,
  Text,
  calendarVariants,
  detailedVariants,
  pieVariants,
  overlayVariants,
}
