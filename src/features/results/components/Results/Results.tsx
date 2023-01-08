import React from "react"
import { partition } from "lodash"

import { useGame } from "@/providers/GameProvider"
import Summary from "../Summary/Summary"
import CardsWithGuesses from "../CardsWithGuesses/CardsWithGuesses"

export default function Results() {
  const game = useGame()
  const [correctCards, incorrectCards] = partition(
    game.pulledCards,
    (c) => c.isCorrectGuess,
  )

  return (
    <article>
      <h1>Here come results</h1>

      <Summary correctCards={correctCards} incorrectCards={incorrectCards} />

      <CardsWithGuesses cards={game.pulledCards} />
    </article>
  )
}
