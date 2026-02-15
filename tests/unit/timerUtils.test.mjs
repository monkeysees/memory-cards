import assert from "node:assert/strict"
import test from "node:test"

import {
  TIMEOUT_INTERVAL,
  formatSeconds,
  getNextExpectedTs,
  getSecondsPassed,
  getTimeoutDelay,
} from "../../.tmp-test/features/memorize/components/Timer/timer.utils.js"

test("TIMEOUT_INTERVAL remains one second", () => {
  assert.equal(TIMEOUT_INTERVAL, 1000)
})

test("getSecondsPassed floors elapsed seconds", () => {
  assert.equal(getSecondsPassed(1_000, 1_999), 0)
  assert.equal(getSecondsPassed(1_000, 2_000), 1)
  assert.equal(getSecondsPassed(1_000, 3_499), 2)
})

test("getTimeoutDelay compensates for timer drift under interval", () => {
  assert.equal(getTimeoutDelay(10_000, 10_250, 1_000), 750)
})

test("getTimeoutDelay resets to interval when drift exceeds interval", () => {
  assert.equal(getTimeoutDelay(10_000, 11_600, 1_000), 1_000)
})

test("getNextExpectedTs keeps rolling cadence when drift is small", () => {
  assert.equal(getNextExpectedTs(20_000, 20_250, 1_000), 21_000)
})

test("getNextExpectedTs resets cadence when drift is large", () => {
  assert.equal(getNextExpectedTs(20_000, 21_600, 1_000), 22_600)
})

test("formatSeconds renders zero-padded minute and second strings", () => {
  assert.deepEqual(formatSeconds(0), { minutes: "00", seconds: "00" })
  assert.deepEqual(formatSeconds(65), { minutes: "01", seconds: "05" })
  assert.deepEqual(formatSeconds(600), { minutes: "10", seconds: "00" })
})
