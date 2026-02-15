import assert from "node:assert/strict"
import test from "node:test"

import {
  gameReducer,
  initialGame,
  startNewGame,
} from "../../.tmp-test/providers/GameProvider.js"

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

test("startNewGame dispatches a shuffled full deck action", () => {
  const actions = []
  startNewGame(initialGame, (action) => {
    actions.push(action)
  })

  assert.equal(actions.length, 1)
  assert.equal(actions[0].type, "new-game")
  assert.equal(actions[0].shuffledFaces.length, initialGame.faces.length)
  assert.equal(new Set(actions[0].shuffledFaces).size, initialGame.faces.length)
  assert.ok(actions[0].shuffledFaces.every((face) => initialGame.faces.includes(face)))
})

test("startNewGame is a no-op when entry already has a shuffled deck", () => {
  const actions = []
  const game = createGame({
    stage: "entry",
    shuffledFaces: ["H3", "D7"],
  })

  startNewGame(game, (action) => {
    actions.push(action)
  })

  assert.deepEqual(actions, [])
})
test("initialGame defines a standard 52-card deck split across 4 suits", () => {
  assert.equal(initialGame.suits.length, 4)
  assert.equal(initialGame.faces.length, 52)
  assert.equal(initialGame.cardsBySuit.clubs.length, 13)
  assert.equal(initialGame.cardsBySuit.diamonds.length, 13)
  assert.equal(initialGame.cardsBySuit.hearts.length, 13)
  assert.equal(initialGame.cardsBySuit.spades.length, 13)
  assert.equal(new Set(initialGame.faces).size, 52)
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

test("pull-card appends a revealed card with default guess metadata", () => {
  const game = createGame({
    pulledCards: [{ value: "C2", guess: "C2", isCorrectGuess: true }],
  })
  const next = gameReducer(game, { type: "pull-card", face: "H10" })

  assert.equal(next.pulledCards.length, 2)
  assert.deepEqual(next.pulledCards[1], {
    value: "H10",
    guess: undefined,
    isCorrectGuess: false,
  })
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

test("start-guess transitions the stage to recall", () => {
  const game = createGame({ stage: "memorize" })
  const next = gameReducer(game, { type: "start-guess" })

  assert.equal(next.stage, "recall")
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

test("end-game scores ordered unsuited rounds by rank only", () => {
  const game = createGame({
    settings: {
      ...initialGame.settings,
      isOrdered: true,
      isSuited: false,
    },
    pulledCards: [
      { value: "H9", guess: "C9", isCorrectGuess: false },
      { value: "CQ", guess: "SQ", isCorrectGuess: false },
      { value: "D3", guess: undefined, isCorrectGuess: false },
    ],
  })

  const next = gameReducer(game, { type: "end-game" })

  assert.deepEqual(
    next.pulledCards.map((card) => card.isCorrectGuess),
    [true, true, false],
  )
})

test("end-game scores unordered suited rounds by exact suit and rank", () => {
  const game = createGame({
    settings: {
      ...initialGame.settings,
      isOrdered: false,
      isSuited: true,
    },
    pulledCards: [
      { value: "C8", guess: "H8", isCorrectGuess: false },
      { value: "DJ", guess: "DJ", isCorrectGuess: false },
      { value: "S4", guess: undefined, isCorrectGuess: false },
    ],
  })

  const next = gameReducer(game, { type: "end-game" })

  assert.deepEqual(
    next.pulledCards.map((card) => card.isCorrectGuess),
    [false, true, false],
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
test("end-game in unordered unsuited mode does not over-count duplicate rank guesses", () => {
  const game = createGame({
    settings: {
      ...initialGame.settings,
      isOrdered: false,
      isSuited: false,
    },
    pulledCards: [
      { value: "C8", guess: "H8", isCorrectGuess: false },
      { value: "DJ", guess: "S8", isCorrectGuess: false },
      { value: "S4", guess: "C10", isCorrectGuess: false },
    ],
  })

  const next = gameReducer(game, { type: "end-game" })

  assert.deepEqual(
    next.pulledCards.map((card) => card.isCorrectGuess),
    [true, false, false],
  )
})
