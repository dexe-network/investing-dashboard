import { FC } from "react"
import { createPortal } from "react-dom"
import { overlayVariants } from "motion/variants"

import { sortItemsList } from "constants/index"
import { useDispatch, useSelector } from "react-redux"

import { AppDispatch } from "state"
import { selectPoolsFilters } from "state/pools/selectors"
import { ISortItem } from "constants/interfaces"
import { setFilter } from "state/pools/actions"

import SortIcon from "assets/icons/SortIcon"

import {
  Container,
  Header,
  Title,
  Cancel,
  Item,
  Label,
  Overlay,
} from "./styled"

const sortRoot = document.getElementById("traders-sort")
const overlayRoot = document.getElementById("overlay")

const getDirection = (direction: "asc" | "desc" | "") => {
  switch (direction) {
    case "desc":
      return "asc"

    case "asc":
      return "desc"

    default:
      return "desc"
  }
}

interface Props {
  isOpen: boolean
  handleClose: () => void
}

const TradersSort: FC<Props> = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch<AppDispatch>()

  const filters = useSelector(selectPoolsFilters)

  const handleSortClick = (item: ISortItem) => {
    const isSameSort = filters.sort.key === item.key
    const direction = isSameSort ? getDirection(filters.sort.direction) : "desc"

    dispatch(
      setFilter({
        name: "sort",
        value: { ...item, direction },
      })
    )
  }

  const handleCancelClick = () => {
    dispatch(
      setFilter({
        name: "sort",
        value: sortItemsList[0],
      })
    )
  }

  return (
    <>
      {overlayRoot &&
        createPortal(
          <Overlay
            onClick={handleClose}
            initial="hidden"
            animate={isOpen ? "visible" : "hidden"}
            variants={overlayVariants}
          />,
          overlayRoot
        )}
      {sortRoot &&
        createPortal(
          <Container
            animate={isOpen ? "visible" : "hidden"}
            initial="hidden"
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                display: "block",
                transition: { duration: 0.1 },
              },
              hidden: {
                opacity: 0,
                y: -15,
                transition: { duration: 0.1 },
                transitionEnd: { display: "none" },
              },
            }}
          >
            <Header>
              <Title>Sort traders:</Title>
              <Cancel onClick={handleCancelClick}>Cancel</Cancel>
            </Header>
            {sortItemsList.map((item) => (
              <Item
                active={item.key === filters.sort.key}
                onClick={() => handleSortClick(item)}
                key={item.key}
              >
                <Label active={item.key === filters.sort.key}>
                  {item.label}
                </Label>
                <SortIcon
                  direction={
                    item.key === filters.sort.key ? filters.sort.direction : ""
                  }
                />
              </Item>
            ))}
          </Container>,
          sortRoot
        )}
    </>
  )
}

export default TradersSort
