import { FC, ReactNode } from "react"
import { Container, Bar, Icons, Title } from "./styled"
import { More, GoBack } from "./Components"

interface Props {
  left?: ReactNode
  right?: ReactNode
}

const Layout: FC<Props> = ({ children, left, right }) => {
  return (
    <>
      <Container
        initial={{ y: -102 }}
        animate={{ y: 0 }}
        exit={{ y: -102 }}
        transition={{ duration: 0.4, ease: [0.29, 0.98, 0.29, 1] }}
      >
        <Bar>
          <Icons>{left || <GoBack />}</Icons>
          <Title>{children}</Title>
          <Icons>
            {right}
            <More />
          </Icons>
        </Bar>
      </Container>
    </>
  )
}

export default Layout
