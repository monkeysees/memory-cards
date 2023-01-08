import React, { useRef, useState } from "react"

import { CardFace } from "@/models/card"
import Game from "@/models/game"
import { useGame, useGameDispatch } from "@/providers/GameProvider"
import { Button, CardsGrid } from "@/components"
import CardPicker, { Props as CardPickerProps } from "../CardPicker/CardPicker"
import Timer from "../Timer/Timer"
import styles from "./styles.module.scss"

function CardsToRemember({
  cards,
  cardToGuess,
  cardClickHandler,
}: {
  cards: Game["pulledCards"]
  cardClickHandler: (
    e: React.MouseEvent<HTMLButtonElement>,
    face: CardFace,
  ) => void
  cardToGuess: { face?: CardFace; ref: React.RefObject<HTMLButtonElement> }
}) {
  return (
    <section className={styles.cardsWrapper}>
      <h2>Cards to remember: {cards.length}</h2>

      <CardsGrid
        cards={cards.map((c) => {
          const isCurrentGuess = cardToGuess.face === c.value
          return {
            value: c.guess,
            key: c.value,
            interactiveRef: isCurrentGuess ? cardToGuess.ref : undefined,
            clickHandler: (e) => cardClickHandler(e, c.value),
            classes: isCurrentGuess ? styles.cardToGuess : undefined,
          }
        })}
      />
    </section>
  )
}

export default function Remember() {
  const game = useGame()
  const gameDispatch = useGameDispatch()

  const [cardPickerOptions, setCardPickerOptions] =
    useState<Omit<CardPickerProps, "onClose">>()
  const cardToGuessRef = useRef<HTMLButtonElement>(null)

  return (
    <article className={styles.wrapper}>
      <h1 className={styles.heading}>Remember ’em all</h1>

      {game.settings.timer.isEnabled ? (
        <Timer
          direction="down"
          seconds={game.settings.timer.time}
          classes={styles.timer}
        />
      ) : null}

      <CardsToRemember
        cards={game.pulledCards}
        cardToGuess={{
          face: cardPickerOptions?.faceToGuess,
          ref: cardToGuessRef,
        }}
        cardClickHandler={(e, face) => {
          const boundingRect = e.currentTarget.getBoundingClientRect()
          setCardPickerOptions({
            faceToGuess: face,
            cardBottomPx: boundingRect.bottom,
          })
        }}
      />

      {cardPickerOptions ? (
        <CardPicker
          faceToGuess={cardPickerOptions.faceToGuess}
          cardBottomPx={cardPickerOptions.cardBottomPx}
          onClose={() => {
            cardToGuessRef.current?.focus()
            setCardPickerOptions(undefined)
          }}
        />
      ) : null}

      <Button clickHandler={() => gameDispatch({ type: "end-game" })}>
        Check the cards
      </Button>
    </article>
  )
}
