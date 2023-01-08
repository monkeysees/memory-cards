import { CardFace, Suit } from "./card"

interface Game {
  cardsBySuit: { [Property in Suit]: CardFace[] }
  suits: [Suit, Suit, Suit, Suit]
  faces: CardFace[]
  shuffledFaces: CardFace[]
  pulledCards: {
    value: CardFace
    guess: CardFace | undefined
    isCorrectGuess: boolean
  }[]
  settings: {
    cardsNum: number
    isOrdered: boolean
    isSuited: boolean
    timer: { isEnabled: boolean; time: 30 | 60 | 120 | 180 | 300 | 420 | 600 } // time is in seconds
  }
  stage: "entry" | "memorize" | "remember" | "results"
}

export default Game
