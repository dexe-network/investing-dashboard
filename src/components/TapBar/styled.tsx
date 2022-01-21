import { device, To } from "theme"
import styled from "styled-components"
import { motion } from "framer-motion"
import { useRouteMatch } from "react-router-dom"

export const MobileMenu = styled(motion.div)`
  display: none;

  @media only screen and (${device.sm}) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    user-select: none;
    grid-area: bottom;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 15px 14px 23px 14px;
    width: 100%;
    height: 70px;
    z-index: 100;
    background: #2c2f36;
    box-shadow: 0px -3px 6px rgba(0, 0, 0, 0.2);
  }
`

const MobileItem = styled(motion.div)`
  width: 55px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const MobileIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
`

const MobileLabel = styled.div<{ active: boolean }>`
  margin-top: 5px;
  margin-bottom: 10px;

  font-family: Gilroy;
  font-style: normal;
  font-family: Gilroy;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  text-align: center;
  letter-spacing: 0.16px;

  color: ${(props) => (props.active ? "#77DDC2" : "#f5f5f5")};
`

const Wrapper = styled.div`
  &:nth-child(1) {
    ${MobileIcon} {
      transform: translateY(5px);
    }
  }
  &:nth-child(3) {
    ${MobileIcon} {
      transform: translateY(5px);
    }
  }
  &:nth-child(4) {
    ${MobileIcon} {
      transform: translateY(7px);
    }
  }
`

interface Props {
  text: string
  path?: string
  onClick?: () => void
  Icon: any
}
export const NavItem: React.FC<Props> = ({
  text,
  path,
  Icon,
  onClick = () => {},
}) => {
  const match = useRouteMatch({
    path,
    exact: true,
  })

  if (!path) {
    return (
      <Wrapper>
        <MobileItem onClick={onClick}>
          <MobileIcon>
            <Icon active={!!match} />
          </MobileIcon>
          <MobileLabel active={!!match}>{text}</MobileLabel>
        </MobileItem>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <To to={path}>
        <MobileItem>
          <MobileIcon>
            <Icon active={!!match} />
          </MobileIcon>
          <MobileLabel active={!!match}>{text}</MobileLabel>
        </MobileItem>
      </To>
    </Wrapper>
  )
}

export default {}
