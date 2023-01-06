import React from "react"
import { capitalize } from "lodash"

import clubs from "@/assets/images/cards/suit-clubs.svg"
import diamonds from "@/assets/images/cards/suit-diamonds.svg"
import hearts from "@/assets/images/cards/suit-hearts.svg"
import spades from "@/assets/images/cards/suit-spades.svg"
import { Suit as SuitType } from "@/models/card"
import styles from "./styles.module.scss"

const nameToSrc = {
  clubs,
  diamonds,
  hearts,
  spades,
}

interface Props {
  name: SuitType
}

export default function Suit({ name }: Props) {
  return (
    <img
      className={styles.suit}
      src={nameToSrc[name]}
      alt={`${capitalize(name)} suit`}
    />
  )
}
