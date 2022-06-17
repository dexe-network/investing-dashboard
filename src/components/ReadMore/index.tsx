import { FC, useEffect } from "react"

import useReadMore from "hooks/useReadMore"

import { Link } from "./styled"

interface IProps {
  content: string
}

const ReadMore: FC<IProps> = ({ content }) => {
  const [{ full, inView, isExpand, canToggle }, { setContent, toggle }] =
    useReadMore()

  useEffect(() => {
    if (content && content.length > 0 && content !== full) {
      setContent(content)
    }
  }, [content, full, setContent])

  return (
    <>
      {inView}
      {canToggle && (
        <Link onClick={toggle}> {isExpand ? "read less" : "read more"}</Link>
      )}
    </>
  )
}

export default ReadMore
