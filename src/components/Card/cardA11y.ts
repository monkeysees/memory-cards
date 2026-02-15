import { Card as CardType } from "@/models/card"

export function cardFaceToAccessibleText(value: CardType) {
  const suitName = {
    C: "clubs",
    D: "diamonds",
    H: "hearts",
    S: "spades",
  }[value[0] as "C" | "D" | "H" | "S"]

  const rankName = {
    J: "jack",
    Q: "queen",
    K: "king",
    A: "ace",
  }[value.slice(1)]

  return `${rankName || value.slice(1)} of ${suitName}`
}

export function getCardAriaLabel(value: CardType | undefined) {
  if (!value || value === "back") {
    return "Select facedown card"
  }

  return `Select ${cardFaceToAccessibleText(value)}`
}
