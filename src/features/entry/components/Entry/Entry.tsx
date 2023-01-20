import React, { useEffect } from "react"

import {
  useGame,
  useGameDispatch,
  startNewGame,
} from "@/providers/GameProvider"
import { Button } from "@/components"
import EntrySettingsForm from "../EntrySettingsForm/EntrySettingsForm"
import styles from "./styles.module.scss"

export default function Entry() {
  const game = useGame()
  const gameDispatch = useGameDispatch()

  useEffect(() => startNewGame(game, gameDispatch), [])

  return (
    <article className={styles.wrapper}>
      <h1>How many can you memorize?</h1>

      <EntrySettingsForm />

      <Button clickHandler={() => gameDispatch({ type: "start-memorize" })}>
        Start the game
      </Button>
    </article>
  )
}
