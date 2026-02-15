/* eslint-disable react/destructuring-assignment */
import { useGameDispatch } from "@/providers/GameProvider"
import React, { useEffect, useRef, useState } from "react"
import { trackEvent } from "@/utils/analytics"

import {
  TIMEOUT_INTERVAL,
  formatSeconds,
  getNextExpectedTs,
  getSecondsPassed,
  getTimeoutDelay,
} from "./timer.utils"
import styles from "./styles.module.scss"

interface TimerCommonProps {
  classes?: string
}
interface TimerUpProps extends TimerCommonProps {
  direction: "up"
}
interface TimerDownProps extends TimerCommonProps {
  direction: "down"
  seconds: number
}

type Props = TimerUpProps | TimerDownProps

export default function Timer(props: Props) {
  const gameDispatch = useGameDispatch()
  const startTs = useRef(Date.now())
  const [timerOptions, setTimerOptions] = useState({
    expectedTs: startTs.current,
    secondsPassed: getSecondsPassed(startTs.current),
  })
  const secondsFinal =
    props.direction === "down"
      ? props.seconds - timerOptions.secondsPassed
      : timerOptions.secondsPassed
  const { minutes: minutesToRender, seconds: secondsToRender } =
    formatSeconds(secondsFinal)

  useEffect(() => {
    if (secondsFinal <= 0) {
      trackEvent("recall_started", { source: "timer_elapsed" })
      gameDispatch({ type: "start-guess" })
      return () => {}
    }

    const currentTs = Date.now()
    const timeout = window.setTimeout(
      () =>
        setTimerOptions({
          expectedTs: getNextExpectedTs(
            timerOptions.expectedTs,
            currentTs,
            TIMEOUT_INTERVAL,
          ),
          secondsPassed: getSecondsPassed(startTs.current),
        }),
      getTimeoutDelay(timerOptions.expectedTs, currentTs, TIMEOUT_INTERVAL),
    )

    return () => clearTimeout(timeout)
  }, [gameDispatch, secondsFinal, timerOptions])

  return (
    <p className={`${styles.timer} ${props.classes || ""}`}>
      <span>{minutesToRender}</span>:<span>{secondsToRender}</span>
    </p>
  )
}
