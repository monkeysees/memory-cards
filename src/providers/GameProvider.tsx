import React, { createContext, ReactNode, useContext, useReducer } from "react"
import { cloneDeep, merge } from "lodash"

import { CardFace } from "@/models/card"
import Game from "@/models/game"
import { assertUnreachable, DeepPartial } from "@/utils/misc"

interface ShuffleCards {
  type: "shuffle-cards"
  cards: CardFace[]
}

interface PullCard {
  type: "pull-card"
  card: CardFace
}

interface UpdateSettings {
  type: "update-settings"
  settings: DeepPartial<Game["settings"]>
}

type ReducerAction = ShuffleCards | PullCard | UpdateSettings

function gameReducer(game: Game, action: ReducerAction) {
  const actionType = action.type
  switch (actionType) {
    case "shuffle-cards": {
      return { ...game, cards: action.cards }
    }
    case "pull-card": {
      return { ...game, pulledCards: [...game.pulledCards, action.card] }
    }
    case "update-settings": {
      return {
        ...game,
        settings: merge(cloneDeep(game.settings), action.settings),
      }
    }
    default:
      return assertUnreachable(actionType)
  }
}

const initialGame: Game = {
  cards: [
    "C2",
    "C3",
    "C4",
    "C5",
    "C6",
    "C7",
    "C8",
    "C9",
    "C10",
    "CJ",
    "CQ",
    "CK",
    "CA",
    "D2",
    "D3",
    "D4",
    "D5",
    "D6",
    "D7",
    "D8",
    "D9",
    "D10",
    "DJ",
    "DQ",
    "DK",
    "DA",
    "H2",
    "H3",
    "H4",
    "H5",
    "H6",
    "H7",
    "H8",
    "H9",
    "H10",
    "HJ",
    "HQ",
    "HK",
    "HA",
    "S2",
    "S3",
    "S4",
    "S5",
    "S6",
    "S7",
    "S8",
    "S9",
    "S10",
    "SJ",
    "SQ",
    "SK",
    "SA",
  ],
  pulledCards: [],
  settings: {
    isOrdered: false,
    isSuited: true,
    timer: {
      isEnabled: false,
      time: 0.5,
    },
  },
}

function initializeGame(initialValue = initialGame) {
  return initialValue
}

const GameContext = createContext<Game>(initialGame)
const GameDispatchContext = createContext<React.Dispatch<ReducerAction>>(
  () => null,
)

function GameProvider({ children }: { children: ReactNode }) {
  const [game, dispatch] = useReducer(gameReducer, initialGame, initializeGame)

  return (
    <GameContext.Provider value={game}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameContext.Provider>
  )
}

function useGame() {
  return useContext(GameContext)
}

function useGameDispatch() {
  return useContext(GameDispatchContext)
}

export { useGame, useGameDispatch, GameProvider }
