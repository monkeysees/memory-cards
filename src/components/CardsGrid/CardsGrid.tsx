import React from "react"

import Card, { Props as CardProps } from "../Card/Card"
import styles from "./styles.module.scss"

// `key` is used to distinguish cards with the same value
interface Props {
  cards: Array<
    Pick<CardProps, "value" | "clickHandler" | "interactiveRef" | "classes"> & {
      key?: string
    }
  >
  size?: CardProps["size"]
  classes?: string
}

export default function CardsGrid({
  cards,
  size,
  classes: gridClasses,
}: Props) {
  return (
    <div
      className={`${styles.grid} ${styles[`grid__${size}`]} ${
        gridClasses || ""
      }`}
    >
      {cards.map(({ value, clickHandler, interactiveRef, classes, key }) => (
        <Card
          {...{ value, size, clickHandler, classes, interactiveRef }}
          key={key || value}
        />
      ))}
    </div>
  )
}

CardsGrid.defaultProps = { size: "medium", classes: "" }
