import React from "react"

import { useGame } from "@/providers/GameProvider"
import { assertUnreachable } from "@/utils/misc"
import { Entry, Memorize, Recall, Results } from "@/features"

function App() {
  const game = useGame()

  switch (game.stage) {
    case "entry":
      return <Entry />
    case "memorize":
      return <Memorize />
    case "recall":
      return <Recall />
    case "results":
      return <Results />

    default:
      return assertUnreachable(game.stage)
  }
}

export default App
