import React from "react"

import { Card as CardType } from "@/models/card"
import styles from "./styles.module.scss"
import { getCardAriaLabel, getCardImageAlt } from "./cardA11y"

const cardMarkupModules = import.meta.glob("../../assets/images/cards/*.svg", {
  eager: true,
  as: "raw",
}) as Record<string, string>

const cardToSvgMarkup = Object.entries(cardMarkupModules).reduce<
  Partial<Record<CardType, string>>
>((cards, [path, markup]) => {
  const fileName = path.split("/").pop()
  if (!fileName) {
    return cards
  }

  const face = fileName.replace(".svg", "") as CardType
  return {
    ...cards,
    [face]: markup,
  }
}, {})

interface CardImageProps {
  value?: CardType
  size?: "small" | "medium"
  classes?: string
  isDecorative: boolean
}

function CardImage({ value, size, classes, isDecorative }: CardImageProps) {
  const cardMarkup = cardToSvgMarkup[value || "back"] || ""

  return (
    <span
      className={`
      ${styles.card}
      ${styles[`card__${size || "medium"}`]}
      ${classes || ""}`}
      role={isDecorative ? undefined : "img"}
      aria-label={isDecorative ? undefined : getCardImageAlt(value)}
    >
      <span
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: cardMarkup }}
      />
    </span>
  )
}

CardImage.defaultProps = {
  value: "back",
  size: "medium",
  classes: "",
}

export interface Props {
  value?: CardType
  size?: "small" | "medium"
  clickHandler?: React.MouseEventHandler<HTMLButtonElement>
  interactiveRef?: React.RefObject<HTMLButtonElement>
  disabled?: boolean
  classes?: string
  ariaLabel?: string
}

export default function Card({
  value,
  size,
  clickHandler,
  interactiveRef,
  disabled,
  classes,
  ariaLabel,
}: Props) {
  return clickHandler ? (
    <button
      className={styles.button}
      type="button"
      onClick={clickHandler}
      disabled={disabled}
      ref={interactiveRef}
      aria-label={ariaLabel || getCardAriaLabel(value)}
    >
      <CardImage {...{ value, size, classes, isDecorative: true }} />
    </button>
  ) : (
    <CardImage {...{ value, size, classes, isDecorative: false }} />
  )
}

Card.defaultProps = {
  value: "back",
  size: "medium",
  clickHandler: undefined,
  interactiveRef: undefined,
  disabled: false,
  classes: "",
  ariaLabel: undefined,
}
