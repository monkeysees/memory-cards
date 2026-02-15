import assert from "node:assert/strict"
import test from "node:test"

import {
  countGuessedCards,
  isRecallComplete,
} from "../../.tmp-test/features/recall/components/Recall/recall.utils.js"

test("countGuessedCards returns number of cards with guesses", () => {
  const cards = [
    { value: "A ♠", guess: "A ♠", isCorrectGuess: false },
    { value: "K ♠", guess: undefined, isCorrectGuess: false },
    { value: "Q ♠", guess: "Q ♠", isCorrectGuess: false },
  ]

  assert.equal(countGuessedCards(cards), 2)
})

test("isRecallComplete returns true when guessed cards equals total cards", () => {
  assert.equal(isRecallComplete(5, 5), true)
})

test("isRecallComplete returns true when guessed cards is greater than total cards", () => {
  assert.equal(isRecallComplete(6, 5), true)
})

test("isRecallComplete returns false when guessed cards is below total cards", () => {
  assert.equal(isRecallComplete(4, 5), false)
})
