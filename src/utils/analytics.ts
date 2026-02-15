import Game from "@/models/game"

type AnalyticsEventData = Record<string, string | number | boolean | null>
const EVENT_NAMESPACE = "memory-cards"

interface UmamiClient {
  track: (eventName: string, eventData?: AnalyticsEventData) => void
}

function getUmamiClient() {
  if (typeof window === "undefined") {
    return undefined
  }

  return (window as Window & { umami?: UmamiClient }).umami
}

function trackEvent(eventName: string, eventData?: AnalyticsEventData) {
  getUmamiClient()?.track(`${EVENT_NAMESPACE}:${eventName}`, eventData)
}

function trackGameStarted({
  settings,
  source,
}: {
  settings: Game["settings"]
  source: "cta_button" | "form_submit"
}) {
  trackEvent("game_started", {
    source,
    cards_num: settings.cardsNum,
    mode_ordered: settings.isOrdered,
    mode_suited: settings.isSuited,
    timer_enabled: settings.timer.isEnabled,
    timer_seconds: settings.timer.time,
  })
}

function trackRecallStarted({
  source,
  settings,
}: {
  source: "manual" | "timer_elapsed"
  settings: Game["settings"]
}) {
  trackEvent("recall_started", {
    source,
    cards_num: settings.cardsNum,
    mode_ordered: settings.isOrdered,
    mode_suited: settings.isSuited,
    timer_enabled: settings.timer.isEnabled,
    timer_seconds: settings.timer.time,
  })
}

function trackGameCompleted({
  settings,
  correctCardsNum,
  totalCardsNum,
}: {
  settings: Game["settings"]
  correctCardsNum: number
  totalCardsNum: number
}) {
  const accuracyPct =
    totalCardsNum > 0 ? Math.round((correctCardsNum / totalCardsNum) * 100) : 0

  trackEvent("game_completed", {
    cards_num: settings.cardsNum,
    mode_ordered: settings.isOrdered,
    mode_suited: settings.isSuited,
    timer_enabled: settings.timer.isEnabled,
    timer_seconds: settings.timer.time,
    correct_cards: correctCardsNum,
    total_cards: totalCardsNum,
    accuracy_pct: accuracyPct,
  })
}

export { trackEvent, trackGameStarted, trackRecallStarted, trackGameCompleted }
