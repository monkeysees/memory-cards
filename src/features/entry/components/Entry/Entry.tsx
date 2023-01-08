import React, { useCallback, useEffect } from "react"
import { shuffle } from "lodash"

import { CardFace } from "@/models/card"
import { useGame, useGameDispatch } from "@/providers/GameProvider"
import { Card, CardsGrid, Button } from "@/components"
import EntrySettingsForm from "../EntrySettingsForm/EntrySettingsForm"
import styles from "./styles.module.scss"

function CardsToRemember({ faces }: { faces: CardFace[] }) {
  return (
    <section className={styles.cardsWrapper}>
      <h2>Cards to remember: {faces.length}</h2>

      <CardsGrid cards={faces.map((f) => ({ value: f }))} />
    </section>
  )
}

export default function Entry() {
  const game = useGame()
  const gameDispatch = useGameDispatch()

  useEffect(
    () =>
      gameDispatch({ type: "new-game", shuffledFaces: shuffle(game.faces) }),
    [],
  )

  const pulledFaces = game.pulledCards.map((c) => c.value)
  const unpulledFaces = game.shuffledFaces.filter(
    (face) => !pulledFaces.includes(face),
  )

  const pullCard = useCallback(() => {
    const unpulledFaceIdx = Math.floor(Math.random() * unpulledFaces.length)
    const pulledFace = unpulledFaces[unpulledFaceIdx]
    gameDispatch({ type: "pull-card", face: pulledFace })
  }, [unpulledFaces, gameDispatch])

  return (
    <article className={styles.wrapper}>
      <h1>How many can you ’member?</h1>

      <div className={styles.game}>
        <div className={styles.pullCard}>
          <Card />

          <Button
            isDisabled={game.pulledCards.length === game.faces.length}
            clickHandler={pullCard}
          >
            Pull a card
          </Button>
        </div>

        {game.pulledCards.length > 0 ? (
          <>
            <CardsToRemember faces={pulledFaces} />

            <EntrySettingsForm />

            <Button clickHandler={() => gameDispatch({ type: "start-game" })}>
              Start the game
            </Button>
          </>
        ) : null}
      </div>
    </article>
  )
}
