import React from "react"
import { isAddress } from "utils"

import { shortenAddress } from "utils"

import close from "assets/icons/chips-close.svg"
import pencil from "assets/icons/pencil-edit.svg"
import {
  LimitIndicator,
  ChipsWrapper,
  TagItem,
  TagButton,
  ErrorText,
  Container,
  Input,
  Label,
  Icon,
} from "./styled"

type AddressChipsState = {
  value: string
  error: string
}

type AddressChipsProps = {
  items: string[]
  label?: string
  limit?: number
  customBg?: string
  onChange: (v: AddressChipsProps["items"]) => void
  readonly?: boolean
}

// TODO: refactor to functional component
export default class AddressChips extends React.Component<
  AddressChipsProps,
  AddressChipsState
> {
  state = {
    value: "",
    error: "",
  }

  handleKeyDown = (evt: any): void => {
    if (["Enter", "Tab", ","].includes(evt.key)) {
      evt.preventDefault()

      const value = this.state.value.trim()
      const updatedList = [...this.props.items, this.state.value]

      if (value && this.isValid(value)) {
        this.props.onChange(updatedList)
      }
    }
  }

  handleChange = (name, value: string) => {
    const updatedList = [...this.props.items, this.state.value]

    if (value.length === 42 && this.isValid(value)) {
      this.props.onChange(updatedList)
      return
    }

    this.setState({
      value: value || "",
      error: "",
    })
  }

  handleDelete = (item: string) => {
    const updatedList = this.props.items.filter((i) => i !== item)
    this.props.onChange(updatedList)
  }

  handlePaste = (evt: any) => {
    evt.preventDefault()

    const paste = evt.clipboardData.getData("text")

    if (this.isValid(paste)) {
      const updatedList = [...this.props.items, paste]
      this.props.onChange(updatedList)
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
    const items: string[] = this.props.items

    return items.includes(address)
  }

  isAddress(address: string) {
    if (address.length !== 42) {
      return false
    }

    return isAddress(address)
  }

  render() {
    const { items, limit, readonly, label, customBg } = this.props
    const { error } = this.state
    return (
      <Container
        isDefault={!items.length}
        readonly={readonly}
        customBg={customBg}
      >
        {readonly && label && <Label>{label}</Label>}
        {!!items.length && (
          <ChipsWrapper>
            {items.map((item) => (
              <TagItem key={item}>
                {shortenAddress(item, 3)}
                <TagButton onClick={() => this.handleDelete(item)}>
                  <img src={close} />
                </TagButton>
              </TagItem>
            ))}
          </ChipsWrapper>
        )}

        {!readonly && (
          <Input
            placeholder="Paste address here 0x..."
            onKeyDown={this.handleKeyDown}
            onChange={(e) => this.handleChange("", e.target.value)}
            onPaste={this.handlePaste}
          />
        )}

        {/* {limit !== undefined && (
          <LimitIndicator>{limit - items.length} left</LimitIndicator>
        )} */}
        {!!error && <ErrorText>{error}</ErrorText>}
        {readonly && <Icon src={pencil} alt="pencil" />}
      </Container>
    )
  }
}
