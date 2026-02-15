interface FocusTrapInput {
  eventKey: string
  shiftKey: boolean
  firstElement: Element | null
  lastElement: Element | null
  activeElement: Element | null
}

export const cardPickerDialogA11yProps = {
  role: "dialog",
  ariaModal: true,
  ariaLabel: "Card picker",
}

export function getFocusTrapTarget({
  eventKey,
  shiftKey,
  firstElement,
  lastElement,
  activeElement,
}: FocusTrapInput) {
  if (eventKey !== "Tab" || !firstElement || !lastElement) {
    return null
  }

  if (!activeElement) {
    return shiftKey ? lastElement : firstElement
  }

  if (shiftKey && activeElement === firstElement) {
    return lastElement
  }

  if (!shiftKey && activeElement === lastElement) {
    return firstElement
  }

  return null
}
