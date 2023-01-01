import React, { useCallback, useEffect } from "react"
import { shuffle } from "lodash"

import { CardFace as CardFaceValue } from "@/models/card"
import { useGame, useGameDispatch } from "@/providers/GameProvider"
import { CardFace, CardBack, Button } from "@/components"
import GameSettingsForm from "../GameSettingsForm/GameSettingsForm"
import styles from "./GameEntry.module.scss"

function CardsToRemember({ cards }: { cards: CardFaceValue[] }) {
  return (
    <section className={styles.cardsWrapper}>
      <h2>Cards to remember: {cards.length}</h2>
      <div className={styles.cardsGrid}>
        {cards.map((card) => (
          <CardFace name={card} key={card} />
        ))}
      </div>
    </section>
  )
}

export default function GameEntry() {
  const game = useGame()
  const gameDispatch = useGameDispatch()

  useEffect(
    () => gameDispatch({ type: "shuffle-cards", cards: shuffle(game.cards) }),
    [],
  )

  const unpulledCards = game.cards.filter(
    (card) => !game.pulledCards.includes(card),
  )

  const pullCard = useCallback(() => {
    const unpulledCardIdx = Math.floor(Math.random() * unpulledCards.length)
    const pulledCard = unpulledCards[unpulledCardIdx]
    gameDispatch({ type: "pull-card", card: pulledCard })
  }, [gameDispatch])

  return (
    <article className={styles.wrapper}>
      <h1>How many can you ’member?</h1>

      <div className={styles.game}>
        <div className={styles.pullCard}>
          <CardBack />
          <Button
            label="Pull a card"
            isDisabled={game.pulledCards.length === game.cards.length}
            clickHandler={pullCard}
          />
        </div>

        {game.pulledCards.length > 0 ? (
          <>
            <CardsToRemember cards={game.pulledCards} />
            <GameSettingsForm />
            <Button label="Start the game" />
          </>
        ) : null}
      </div>
    </article>
  )
}
