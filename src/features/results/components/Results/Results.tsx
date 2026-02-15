import React, { useEffect } from "react"

import {
  useGame,
  useGameDispatch,
  startNewGame,
} from "@/providers/GameProvider"
import { trackGameCompleted } from "@/utils/analytics"
import { Button } from "@/components"
import Summary from "../Summary/Summary"
import CardsWithGuesses from "../CardsWithGuesses/CardsWithGuesses"
import styles from "./styles.module.scss"

export default function Results() {
  const game = useGame()
  const gameDispatch = useGameDispatch()

  const [correctCards, incorrectCards] = game.pulledCards.reduce<
    [typeof game.pulledCards, typeof game.pulledCards]
  >(
    (cards, card) => {
      const [nextCorrectCards, nextIncorrectCards] = cards
      if (card.isCorrectGuess) {
        nextCorrectCards.push(card)
      } else {
        nextIncorrectCards.push(card)
      }

      return cards
    },
    [[], []],
  )

  useEffect(() => {
    trackGameCompleted({
      settings: game.settings,
      correctCardsNum: correctCards.length,
      totalCardsNum: game.pulledCards.length,
    })
  }, [correctCards.length, game.pulledCards.length, game.settings])

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
