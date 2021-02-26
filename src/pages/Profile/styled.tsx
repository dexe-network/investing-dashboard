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

// STATISTICS

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

const Title = styled.div<{ weight?: number; full?: boolean }>`
  color: #dddddd;
  font-size: 16px;
  font-weight: ${(props) => (props.weight ? props.weight : 300)};
  width: ${(props) => (props.full ? "100%" : "fit-content")};
  padding-left: 35px;
  margin: 15px 0 10px;
  display: flex;
  cursor: pointer;
  user-select: none;
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

// HISTORY

const NoData = styled.div`
  color: #64666d;
  font-size: 16px;
  font-weight: 300;
  padding: 109px 0;
`

// NEWS

const StyledPost = styled.div<{ border?: boolean }>`
  max-width: 100%;
  padding-bottom: 15px;
  border-bottom: ${(props) => (props.border ? "1px" : "0px")} solid #707070;
`

const PostSymbol = styled.span`
  font-size: 33px;
  color: #dddddd;
  font-weight: 900;
`

const PostName = styled.span`
  font-size: 20px;
  color: #707070;
  font-weight: 300;
  margin-left: 20px;
`

const PostPrice = styled.span`
  color: #dddddd;
  font-size: 16px;
  font-weight: 800;
`

const PostPnl = styled.span<{ val: number }>`
  font-size: 16px;
  font-weight: 800;
  color: ${(props) => (props.val && props.val >= 0 ? "#7FFFD4" : "#FF7F7F")};
  margin-left: 20px;
`

const PostDescription = styled.p`
  font-size: 24px;
  font-weight: 900;
  line-height: 35px;
  color: #dddddd;
  height: 105px;
  max-height: 105px;
  padding: 0 30px 0 0;
  margin: 10px 0;
  text-overflow: ellipsis;
  overflow: hidden;
`

const PostBottomText = styled.div`
  color: #dddddd;
  font-size: 14px;
  font-weight: 300;
  border-bottom: 1px solid transparent;
  transition: 0.15s ease-in-out;
  user-select: none;
  cursor: pointer;

  &:hover {
    border-bottom: 1px solid #dddddd;
  }
`

const PostGroup = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 25px;
  grid-template-areas: ". .";
  border-bottom: 1px solid #707070;
`

const PostFooter = styled(Flex)`
  padding-top: 5px;
  margin-bottom: 5px;
`

const StyledNews = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const NewsList = styled(Wrapper)`
  height: 544px;
  overflow-y: auto;
  padding: 10px 20px 10px 0;
`

const PostMore = styled.div`
  padding: 11px 8px 7px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0);
  transition: background 0.15s ease-in-out;
  font-size: 20px;
  color: #707070;
  font-weight: 400;
  line-height: 20px;
  cursor: pointer;
  user-select: none;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`

const ButtonSymbol = styled.span`
  position: relative;
  color: #e1e1e1;
  font-size: 20px;
  font-weight: bold;
  padding-left: 15px;
  padding-right: 15px;
`

const AngleRight = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5.5px 0 5.5px 6px;
  border-color: transparent transparent transparent #ffffff;
  position: absolute;
  right: 0;
  top: 2px;
`

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
  NoData,
  StyledPost,
  PostSymbol,
  PostName,
  PostPrice,
  PostPnl,
  PostDescription,
  PostBottomText,
  PostGroup,
  PostFooter,
  StyledNews,
  PostMore,
  ButtonSymbol,
  AngleRight,
  NewsList,
}
