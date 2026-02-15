import Game from "@/models/game"

function normalizeCardsNum(value: string) {
  const parsedValue = Number(value) || 1
  return Math.max(1, Math.min(52, parsedValue))
}

function normalizeTimerTime(value: string) {
  return Number(value) as Game["settings"]["timer"]["time"]
}

export { normalizeCardsNum, normalizeTimerTime }
