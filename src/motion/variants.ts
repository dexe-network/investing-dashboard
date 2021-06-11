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

export default {
  opacityVariants,
}
