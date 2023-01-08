import React from "react"

import { assertUnreachable } from "@/utils/misc"
import { useGame } from "@/providers/GameProvider"
import { Entry, Memorize, Remember, Results } from "@/features"

function App() {
  const game = useGame()

  switch (game.stage) {
    case "entry":
      return <Entry />
    case "memorize":
      return <Memorize />
    case "remember":
      return <Remember />
    case "results":
      return <Results />

    default:
      return assertUnreachable(game.stage)
  }
}

export default App
