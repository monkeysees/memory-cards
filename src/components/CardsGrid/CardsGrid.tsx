import React from "react"

import { CardFace } from "@/models/card"
import Card from "../Card/Card"
import styles from "./CardsGrid.module.scss"

// `key` is used to distinguish cards with the same value
interface Props {
  cards: Array<{
    value?: CardFace
    key?: string
    isHidden?: boolean
    clickHandler?: React.MouseEventHandler<HTMLButtonElement>
    interactiveRef?: React.RefObject<HTMLButtonElement>
    classes?: string
  }>
}

export default function CardsGrid({ cards }: Props) {
  return (
    <div className={styles.grid}>
      {cards.map(
        ({ value, isHidden, clickHandler, interactiveRef, classes, key }) =>
          isHidden ? (
            <Card
              {...{ clickHandler, classes, interactiveRef }}
              key={key || value}
            />
          ) : (
            <Card
              {...{ value, clickHandler, classes, interactiveRef }}
              key={key || value}
            />
          ),
      )}
    </div>
  )
}
