/* eslint-disable react/destructuring-assignment */
import { useGameDispatch } from "@/providers/GameProvider"
import React, { useEffect, useRef, useState } from "react"

import styles from "./styles.module.scss"

const TIMEOUT_INTERVAL = 1000 // ms

function getSecondsPassed(startTs: number) {
  return Math.floor((Date.now() - startTs) / 1000)
}

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
  const minutesToRender = String(Math.floor(secondsFinal / 60)).padStart(2, "0")
  const secondsToRender = String(Math.floor(secondsFinal % 60)).padStart(2, "0")

  useEffect(() => {
    if (secondsFinal <= 0) {
      gameDispatch({ type: "start-guess" })
      return () => {}
    }

    const currentTs = Date.now()
    const drift = currentTs - timerOptions.expectedTs // timer drift
    // if `drift` is greater than `TIMEOUT_INTERVAL`,
    // something went wrong with the timer and its `expectedTs`
    // so we stop calculating `expectedTs` and consider `currentTs` as expected
    const timeout =
      drift < TIMEOUT_INTERVAL
        ? window.setTimeout(
            () =>
              setTimerOptions({
                expectedTs: timerOptions.expectedTs + TIMEOUT_INTERVAL,
                secondsPassed: getSecondsPassed(startTs.current),
              }),
            TIMEOUT_INTERVAL - drift,
          )
        : window.setTimeout(
            () =>
              setTimerOptions({
                expectedTs: currentTs + TIMEOUT_INTERVAL,
                secondsPassed: getSecondsPassed(startTs.current),
              }),
            TIMEOUT_INTERVAL,
          )

    return () => clearTimeout(timeout)
  }, [timerOptions])

  return (
    <p className={`${styles.timer} ${props.classes || ""}`}>
      <span>{minutesToRender}</span>:<span>{secondsToRender}</span>
    </p>
  )
}
