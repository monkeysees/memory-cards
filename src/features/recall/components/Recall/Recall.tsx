import React, { useEffect, useRef, useState } from "react"

import { CardFace } from "@/models/card"
import Game from "@/models/game"
import { useGame, useGameDispatch } from "@/providers/GameProvider"
import { Button, CardsGrid } from "@/components"
import CardPicker, { Props as CardPickerProps } from "../CardPicker/CardPicker"
import styles from "./styles.module.scss"

function CardsToRecall({
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
      <h2>Cards to recall: {cards.length}</h2>

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

export default function Recall() {
  const game = useGame()
  const gameDispatch = useGameDispatch()

  const [cardPickerOptions, setCardPickerOptions] = useState<
    (Omit<CardPickerProps, "onClose"> & { isShown: true }) | { isShown: false }
  >({ isShown: false })
  const cardToGuessRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!cardPickerOptions.isShown) {
      return () => {}
    }

    const escapeHandler = (e: KeyboardEvent) => {
      if (e.key !== "Escape") {
        return
      }

      setCardPickerOptions({ isShown: false })
    }

    window.addEventListener("keydown", escapeHandler)

    return () => window.removeEventListener("keydown", escapeHandler)
  }, [cardPickerOptions.isShown])

  return (
    <article className={styles.wrapper}>
      <h1 className={styles.heading}>Recall ’em all</h1>

      <CardsToRecall
        cards={game.pulledCards}
        cardToGuess={{
          face: cardPickerOptions.isShown
            ? cardPickerOptions.faceToGuess
            : undefined,
          ref: cardToGuessRef,
        }}
        cardClickHandler={(e, face) => {
          const boundingRect = e.currentTarget.getBoundingClientRect()
          setCardPickerOptions({
            faceToGuess: face,
            cardBottomPx: boundingRect.bottom,
            isShown: true,
          })
        }}
      />

      {cardPickerOptions.isShown ? (
        <CardPicker
          faceToGuess={cardPickerOptions.faceToGuess}
          cardBottomPx={cardPickerOptions.cardBottomPx}
          onClose={() => {
            cardToGuessRef.current?.focus()
            setCardPickerOptions({ isShown: false })
          }}
        />
      ) : null}

      <Button clickHandler={() => gameDispatch({ type: "end-game" })}>
        Check the cards
      </Button>
    </article>
  )
}
