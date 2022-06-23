export const opacityVariants = {
  visible: {
    opacity: 1,
    height: "fit-content",
    display: "flex",
  },
  hidden: {
    opacity: 0,
    height: 0,
    transitionEnd: {
      display: "none",
    },
  },
}

export const titleVariants = {
  visible: {
    opacity: 1,
    display: "flex",
  },
  hidden: {
    display: "none",
    opacity: 0,
  },
}

export const modalContainerVariants = {
  visible: {
    display: "flex",
    opacity: 1,
    y: 0,
  },
  hidden: {
    opacity: 0,
    y: -5,
    transitionEnd: {
      display: "none",
    },
  },
}

export const overlayVariants = {
  visible: {
    opacity: 1,
    display: "flex",
  },
  hidden: {
    opacity: 0,
    transition: { delay: 0.1 },
    transitionEnd: {
      display: "none",
    },
  },
}

export const accordionSummaryVariants = {
  visible: {
    opacity: 1,
    height: "fit-content",
    display: "block",
  },
  hidden: {
    opacity: 0,
    height: 0,
    transitionEnd: {
      display: "none",
    },
  },
}

export const rotate180Variants = {
  visible: {
    rotate: 0,
  },
  hidden: {
    rotate: 180,
    transition: { duration: 0.2 },
  },
}

export const getSlideTopVariants = (hiddenH) => ({
  visible: {
    top: 55,
    height: "100vh",
  },
  hidden: {
    top: "initial",
    height: hiddenH,
  },
})

export default {
  opacityVariants,
  titleVariants,
}
