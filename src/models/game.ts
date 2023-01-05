import { CardFace, Suit } from "./card"

interface Game {
  cardsBySuit: { [Property in Suit]: CardFace[] }
  suits: [Suit, Suit, Suit, Suit]
  cards: CardFace[]
  shuffledCards: CardFace[]
  pulledCards: { value: CardFace; guess?: CardFace }[]
  settings: {
    isOrdered: boolean
    isSuited: boolean
    timer: { isEnabled: boolean; time: 30 | 60 | 120 | 180 | 300 | 420 | 600 } // time is in seconds
  }
  isStarted: boolean
}

export default Game
