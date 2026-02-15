const TIMEOUT_INTERVAL = 1000 // ms

function getSecondsPassed(startTs: number, nowTs = Date.now()) {
  return Math.floor((nowTs - startTs) / 1000)
}

function getTimeoutDelay(
  expectedTs: number,
  currentTs = Date.now(),
  timeoutInterval = TIMEOUT_INTERVAL,
) {
  const drift = currentTs - expectedTs // timer drift
  return drift < timeoutInterval ? timeoutInterval - drift : timeoutInterval
}

function getNextExpectedTs(
  expectedTs: number,
  currentTs = Date.now(),
  timeoutInterval = TIMEOUT_INTERVAL,
) {
  const drift = currentTs - expectedTs // timer drift
  return drift < timeoutInterval
    ? expectedTs + timeoutInterval
    : currentTs + timeoutInterval
}

function formatSeconds(secondsTotal: number) {
  const minutes = String(Math.floor(secondsTotal / 60)).padStart(2, "0")
  const seconds = String(Math.floor(secondsTotal % 60)).padStart(2, "0")

  return { minutes, seconds }
}

export {
  TIMEOUT_INTERVAL,
  getSecondsPassed,
  getTimeoutDelay,
  getNextExpectedTs,
  formatSeconds,
}
