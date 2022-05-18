import { useAlertContext, AlertType } from "context/AlertContext"

export { AlertType }

export default function useAlert() {
  const { showAlert, hideAlert } = useAlertContext()
  return [showAlert, hideAlert]
}
