import assert from "node:assert/strict"
import test from "node:test"

import {
  cardFaceToAccessibleText,
  getCardAriaLabel,
} from "../../.tmp-test/components/Card/cardA11y.js"
import {
  cardPickerDialogA11yProps,
  getFocusTrapTarget,
} from "../../.tmp-test/features/recall/components/CardPicker/cardPickerA11y.js"

test("getCardAriaLabel returns descriptive labels", () => {
  assert.equal(getCardAriaLabel("HQ"), "Select queen of hearts")
  assert.equal(getCardAriaLabel("S10"), "Select 10 of spades")
  assert.equal(getCardAriaLabel("back"), "Select facedown card")
})

test("cardFaceToAccessibleText converts card shorthand to readable labels", () => {
  assert.equal(cardFaceToAccessibleText("CA"), "ace of clubs")
  assert.equal(cardFaceToAccessibleText("D10"), "10 of diamonds")
})

test("card picker dialog props define a modal dialog", () => {
  assert.deepEqual(cardPickerDialogA11yProps, {
    role: "dialog",
    ariaModal: true,
    ariaLabel: "Card picker",
  })
})

test("focus trap wraps from first focusable element to last with shift-tab", () => {
  const first = { id: "first" }
  const last = { id: "last" }

  const target = getFocusTrapTarget({
    eventKey: "Tab",
    shiftKey: true,
    firstElement: first,
    lastElement: last,
    activeElement: first,
  })

  assert.equal(target, last)
})

test("focus trap wraps from last focusable element to first on tab", () => {
  const first = { id: "first" }
  const last = { id: "last" }

  const target = getFocusTrapTarget({
    eventKey: "Tab",
    shiftKey: false,
    firstElement: first,
    lastElement: last,
    activeElement: last,
  })

  assert.equal(target, first)
})

test("focus trap sets a default target when there is no active element", () => {
  const first = { id: "first" }
  const last = { id: "last" }

  const target = getFocusTrapTarget({
    eventKey: "Tab",
    shiftKey: false,
    firstElement: first,
    lastElement: last,
    activeElement: null,
  })

  assert.equal(target, first)

  const reverseTarget = getFocusTrapTarget({
    eventKey: "Tab",
    shiftKey: true,
    firstElement: first,
    lastElement: last,
    activeElement: null,
  })

  assert.equal(reverseTarget, last)
})
