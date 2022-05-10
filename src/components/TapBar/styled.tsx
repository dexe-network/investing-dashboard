import { device, To } from "theme"
import styled from "styled-components"
import { motion } from "framer-motion"
import { useMatch } from "react-router-dom"

export const MobileMenu = styled(motion.div)`
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
  z-index: 100;
  background: #0e121b;
  border-radius: 8px 8px 0 0;

  height: 49px;
  padding: 15px 14px 12px 14px;

  @media all and (display-mode: standalone) {
    height: 70px;
    padding: 5px 14px 25px 14px;
  }
`

const MobileItem = styled(motion.div)`
  width: 55px;
  height: 49px;
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
  margin-bottom: 3px;

  font-family: Gilroy;
  font-style: normal;
  font-family: Gilroy;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  text-align: center;
  letter-spacing: 0.16px;

  color: ${(props) => (props.active ? "#9AE2CB" : "#616D8B")};
`

const Wrapper = styled.div`
  &:nth-child(4) {
    ${MobileIcon} {
      transform: translateY(2px);
    }
  }
`

interface Props {
  text: string
  path: string
  onClick?: () => void
  Icon: any
}
export const NavItem: React.FC<Props> = ({
  text,
  path,
  Icon,
  onClick = () => {},
}) => {
  const match = useMatch({
    path,
    end: true,
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
