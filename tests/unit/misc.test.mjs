import assert from "node:assert/strict"
import test from "node:test"

import { assertUnreachable } from "../../.tmp-test/utils/misc.js"

test("assertUnreachable throws with a helpful message", () => {
  assert.throws(
    () => assertUnreachable("invalid-stage"),
    /Should not get here\. Provided value: invalid-stage/,
  )
})
