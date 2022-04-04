import { useEffect } from "react"

import { usePoolsFilters } from "state/pools/hooks"

import Header, { EHeaderTitles } from "components/Header"

const TopMembersBar: React.FC = () => {
  const [filters, dispatchFilter] = usePoolsFilters()

  // *hint.
  // in older versions listType was "all" || "risk" value,
  // but now it's deprecated.
  // so that side effect will make sure that
  // app not crashed
  useEffect(() => {
    if (filters.listType === "all" || filters.listType === "risk") {
      dispatchFilter("listType", "basic")
    }
  }, [filters.listType, dispatchFilter])

  return <Header title={EHeaderTitles.investing} />
}

export default TopMembersBar
