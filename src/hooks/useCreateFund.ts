import { useState } from "react"

interface IProps {}

export default function useCreateFund() {
  const [loading, setLoading] = useState(false)
  const [address, setAddress] = useState(null)

  const submit = async (props: IProps) => {
    // TODO: create pool submit function
  }

  return [submit, loading, address] as const
}
