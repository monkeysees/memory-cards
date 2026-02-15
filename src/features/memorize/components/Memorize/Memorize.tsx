import React from "react"

import { useGame, useGameDispatch } from "@/providers/GameProvider"
import { trackRecallStarted } from "@/utils/analytics"
import Game from "@/models/game"
import { Button, CardsGrid } from "@/components"
import Timer from "../Timer/Timer"
import styles from "./styles.module.scss"

function CardsToMemorize({ cards }: { cards: Game["pulledCards"] }) {
  return (
    <section className={styles.cardsWrapper}>
      <h2>Cards to memorize: {cards.length}</h2>

      <CardsGrid cards={cards.map((c) => ({ value: c.value }))} />
    </section>
  )
}

export default function Remember() {
  const game = useGame()
  const gameDispatch = useGameDispatch()

  return (
    <article className={styles.wrapper}>
      <h1 className={styles.heading}>Memorize ’em all</h1>

      {game.settings.timer.isEnabled ? (
        <Timer
          direction="down"
          seconds={game.settings.timer.time}
          classes={styles.timer}
        />
      ) : null}

      <CardsToMemorize cards={game.pulledCards} />

      <Button
        clickHandler={() => {
          trackRecallStarted({ source: "manual", settings: game.settings })
          gameDispatch({ type: "start-guess" })
        }}
      >
        Check your memory
      </Button>
    </article>
  )
}
