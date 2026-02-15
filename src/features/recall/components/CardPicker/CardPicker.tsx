import React, { useEffect, useRef, useState } from "react"

import { CardFace } from "@/models/card"
import { useGame, useGameDispatch } from "@/providers/GameProvider"
import { Card, Suit } from "@/components"
import { cardFaceToAccessibleText } from "@/components/Card/cardA11y"
import {
  cardPickerDialogA11yProps,
  getFocusTrapTarget,
} from "./cardPickerA11y"
import styles from "./styles.module.scss"

export interface Props {
  faceToGuess: CardFace
  cardBottomPx: number
  onClose: () => void
}

export default function CardPicker({
  faceToGuess,
  cardBottomPx,
  onClose,
}: Props) {
  const game = useGame()
  const gameDispatch = useGameDispatch()

  const guessedCards = new Set(
    game.pulledCards.map((c) => c.guess).filter((g) => Boolean(g)),
  )
  const [selectedSuit, setSelectedSuit] = useState(game.suits[0])
  const wrapperRef = useRef<HTMLElement>(null)
  const suitsRef = useRef<HTMLDivElement>(null)

  function trapTabFocus(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key !== "Tab") {
      return
    }

    const focusableElements = Array.from(
      wrapperRef.current?.querySelectorAll<HTMLButtonElement>(
        'button:not([disabled])',
      ) || [],
    )

    if (!focusableElements.length) {
      return
    }

    const activeElement = document.activeElement

    if (
      !activeElement
      || !focusableElements.includes(activeElement as HTMLButtonElement)
    ) {
      event.preventDefault()
      const defaultFocusElement = event.shiftKey
        ? focusableElements[focusableElements.length - 1]
        : focusableElements[0]
      defaultFocusElement.focus()
      return
    }

    const target = getFocusTrapTarget({
      eventKey: event.key,
      shiftKey: event.shiftKey,
      firstElement: focusableElements[0],
      lastElement: focusableElements[focusableElements.length - 1],
      activeElement,
    })

    if (target) {
      const targetElement = target as HTMLElement
      event.preventDefault()
      targetElement.focus()
    }
  }

  useEffect(() => {
    setSelectedSuit(game.suits[0])

    const suitsContainer = suitsRef?.current

    type ChildHTMLButton = HTMLButtonElement | null | undefined
    const firstSuit: ChildHTMLButton =
      suitsContainer?.firstElementChild as ChildHTMLButton

    firstSuit?.focus()
  }, [faceToGuess])

  return (
    <section
      ref={wrapperRef}
      className={styles.wrapper}
      role={cardPickerDialogA11yProps.role}
      aria-modal={cardPickerDialogA11yProps.ariaModal}
      aria-label={cardPickerDialogA11yProps.ariaLabel}
      onKeyDown={trapTabFocus}
      style={{
        top: `
        calc(${(typeof document !== "undefined" ? document.documentElement.scrollTop : 0) + cardBottomPx}px + 1.25rem)`,
      }}
    >
      <button
        className={styles.closeButton}
        aria-label="Close card picker dialog"
        onClick={() => onClose()}
      />

      <div className={styles.suits} ref={suitsRef}>
        {game.suits.map((s) => (
          <button
            key={s}
            aria-label={`Choose ${s} suit cards`}
            className={`${styles.suitButton} ${
              s === selectedSuit ? styles.suitButton__selected : ""
            }`}
            onClick={() => setSelectedSuit(s)}
          >
            <Suit name={s} />
          </button>
        ))}
      </div>

      {selectedSuit ? (
        <div className={styles.cards}>
          {game.cardsBySuit[selectedSuit].map((face) => (
            <Card
              key={face}
              value={face}
              size="small"
              ariaLabel={`Guess ${cardFaceToAccessibleText(face)}`}
              clickHandler={() =>
                gameDispatch({
                  type: "guess-card",
                  card: faceToGuess,
                  guess: face,
                })
              }
              disabled={guessedCards.has(face)}
            />
          ))}
        </div>
      ) : null}
    </section>
  )
}
