import { createPortal } from "react-dom"

import { useActiveToasts } from "state/application/hooks"

import { ToastsContainer, ToastsInner } from "./styled"
import Toast from "./Toast"

const toastRoot = document.getElementById("toast")

const ToastContainer: React.FC = () => {
  const activeToasts = useActiveToasts()

  if (!toastRoot) return null
  return createPortal(
    <>
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
                visible={item.visible}
              />
            ))}
        </ToastsInner>
      </ToastsContainer>
    </>,
    toastRoot
  )
}

export default ToastContainer
