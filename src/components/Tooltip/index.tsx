import ReactTooltip from "react-tooltip"
import TooltipIcon from "assets/icons/TooltipIcon"
import styled, { createGlobalStyle } from "styled-components"

const TooltipStyles = createGlobalStyle`
  .dark-tooltip {
    background: #1D2127!important;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25)!important;
    border-radius: 10px!important;
    padding: 22px 18px 17px 13px!important;
    display: block!important;
    min-width: 300px;
    opacity: 1!important;

    &:before {
      display: none!important;
    }
    &:after {
      display: none!important;
    }
  }
`

const TooltipArea = styled.button`
  border: none;
  outline: none;
  background: none;
`

const TooltipContent = styled.div``

interface Props {
  id: string
  children?: any
}

const Tooltip: React.FC<Props> = ({ id, children }) => {
  return (
    <>
      <TooltipStyles />
      <TooltipArea data-tip data-for={id}>
        <TooltipIcon />
      </TooltipArea>

      <ReactTooltip className="dark-tooltip" id={id}>
        <TooltipContent>{children}</TooltipContent>
      </ReactTooltip>
    </>
  )
}

export default Tooltip
