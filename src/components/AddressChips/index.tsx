import React from "react"
import { isAddress } from "utils"

import { shortenAddress } from "utils"

import close from "assets/icons/close.svg"
import {
  LimitIndicator,
  ChipsWrapper,
  TagItem,
  TagButton,
  ErrorText,
  Container,
  Input,
} from "./styled"

type AddressChipsState = {
  items: string[]
  value: string
  error: string
}

type AddressChipsProps = {
  label?: string
  limit: number
}

// TODO: refactor to functional component
export default class AddressChips extends React.Component<
  AddressChipsProps,
  AddressChipsState
> {
  state = {
    items: [],
    value: "",
    error: "",
  }

  handleKeyDown = (evt: any): void => {
    if (["Enter", "Tab", ","].includes(evt.key)) {
      evt.preventDefault()

      const value = this.state.value.trim()

      if (value && this.isValid(value)) {
        this.setState({
          items: [...this.state.items, this.state.value],
          value: "",
        })
      }
    }
  }

  handleChange = (name, value: string) => {
    if (value.length === 42 && this.isValid(value)) {
      this.setState({
        items: [...this.state.items, this.state.value],
        value: "",
      })
      return
    }

    this.setState({
      value: value || "",
      error: "",
    })
  }

  handleDelete = (item: string) => {
    this.setState({
      items: this.state.items.filter((i) => i !== item),
    })
  }

  handlePaste = (evt: any) => {
    evt.preventDefault()

    const paste = evt.clipboardData.getData("text")

    if (this.isValid(paste)) {
      this.setState({
        items: [...this.state.items, paste],
      })
    }
  }

  isValid(address: string) {
    let error = ""

    if (this.isInList(address)) {
      error = `${address} has already been added.`
    }

    if (!this.isAddress(address)) {
      error = `${address} is not a valid address.`
    }

    if (address.length !== 42) {
      error = `address length should be equal to 42 characters`
    }

    if (error.length) {
      this.setState({ error })

      return false
    } else if (this.state.error.length) {
      this.setState({ error: "" })
    }

    return true
  }

  isInList(address: string) {
    const items: string[] = this.state.items

    return items.includes(address)
  }

  isAddress(address: string) {
    if (address.length !== 42) {
      return false
    }

    return isAddress(address)
  }

  render() {
    const { label, limit } = this.props
    const { items, error } = this.state
    return (
      <Container>
        {!!items.length && (
          <ChipsWrapper full p="15px 0 0" jc="flex-start">
            {items.map((item) => (
              <TagItem key={item}>
                {shortenAddress(item)}
                <TagButton onClick={() => this.handleDelete(item)}>
                  <img src={close} />
                </TagButton>
              </TagItem>
            ))}
          </ChipsWrapper>
        )}

        <Input
          placeholder="Paste address here 0x..."
          onKeyDown={this.handleKeyDown}
          onChange={(e) => this.handleChange("", e.target.value)}
          onPaste={this.handlePaste}
        />

        <LimitIndicator>{limit - items.length} left</LimitIndicator>
        <ErrorText>{error}</ErrorText>
      </Container>
    )
  }
}
