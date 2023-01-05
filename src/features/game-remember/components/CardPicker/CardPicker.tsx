import React, { useEffect, useRef, useState } from "react"

import { CardFace } from "@/models/card"
import { useGame, useGameDispatch } from "@/providers/GameProvider"
import { Card, Suit } from "@/components"
import styles from "./CardPicker.module.scss"

export interface Props {
  faceToGuess: CardFace
  cardBottomPx: number
  onClose: () => void
}

export default function CardPicker({
  faceToGuess,
  cardBottomPx,
  onClose,
}: Props) {
  const game = useGame()
  const gameDispatch = useGameDispatch()

  const guessedCards = new Set(
    game.pulledCards.map((c) => c.guess).filter((g) => Boolean(g)),
  )
  const [selectedSuit, setSelectedSuit] = useState(game.suits[0])
  const suitsRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    setSelectedSuit(game.suits[0])

    const suitsContainer = suitsRef?.current

    type ChildHTMLButton = HTMLButtonElement | null | undefined
    const firstSuit: ChildHTMLButton =
      suitsContainer?.firstElementChild as ChildHTMLButton

    firstSuit?.focus()
  }, [faceToGuess])

  return (
    <section
      className={styles.wrapper}
      style={{ top: `calc(${cardBottomPx}px + 1.2rem)` }}
    >
      <button
        className={styles.closeButton}
        aria-label="Close the card picker"
        onClick={() => onClose()}
      />

      <div className={styles.suits} ref={suitsRef}>
        {game.suits.map((s) => (
          <button
            key={s}
            className={`${styles.suitButton} ${
              s === selectedSuit ? styles.suitButton__selected : ""
            }`}
            onClick={() => setSelectedSuit(s)}
          >
            <Suit name={s} />
          </button>
        ))}
      </div>

      {selectedSuit ? (
        <div className={styles.cards}>
          {game.cardsBySuit[selectedSuit].map((face) => (
            <Card
              key={face}
              value={face}
              size="small"
              clickHandler={() =>
                gameDispatch({
                  type: "guess-card",
                  card: faceToGuess,
                  guess: face,
                })
              }
              disabled={guessedCards.has(face)}
            />
          ))}
        </div>
      ) : null}
    </section>
  )
}
