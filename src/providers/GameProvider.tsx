import React, { createContext, ReactNode, useContext, useReducer } from "react"
import { cloneDeep, merge } from "lodash"

import { CardFace, Suit } from "@/models/card"
import Game from "@/models/game"
import { assertUnreachable, DeepPartial } from "@/utils/misc"

interface ShuffleCards {
  type: "new-game"
  shuffledCards: CardFace[]
}

interface PullCard {
  type: "pull-card"
  card: CardFace
}

interface UpdateSettings {
  type: "update-settings"
  settings: DeepPartial<Game["settings"]>
}

interface StartGame {
  type: "start-game"
}

interface GuessCard {
  type: "guess-card"
  card: CardFace
  guess: CardFace
}

type ReducerAction =
  | ShuffleCards
  | PullCard
  | UpdateSettings
  | StartGame
  | GuessCard

function gameReducer(game: Game, action: ReducerAction) {
  const actionType = action.type
  switch (actionType) {
    case "new-game": {
      return { ...game, shuffledCards: action.shuffledCards, pulledCards: [] }
    }

    case "pull-card": {
      return {
        ...game,
        pulledCards: [...game.pulledCards, { value: action.card }],
      }
    }

    case "update-settings": {
      return {
        ...game,
        settings: merge(cloneDeep(game.settings), action.settings),
      }
    }

    case "start-game": {
      return game.pulledCards.length > 0
        ? {
            ...game,
            isStarted: true,
          }
        : game
    }

    case "guess-card": {
      return {
        ...game,
        pulledCards: game.pulledCards.map((c) =>
          c.value === action.card ? { ...c, guess: action.guess } : c,
        ),
      }
    }

    default:
      return assertUnreachable(actionType)
  }
}

const cardsBySuit: { [Property in Suit]: CardFace[] } = {
  clubs: [
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
  ],
  diamonds: [
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
  ],
  hearts: [
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
  ],
  spades: [
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
}

const initialGame: Game = {
  cardsBySuit,
  suits: Object.keys(cardsBySuit) as [Suit, Suit, Suit, Suit],
  cards: Object.values(cardsBySuit).flat(),
  shuffledCards: [],
  pulledCards: [],
  settings: {
    isOrdered: true,
    isSuited: true,
    timer: {
      isEnabled: false,
      time: 30,
    },
  },
  isStarted: false,
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
