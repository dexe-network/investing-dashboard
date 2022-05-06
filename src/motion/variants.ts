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

export default {
  opacityVariants,
  titleVariants,
}
