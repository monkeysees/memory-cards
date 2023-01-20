import React from "react"

import Game from "@/models/game"
import { CardsGrid } from "@/components"
import styles from "./styles.module.scss"

function CardsGuesses({ cards }: { cards: Game["pulledCards"] }) {
  return (
    <CardsGrid
      cards={cards.map((c) => ({
        value: c.guess,
        key: c.value,
      }))}
      size="small"
      classes={styles.guessesGrid}
    />
  )
}

interface Props {
  correctCards: Game["pulledCards"]
  incorrectCards: Game["pulledCards"]
  classes?: string
}

export default function Summary({
  correctCards,
  incorrectCards,
  classes,
}: Props) {
  return (
    <section className={classes || ""}>
      <h2>Summary</h2>

      <div className={correctCards.length ? styles.guessesWrapper : ""}>
        <section>
          <h3
            className={`
            ${styles.guessesHeading}
            ${correctCards.length ? styles.guessesHeading_withMargin : ""}`}
          >
            <span>Correct guesses:</span>
            <span className="color-success">{correctCards.length}</span>
          </h3>

          <CardsGuesses cards={correctCards} />
        </section>

        <section>
          <h3
            className={`
            ${styles.guessesHeading}
            ${incorrectCards.length ? styles.guessesHeading_withMargin : ""}`}
          >
            <span>Incorrect guesses:</span>
            <span className="color-error">{incorrectCards.length}</span>
          </h3>

          <CardsGuesses cards={incorrectCards} />
        </section>
      </div>
    </section>
  )
}

Summary.defaultProps = { classes: "" }
