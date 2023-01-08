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

export default function Results() {
  const game = useGame()
  const gameDispatch = useGameDispatch()

  const [correctCards, incorrectCards] = partition(
    game.pulledCards,
    (c) => c.isCorrectGuess,
  )

  return (
    <article>
      <h1>Here come results</h1>

      <Summary correctCards={correctCards} incorrectCards={incorrectCards} />

      <CardsWithGuesses cards={game.pulledCards} />

      <Button clickHandler={() => startNewGame(game, gameDispatch)}>
        New game
      </Button>
    </article>
  )
}
