import React, { useCallback, useEffect } from "react"
import { shuffle } from "lodash"

import { CardFace } from "@/models/card"
import { useGame, useGameDispatch } from "@/providers/GameProvider"
import { Card, CardsGrid, Button } from "@/components"
import GameSettingsForm from "../GameSettingsForm/GameSettingsForm"
import styles from "./GameEntry.module.scss"

function CardsToRemember({ cards }: { cards: CardFace[] }) {
  return (
    <section className={styles.cardsWrapper}>
      <h2>Cards to remember: {cards.length}</h2>

      <CardsGrid cards={cards.map((c) => ({ value: c }))} />
    </section>
  )
}

export default function GameEntry() {
  const game = useGame()
  const gameDispatch = useGameDispatch()

  useEffect(
    () =>
      gameDispatch({ type: "new-game", shuffledCards: shuffle(game.cards) }),
    [],
  )

  const pulledCardValues = game.pulledCards.map((c) => c.value)
  const unpulledCards = game.shuffledCards.filter(
    (card) => !pulledCardValues.includes(card),
  )

  const pullCard = useCallback(() => {
    const unpulledCardIdx = Math.floor(Math.random() * unpulledCards.length)
    const pulledCard = unpulledCards[unpulledCardIdx]
    gameDispatch({ type: "pull-card", card: pulledCard })
  }, [unpulledCards, gameDispatch])

  return (
    <article className={styles.wrapper}>
      <h1>How many can you ’member?</h1>

      <div className={styles.game}>
        <div className={styles.pullCard}>
          <Card />

          <Button
            isDisabled={game.pulledCards.length === game.cards.length}
            clickHandler={pullCard}
          >
            Pull a card
          </Button>
        </div>

        {game.pulledCards.length > 0 ? (
          <>
            <CardsToRemember cards={pulledCardValues} />

            <GameSettingsForm />

            <Button clickHandler={() => gameDispatch({ type: "start-game" })}>
              Start the game
            </Button>
          </>
        ) : null}
      </div>
    </article>
  )
}
