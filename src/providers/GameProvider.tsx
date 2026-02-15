import React, { createContext, ReactNode, useContext, useReducer } from "react"
import lodash from "lodash"

import { CardFace, Suit } from "@/models/card"
import Game from "@/models/game"
import { assertUnreachable, DeepPartial } from "@/utils/misc"

const { cloneDeep, merge, shuffle } = lodash

interface ShuffleCards {
  type: "new-game"
  shuffledFaces: CardFace[]
}

interface PullCard {
  type: "pull-card"
  face: CardFace
}

interface UpdateSettings {
  type: "update-settings"
  settings: DeepPartial<Game["settings"]>
}

interface StartMemorize {
  type: "start-memorize"
}

interface StartGuess {
  type: "start-guess"
}

interface GuessCard {
  type: "guess-card"
  card: CardFace
  guess: CardFace
}

interface EndGame {
  type: "end-game"
}

type ReducerAction =
  | ShuffleCards
  | PullCard
  | UpdateSettings
  | StartMemorize
  | StartGuess
  | GuessCard
  | EndGame

function gameReducer(game: Game, action: ReducerAction) {
  const actionType = action.type
  switch (actionType) {
    case "new-game": {
      return {
        ...game,
        stage: "entry" as "entry",
        shuffledFaces: action.shuffledFaces,
        pulledCards: [],
      }
    }

    case "pull-card": {
      return {
        ...game,
        pulledCards: [
          ...game.pulledCards,
          { value: action.face, guess: undefined, isCorrectGuess: false },
        ],
      }
    }

    case "update-settings": {
      return {
        ...game,
        settings: merge(cloneDeep(game.settings), action.settings),
      }
    }

    case "start-memorize": {
      return {
        ...game,
        // hack to satisfy ts compiler,
        // otherwise it does not consider return type to be `Game`
        stage: "memorize" as "memorize",
        pulledCards: game.shuffledFaces
          .slice(0, game.settings.cardsNum)
          .map((f) => ({
            value: f,
            guess: undefined,
            isCorrectGuess: false,
          })),
      }
    }

    case "start-guess": {
      return {
        ...game,
        // hack to satisfy ts compiler,
        // otherwise it does not consider return type to be `Game`
        stage: "recall" as "recall",
      }
    }

    case "guess-card": {
      return {
        ...game,
        pulledCards: game.pulledCards.map((card) => {
          if (card.value !== action.card) {
            return card
          }

          return { ...card, guess: action.guess }
        }),
      }
    }

    case "end-game": {
      let pulledCards: Game["pulledCards"] = []

      if (game.settings.isOrdered) {
        pulledCards = game.pulledCards.map((c) => ({
          ...c,
          isCorrectGuess: game.settings.isSuited
            ? c.value === c.guess
            : c.value.slice(1) === (c.guess || "").slice(1),
        }))
      } else {
        const correctFaces = game.pulledCards.reduce<Set<CardFace>>(
          (faces, { value }) => {
            if (game.settings.isSuited) {
              faces.add(value)
            } else {
              game.suits.forEach((s) =>
                faces.add((s[0].toUpperCase() + value.slice(1)) as CardFace),
              )
            }

            return faces
          },
          new Set(),
        )

        pulledCards = game.pulledCards.map((c) => ({
          ...c,
          isCorrectGuess: !!c.guess && correctFaces.has(c.guess),
        }))
      }

      return {
        ...game,
        pulledCards,
        // hack to satisfy ts compiler,
        // otherwise it does not consider return type to be `Game`
        stage: "results" as "results",
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
  faces: Object.values(cardsBySuit).flat(),
  shuffledFaces: [],
  pulledCards: [],
  settings: {
    cardsNum: 2,
    isOrdered: true,
    isSuited: true,
    timer: {
      isEnabled: false,
      time: 30,
    },
  },
  stage: "entry",
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

function startNewGame(game: Game, gameDispatch: React.Dispatch<ReducerAction>) {
  if (game.stage === "entry" && game.shuffledFaces.length) {
    return
  }

  gameDispatch({ type: "new-game", shuffledFaces: shuffle(game.faces) })
}

export { useGame, useGameDispatch, GameProvider, startNewGame }
export { gameReducer, initialGame }
