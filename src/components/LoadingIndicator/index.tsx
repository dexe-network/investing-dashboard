import { GuardSpinner } from "react-spinners-kit"
import { Center } from "theme"

const LoadingIndicator: React.FC = () => {
  return (
    <Center>
      <GuardSpinner size={40} loading />
    </Center>
  )
}

export default LoadingIndicator
