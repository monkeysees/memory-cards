import assert from "node:assert/strict"
import test from "node:test"

import { gameReducer, initialGame } from "../../.tmp-test/providers/GameProvider.js"

function createGame(overrides = {}) {
  return {
    ...structuredClone(initialGame),
    ...overrides,
  }
}

test("new-game resets stage and pulled cards", () => {
  const game = createGame({
    stage: "results",
    shuffledFaces: ["C2"],
    pulledCards: [{ value: "C2", guess: "C2", isCorrectGuess: true }],
  })
  const next = gameReducer(game, {
    type: "new-game",
    shuffledFaces: ["H3", "D7"],
  })

  assert.equal(next.stage, "entry")
  assert.deepEqual(next.shuffledFaces, ["H3", "D7"])
  assert.deepEqual(next.pulledCards, [])
})

test("update-settings deep-merges nested settings", () => {
  const game = createGame()
  const next = gameReducer(game, {
    type: "update-settings",
    settings: { timer: { isEnabled: true } },
  })

  assert.equal(next.settings.timer.isEnabled, true)
  assert.equal(next.settings.timer.time, 30)
  assert.equal(game.settings.timer.isEnabled, false)
})

test("start-memorize picks configured number of cards from shuffled faces", () => {
  const game = createGame({
    settings: { ...initialGame.settings, cardsNum: 3 },
    shuffledFaces: ["S10", "D4", "C9", "HA"],
  })

  const next = gameReducer(game, { type: "start-memorize" })

  assert.equal(next.stage, "memorize")
  assert.deepEqual(
    next.pulledCards.map((card) => card.value),
    ["S10", "D4", "C9"],
  )
  assert.ok(next.pulledCards.every((card) => card.guess === undefined))
})

test("guess-card updates only the selected card", () => {
  const game = createGame({
    pulledCards: [
      { value: "C2", guess: undefined, isCorrectGuess: false },
      { value: "D2", guess: undefined, isCorrectGuess: false },
    ],
  })

  const next = gameReducer(game, {
    type: "guess-card",
    card: "D2",
    guess: "H4",
  })

  assert.equal(next.pulledCards[0].guess, undefined)
  assert.equal(next.pulledCards[1].guess, "H4")
})

test("end-game scores ordered suited rounds by exact card match", () => {
  const game = createGame({
    settings: {
      ...initialGame.settings,
      isOrdered: true,
      isSuited: true,
    },
    pulledCards: [
      { value: "H9", guess: "H9", isCorrectGuess: false },
      { value: "CQ", guess: "SQ", isCorrectGuess: false },
      { value: "D3", guess: undefined, isCorrectGuess: false },
    ],
  })

  const next = gameReducer(game, { type: "end-game" })

  assert.equal(next.stage, "results")
  assert.deepEqual(
    next.pulledCards.map((card) => card.isCorrectGuess),
    [true, false, false],
  )
})

test("end-game scores unordered unsuited rounds by rank only", () => {
  const game = createGame({
    settings: {
      ...initialGame.settings,
      isOrdered: false,
      isSuited: false,
    },
    pulledCards: [
      { value: "C8", guess: "H8", isCorrectGuess: false },
      { value: "DJ", guess: "SJ", isCorrectGuess: false },
      { value: "S4", guess: "C10", isCorrectGuess: false },
      { value: "HA", guess: undefined, isCorrectGuess: false },
    ],
  })

  const next = gameReducer(game, { type: "end-game" })

  assert.equal(next.stage, "results")
  assert.deepEqual(
    next.pulledCards.map((card) => card.isCorrectGuess),
    [true, true, false, false],
  )
})
