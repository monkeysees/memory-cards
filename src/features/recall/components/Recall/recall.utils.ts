import Game from "@/models/game"

export function countGuessedCards(cards: Game["pulledCards"]) {
  return cards.filter((card) => card.guess !== undefined).length
}

export function isRecallComplete(guessedCardsNum: number, totalCardsNum: number) {
  return guessedCardsNum >= totalCardsNum
}
