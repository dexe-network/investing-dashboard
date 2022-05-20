import { useActiveToasts } from "state/application/hooks"

import { ToastsContainer, ToastsInner } from "./styled"
import Toast from "./Toast"

const ToastContainer: React.FC = () => {
  const activeToasts = useActiveToasts()

  return (
    <ToastsContainer height={activeToasts?.length > 0 ? "fit-content" : 0}>
      <ToastsInner>
        {activeToasts
          .slice(0)
          .reverse()
          .map((item) => (
            <Toast
              key={item.key}
              toastkey={item.key}
              content={item.content}
              removeAfterMs={item.removeAfterMs}
            />
          ))}
      </ToastsInner>
    </ToastsContainer>
  )
}

export default ToastContainer
