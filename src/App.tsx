import React from "react"

import { useGame } from "@/providers/GameProvider"
import { GameEntry, GameRemember } from "@/features"

function App() {
  const game = useGame()

  return game.isStarted ? <GameRemember /> : <GameEntry />
}

export default App
