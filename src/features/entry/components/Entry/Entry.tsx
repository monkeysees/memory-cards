import React, { useEffect } from "react"
import { shuffle } from "lodash"

import { useGame, useGameDispatch } from "@/providers/GameProvider"
import { Button } from "@/components"
import EntrySettingsForm from "../EntrySettingsForm/EntrySettingsForm"
import styles from "./styles.module.scss"

export default function Entry() {
  const game = useGame()
  const gameDispatch = useGameDispatch()

  useEffect(
    () =>
      gameDispatch({ type: "new-game", shuffledFaces: shuffle(game.faces) }),
    [],
  )

  return (
    <article className={styles.wrapper}>
      <h1>How many can you ’member?</h1>

      <EntrySettingsForm />

      <Button clickHandler={() => gameDispatch({ type: "start-memorize" })}>
        Start the game
      </Button>
    </article>
  )
}
