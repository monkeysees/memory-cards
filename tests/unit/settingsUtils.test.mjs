import assert from "node:assert/strict"
import test from "node:test"

import {
  normalizeCardsNum,
  normalizeTimerTime,
} from "../../.tmp-test/features/entry/components/EntrySettingsForm/settings.utils.js"

test("normalizeCardsNum keeps valid positive card counts", () => {
  assert.equal(normalizeCardsNum("1"), 1)
  assert.equal(normalizeCardsNum("25"), 25)
  assert.equal(normalizeCardsNum("52"), 52)
})

test("normalizeCardsNum falls back to 1 for empty or zero-like input", () => {
  assert.equal(normalizeCardsNum(""), 1)
  assert.equal(normalizeCardsNum("0"), 1)
  assert.equal(normalizeCardsNum("not-a-number"), 1)
})

test("normalizeTimerTime keeps known timer presets as numbers", () => {
  assert.equal(normalizeTimerTime("30"), 30)
  assert.equal(normalizeTimerTime("60"), 60)
  assert.equal(normalizeTimerTime("600"), 600)
})
