import React, { useEffect, useState } from "react"

import Game from "@/models/game"
import { Button, Card } from "@/components"
import styles from "./styles.module.scss"

function CardWrapper({
  card,
  showAllGuesses,
}: {
  card: Game["pulledCards"][number]
  showAllGuesses: boolean
}) {
  const [showGuess, setShowGuess] = useState<boolean>()
  useEffect(() => setShowGuess(showAllGuesses), [showAllGuesses])

  return (
    <div className={styles.cardWrapper}>
      <Card
        value={showGuess ? card.guess : card.value}
        classes={card.isCorrectGuess ? styles.guessSuccess : styles.guessError}
      />
      <Button
        clickHandler={() => setShowGuess(!showGuess)}
        classes={styles.button}
      >
        Show {showGuess ? "correct" : "guess"}
      </Button>
    </div>
  )
}

interface Props {
  cards: Game["pulledCards"]
  classes?: string
}

export default function CardsWithGuesses({ cards, classes }: Props) {
  const [showAllGuesses, setShowAllGuesses] = useState(true)

  return (
    <section className={`${styles.wrapper} ${classes || ""}`}>
      <h2 className={styles.heading}>Results by card</h2>

      <Button
        clickHandler={() => setShowAllGuesses(!showAllGuesses)}
        classes={`${styles.button} ${styles.buttonLong} ${styles.buttonShowAll}`}
      >
        Show {showAllGuesses ? "all correct" : "all guesses"}
      </Button>

      <div className={styles.cardsGrid}>
        {cards.map((c) => (
          <CardWrapper key={c.value} card={c} showAllGuesses={showAllGuesses} />
        ))}
      </div>
    </section>
  )
}

CardsWithGuesses.defaultProps = { classes: "" }
