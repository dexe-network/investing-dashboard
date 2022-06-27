import TokenIcon from "components/TokenIcon"
import { FC } from "react"
import { SwapPathContainer, TokensUnion } from "./styled"

interface Props {
  path: string[]
}

const SwapPath: FC<Props> = ({ path }) => {
  const renderPath = (token, index) => {
    if (index === 0) {
      return <TokenIcon key={token} address={token} size={15} m="0" />
    }

    const union = (
      <TokensUnion>
        <TokenIcon
          key={`union-left-${path[index - 1]}`}
          address={path[index - 1]}
          size={15}
          m="0"
        />
        <TokenIcon
          key={`union-right-${token}`}
          address={token}
          size={15}
          m="0"
        />
      </TokensUnion>
    )

    if (index === path.length - 1) {
      return (
        <>
          {union}
          <TokenIcon key={token} address={token} size={15} m="0" />
        </>
      )
    }

    return union
  }
  return <SwapPathContainer>{path.map(renderPath)}</SwapPathContainer>
}

export default SwapPath
