import { motion } from "framer-motion"
import styled from "styled-components"
import Chart from "components/Chart"

interface Props {}

const ProfileCard = styled(motion.div)`
  background: rgb(41, 49, 52);
  background: linear-gradient(
    204deg,
    rgba(41, 49, 52, 1) -10%,
    rgba(53, 52, 75, 1) 100%
  );
  border-radius: 10px;
  max-width: 910px;
  height: 630px;
  margin: auto;
  overflow: hidden;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
`

function Profile(props: Props) {
  const {} = props

  return (
    <div>
      <ProfileCard>
        <Chart />
      </ProfileCard>
    </div>
  )
}

export default Profile
