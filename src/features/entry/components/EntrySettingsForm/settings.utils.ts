import Game from "@/models/game"

function normalizeCardsNum(value: string) {
  return Number(value) || 1
}

function normalizeTimerTime(value: string) {
  return Number(value) as Game["settings"]["timer"]["time"]
}

export { normalizeCardsNum, normalizeTimerTime }
