import { FC, useEffect } from "react"

import useReadMore from "hooks/useReadMore"

import S from "./styled"

interface IProps {
  content: string
  maxLen?: number
}

const ReadMore: FC<IProps> = ({ content, maxLen }) => {
  const [{ full, inView, isExpand, canToggle }, { setContent, toggle }] =
    useReadMore(maxLen)

  useEffect(() => {
    if (content && content.length > 0 && content !== full) {
      setContent(content)
    }
  }, [content, full, setContent])

  return (
    <S.Container onClick={toggle}>
      {inView}
      {canToggle && <S.Link> {isExpand ? "read less" : "read more"}</S.Link>}
    </S.Container>
  )
}

export default ReadMore
