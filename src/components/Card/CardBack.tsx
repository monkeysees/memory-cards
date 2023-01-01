import React from "react"

import cardBack from "@/assets/images/cards/back.svg"
import styles from "./Card.module.scss"

export default function CardBack() {
  return <img src={cardBack} alt="Card back" className={styles.card} />
}
