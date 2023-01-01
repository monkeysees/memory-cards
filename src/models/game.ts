import { CardFace } from "./card"

interface Game {
  cards: CardFace[]
  pulledCards: CardFace[]
  settings: {
    isOrdered: boolean
    isSuited: boolean
    timer: { isEnabled: boolean; time: 0.5 | 1 | 2 | 3 | 5 | 7 | 10 }
  }
}

export default Game
