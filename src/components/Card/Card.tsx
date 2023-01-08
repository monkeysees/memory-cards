import React from "react"

import { ReactComponent as back } from "@/assets/images/cards/back.svg"
import { ReactComponent as C2 } from "@/assets/images/cards/C2.svg"
import { ReactComponent as C3 } from "@/assets/images/cards/C3.svg"
import { ReactComponent as C4 } from "@/assets/images/cards/C4.svg"
import { ReactComponent as C5 } from "@/assets/images/cards/C5.svg"
import { ReactComponent as C6 } from "@/assets/images/cards/C6.svg"
import { ReactComponent as C7 } from "@/assets/images/cards/C7.svg"
import { ReactComponent as C8 } from "@/assets/images/cards/C8.svg"
import { ReactComponent as C9 } from "@/assets/images/cards/C9.svg"
import { ReactComponent as C10 } from "@/assets/images/cards/C10.svg"
import { ReactComponent as CJ } from "@/assets/images/cards/CJ.svg"
import { ReactComponent as CQ } from "@/assets/images/cards/CQ.svg"
import { ReactComponent as CK } from "@/assets/images/cards/CK.svg"
import { ReactComponent as CA } from "@/assets/images/cards/CA.svg"
import { ReactComponent as D2 } from "@/assets/images/cards/D2.svg"
import { ReactComponent as D3 } from "@/assets/images/cards/D3.svg"
import { ReactComponent as D4 } from "@/assets/images/cards/D4.svg"
import { ReactComponent as D5 } from "@/assets/images/cards/D5.svg"
import { ReactComponent as D6 } from "@/assets/images/cards/D6.svg"
import { ReactComponent as D7 } from "@/assets/images/cards/D7.svg"
import { ReactComponent as D8 } from "@/assets/images/cards/D8.svg"
import { ReactComponent as D9 } from "@/assets/images/cards/D9.svg"
import { ReactComponent as D10 } from "@/assets/images/cards/D10.svg"
import { ReactComponent as DJ } from "@/assets/images/cards/DJ.svg"
import { ReactComponent as DQ } from "@/assets/images/cards/DQ.svg"
import { ReactComponent as DK } from "@/assets/images/cards/DK.svg"
import { ReactComponent as DA } from "@/assets/images/cards/DA.svg"
import { ReactComponent as H2 } from "@/assets/images/cards/H2.svg"
import { ReactComponent as H3 } from "@/assets/images/cards/H3.svg"
import { ReactComponent as H4 } from "@/assets/images/cards/H4.svg"
import { ReactComponent as H5 } from "@/assets/images/cards/H5.svg"
import { ReactComponent as H6 } from "@/assets/images/cards/H6.svg"
import { ReactComponent as H7 } from "@/assets/images/cards/H7.svg"
import { ReactComponent as H8 } from "@/assets/images/cards/H8.svg"
import { ReactComponent as H9 } from "@/assets/images/cards/H9.svg"
import { ReactComponent as H10 } from "@/assets/images/cards/H10.svg"
import { ReactComponent as HJ } from "@/assets/images/cards/HJ.svg"
import { ReactComponent as HQ } from "@/assets/images/cards/HQ.svg"
import { ReactComponent as HK } from "@/assets/images/cards/HK.svg"
import { ReactComponent as HA } from "@/assets/images/cards/HA.svg"
import { ReactComponent as S2 } from "@/assets/images/cards/S2.svg"
import { ReactComponent as S3 } from "@/assets/images/cards/S3.svg"
import { ReactComponent as S4 } from "@/assets/images/cards/S4.svg"
import { ReactComponent as S5 } from "@/assets/images/cards/S5.svg"
import { ReactComponent as S6 } from "@/assets/images/cards/S6.svg"
import { ReactComponent as S7 } from "@/assets/images/cards/S7.svg"
import { ReactComponent as S8 } from "@/assets/images/cards/S8.svg"
import { ReactComponent as S9 } from "@/assets/images/cards/S9.svg"
import { ReactComponent as S10 } from "@/assets/images/cards/S10.svg"
import { ReactComponent as SJ } from "@/assets/images/cards/SJ.svg"
import { ReactComponent as SQ } from "@/assets/images/cards/SQ.svg"
import { ReactComponent as SK } from "@/assets/images/cards/SK.svg"
import { ReactComponent as SA } from "@/assets/images/cards/SA.svg"
import { Card as CardType } from "@/models/card"
import styles from "./styles.module.scss"

const cardToSvg = {
  back,
  C2,
  C3,
  C4,
  C5,
  C6,
  C7,
  C8,
  C9,
  C10,
  CJ,
  CQ,
  CK,
  CA,
  D2,
  D3,
  D4,
  D5,
  D6,
  D7,
  D8,
  D9,
  D10,
  DJ,
  DQ,
  DK,
  DA,
  H2,
  H3,
  H4,
  H5,
  H6,
  H7,
  H8,
  H9,
  H10,
  HJ,
  HQ,
  HK,
  HA,
  S2,
  S3,
  S4,
  S5,
  S6,
  S7,
  S8,
  S9,
  S10,
  SJ,
  SQ,
  SK,
  SA,
}

function CardImage({ value, size, classes }: Omit<Props, "clickHandler">) {
  const SVG = cardToSvg[value || "back"]
  return (
    <SVG
      className={`
      ${styles.card}
      ${styles[`card__${size || "medium"}`]}
      ${classes || ""}`}
      role="img"
    />
  )
}

CardImage.defaultProps = {
  interactive: false,
}

export interface Props {
  value?: CardType
  size?: "small" | "medium"
  clickHandler?: React.MouseEventHandler<HTMLButtonElement>
  interactiveRef?: React.RefObject<HTMLButtonElement>
  disabled?: boolean
  classes?: string
}

export default function Card({
  value,
  size,
  clickHandler,
  interactiveRef,
  disabled,
  classes,
}: Props) {
  return clickHandler ? (
    <button
      className={styles.button}
      type="button"
      onClick={clickHandler}
      disabled={disabled}
      ref={interactiveRef}
    >
      <CardImage {...{ value, size, classes }} />
    </button>
  ) : (
    <CardImage {...{ value, size, classes }} />
  )
}

Card.defaultProps = {
  value: "back",
  size: "medium",
  clickHandler: undefined,
  interactiveRef: undefined,
  disabled: false,
  classes: "",
}
