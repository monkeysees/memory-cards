import React from "react"

import { ReactComponent as clubs } from "@/assets/images/cards/suit-clubs.svg"
import { ReactComponent as diamonds } from "@/assets/images/cards/suit-diamonds.svg"
import { ReactComponent as hearts } from "@/assets/images/cards/suit-hearts.svg"
import { ReactComponent as spades } from "@/assets/images/cards/suit-spades.svg"
import { Suit as SuitType } from "@/models/card"
import styles from "./styles.module.scss"

const nameToSvg = {
  clubs,
  diamonds,
  hearts,
  spades,
}

interface Props {
  name: SuitType
}

export default function Suit({ name }: Props) {
  const SVG = nameToSvg[name]
  return <SVG className={styles.suit} role="img" />
}
