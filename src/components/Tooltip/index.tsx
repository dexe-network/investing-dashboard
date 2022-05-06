import ReactTooltip from "react-tooltip"
import TooltipIcon from "assets/icons/TooltipIcon"
import styled, { createGlobalStyle } from "styled-components"
import TooltipSmall from "assets/icons/TooltipSmall"

const TooltipStyles = createGlobalStyle`
  button {
    padding: 0;
  }

  .dark-tooltip {
    background: #181E2C!important;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08)!important;
    border-radius: 10px!important;
    border: 1px solid #223047!important;
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
  size?: "normal" | "small"
}

const Tooltip: React.FC<Props> = ({ id, children, size = "normal" }) => {
  return (
    <>
      <TooltipStyles />
      <TooltipArea data-tip data-for={id}>
        {size === "normal" ? <TooltipIcon /> : <TooltipSmall />}
      </TooltipArea>

      <ReactTooltip className="dark-tooltip" id={id}>
        <TooltipContent>{children}</TooltipContent>
      </ReactTooltip>
    </>
  )
}

export default Tooltip
