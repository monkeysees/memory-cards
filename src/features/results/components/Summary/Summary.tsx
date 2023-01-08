import React from "react"

import Game from "@/models/game"
import { CardsGrid } from "@/components"
import styles from "./styles.module.scss"

interface Props {
  correctCards: Game["pulledCards"]
  incorrectCards: Game["pulledCards"]
}

export default function Summary({ correctCards, incorrectCards }: Props) {
  return (
    <section className={styles.wrapper}>
      <h2>Summary</h2>

      <div className={styles.guessesWrapper}>
        <section>
          <h3 className={styles.guessesHeading}>
            <span>Correct guesses:</span>
            <span className="color-success">{correctCards.length}</span>
          </h3>

          <CardsGrid
            cards={correctCards.map((c) => ({
              value: c.guess,
              key: c.value,
            }))}
            size="small"
          />
        </section>

        <section>
          <h3 className={styles.guessesHeading}>
            <span>Incorrect guesses:</span>
            <span className="color-error">{incorrectCards.length}</span>
          </h3>

          <CardsGrid
            cards={incorrectCards.map((c) => ({
              value: c.guess,
              key: c.value,
            }))}
            size="small"
          />
        </section>
      </div>
    </section>
  )
}
