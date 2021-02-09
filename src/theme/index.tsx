import { Link } from "react-router-dom"
import styled from "styled-components"

export default {
  textPrimary: "#FAFAFA",
}

export const To = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.textPrimary};
`

const ExternalLink = styled.a`
  text-decoration: none;
  color: ${(props) => props.theme.textPrimary};
`

export const External: React.FC<{
  href: string
  children: React.ReactChild
}> = ({ href, children }) => (
  <ExternalLink href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </ExternalLink>
)
