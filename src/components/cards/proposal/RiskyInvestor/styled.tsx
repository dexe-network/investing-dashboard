import { FC, useMemo } from "react"
import styled, { css } from "styled-components"
import { motion, AnimatePresence } from "framer-motion"

import { Flex } from "theme"
import starIcon from "assets/icons/star.svg"
import starDarkIcon from "assets/icons/star-dark.svg"

const Styled = {
  Status: styled.div<{ active?: boolean }>`
    padding: 5px 6px;
    border-radius: 36px;
    white-space: nowrap;
    border: 1px solid ${(props) => (props.active ? "#9ae2cb" : "#788AB4")};
    color: ${(props) => (props.active ? "#9ae2cb" : "#788AB4")};
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 600;
    font-size: 11px;
    line-height: 13px;
  `,
  Ticker: styled.div`
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 100%;
    color: #788ab4;
  `,
  Footer: styled(Flex)`
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 10px 16px 8px;
    border-top: 1px solid #1d2635;
  `,
  FundIconContainer: styled.div`
    position: relative;
  `,
  SizeTitle: styled.div`
    font-family: "Gilroy";
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 100%;
    color: #e4f2ff;
    margin: 0 0 6px 0;
  `,
  LPSizeContainer: styled.div`
    width: 137px;
  `,
  TraderRating: styled(Flex)`
    unicode-bidi: bidi-override;
    direction: rtl;
  `,
  TraderRatingStar: styled.div`
    position: relative;
    width: 10.51px;
    height: 10.44px;
    color: #293c54;

    &::after {
      content: "\2605";
      position: absolute;
      color: #9ae2cb;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: inherit;
      height: inherit;
      z-index: 1000;
    }
  `,
}

export default Styled

const LineBase = css`
  height: 2px;
  border-radius: 7px;
`

const LPSizeStyled = {
  Container: styled(Flex)`
    width: 100%;
    height: 2px;
    position: relative;
    background: #293c54;
    border-radius: 7px;
  `,
  LineWrapper: styled.div`
    width: 33.33%;
    &:nth-child(2) {
      margin: 0 1px;
    }
  `,
  First: styled(motion.div)`
    ${LineBase}
    background: linear-gradient(90deg, #77ffd4 0%, #ffa51f 100%);
  `,
  Second: styled(motion.div)`
    ${LineBase}
    background: linear-gradient(90deg, #fda723 0%, #f14b4b 100%, #ff9052 100%);
  `,
  Third: styled(motion.div)`
    ${LineBase}
    background: linear-gradient(90deg, #ff514f 0%, #fe0404 100%);
  `,
}

function calcPercentage(f, v) {
  return (v * 100) / f
}

export const TraderLPSize: FC<{ size: number }> = ({ size }) => {
  const MAX = {
    first: 33,
    second: 66,
    third: 100,
  }
  const firstSize = useMemo(() => {
    if (size >= MAX.first) {
      return 100
    }

    return calcPercentage(33, size)
  }, [MAX.first, size])

  const secondSize = useMemo(() => {
    if (size >= MAX.second) {
      return 100
    } else if (size >= MAX.first) {
      const val = size - MAX.first
      return calcPercentage(33, val)
    }

    return 0
  }, [MAX.first, MAX.second, size])

  const thirdSize = useMemo(() => {
    if (size >= MAX.third) {
      return 100
    } else if (size >= MAX.second) {
      const val = size - MAX.second
      return calcPercentage(34, val)
    }

    return 0
  }, [MAX.second, MAX.third, size])

  return (
    <LPSizeStyled.Container>
      <LPSizeStyled.LineWrapper>
        <AnimatePresence>
          {size > 0 && (
            <LPSizeStyled.First
              initial={{ width: 0 }}
              animate={
                size > 0 ? { width: firstSize.toString() + "%" } : { width: 0 }
              }
              transition={{ delay: size > 0 ? 0 : 0.3, duration: 0.15 }}
            />
          )}
        </AnimatePresence>
      </LPSizeStyled.LineWrapper>
      <LPSizeStyled.LineWrapper>
        <AnimatePresence>
          {size > 33 && (
            <LPSizeStyled.Second
              initial={{ width: 0 }}
              animate={
                size > 33
                  ? { width: secondSize.toString() + "%" }
                  : { width: 0 }
              }
              transition={{ delay: size > 33 ? 0.15 : 0.15, duration: 0.15 }}
            />
          )}
        </AnimatePresence>
      </LPSizeStyled.LineWrapper>
      <LPSizeStyled.LineWrapper>
        <AnimatePresence>
          {size > 66 && (
            <LPSizeStyled.Third
              initial={{ width: 0 }}
              animate={
                size > 66 ? { width: thirdSize.toString() + "%" } : { width: 0 }
              }
              transition={{ delay: size > 33 ? 0.3 : 0, duration: 0.15 }}
            />
          )}
        </AnimatePresence>
      </LPSizeStyled.LineWrapper>
    </LPSizeStyled.Container>
  )
}

const TraderRatingStyled = {
  Container: styled(Flex)`
    unicode-bidi: bidi-override;
    margin: 0 9px 0 4px;
  `,
  Star: styled.img`
    position: relative;
    width: 10.51px;
    height: 10.44px;

    &:not(:last-child) {
      margin-right: 2.5px;
    }
  `,
}

export const TraderRating = ({ rating }: { rating: number }) => {
  return (
    <TraderRatingStyled.Container>
      <TraderRatingStyled.Star src={starIcon} />
      <TraderRatingStyled.Star src={starIcon} />
      <TraderRatingStyled.Star src={starIcon} />
      <TraderRatingStyled.Star src={starDarkIcon} />
      <TraderRatingStyled.Star src={starDarkIcon} />
    </TraderRatingStyled.Container>
  )
}
