import React from "react"

import { useGame } from "@/providers/GameProvider"
import { Entry, Remember } from "@/features"

function App() {
  const game = useGame()

  return game.isStarted ? <Remember /> : <Entry />
}

export default App
