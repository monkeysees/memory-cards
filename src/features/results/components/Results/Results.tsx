import React from "react"
import { partition } from "lodash"

import {
  useGame,
  useGameDispatch,
  startNewGame,
} from "@/providers/GameProvider"
import { Button } from "@/components"
import Summary from "../Summary/Summary"
import CardsWithGuesses from "../CardsWithGuesses/CardsWithGuesses"
import styles from "./styles.module.scss"

export default function Results() {
  const game = useGame()
  const gameDispatch = useGameDispatch()

  const [correctCards, incorrectCards] = partition(
    game.pulledCards,
    (c) => c.isCorrectGuess,
  )

  return (
    <article className={styles.wrapper}>
      <h1 className={styles.heading}>Here come results</h1>

      <Summary
        correctCards={correctCards}
        incorrectCards={incorrectCards}
        classes={
          incorrectCards.length
            ? styles.summary_mbLarge
            : styles.summary_mbSmall
        }
      />

      <CardsWithGuesses
        cards={game.pulledCards}
        classes={styles.cardsWithGuesses}
      />

      <Button
        classes={styles.button}
        clickHandler={() => startNewGame(game, gameDispatch)}
      >
        New game
      </Button>
    </article>
  )
}
