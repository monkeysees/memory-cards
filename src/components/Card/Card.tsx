import React from "react"

import back from "@/assets/images/cards/back.svg"
import C2 from "@/assets/images/cards/C2.svg"
import C3 from "@/assets/images/cards/C3.svg"
import C4 from "@/assets/images/cards/C4.svg"
import C5 from "@/assets/images/cards/C5.svg"
import C6 from "@/assets/images/cards/C6.svg"
import C7 from "@/assets/images/cards/C7.svg"
import C8 from "@/assets/images/cards/C8.svg"
import C9 from "@/assets/images/cards/C9.svg"
import C10 from "@/assets/images/cards/C10.svg"
import CJ from "@/assets/images/cards/CJ.svg"
import CQ from "@/assets/images/cards/CQ.svg"
import CK from "@/assets/images/cards/CK.svg"
import CA from "@/assets/images/cards/CA.svg"
import D2 from "@/assets/images/cards/D2.svg"
import D3 from "@/assets/images/cards/D3.svg"
import D4 from "@/assets/images/cards/D4.svg"
import D5 from "@/assets/images/cards/D5.svg"
import D6 from "@/assets/images/cards/D6.svg"
import D7 from "@/assets/images/cards/D7.svg"
import D8 from "@/assets/images/cards/D8.svg"
import D9 from "@/assets/images/cards/D9.svg"
import D10 from "@/assets/images/cards/D10.svg"
import DJ from "@/assets/images/cards/DJ.svg"
import DQ from "@/assets/images/cards/DQ.svg"
import DK from "@/assets/images/cards/DK.svg"
import DA from "@/assets/images/cards/DA.svg"
import H2 from "@/assets/images/cards/H2.svg"
import H3 from "@/assets/images/cards/H3.svg"
import H4 from "@/assets/images/cards/H4.svg"
import H5 from "@/assets/images/cards/H5.svg"
import H6 from "@/assets/images/cards/H6.svg"
import H7 from "@/assets/images/cards/H7.svg"
import H8 from "@/assets/images/cards/H8.svg"
import H9 from "@/assets/images/cards/H9.svg"
import H10 from "@/assets/images/cards/H10.svg"
import HJ from "@/assets/images/cards/HJ.svg"
import HQ from "@/assets/images/cards/HQ.svg"
import HK from "@/assets/images/cards/HK.svg"
import HA from "@/assets/images/cards/HA.svg"
import S2 from "@/assets/images/cards/S2.svg"
import S3 from "@/assets/images/cards/S3.svg"
import S4 from "@/assets/images/cards/S4.svg"
import S5 from "@/assets/images/cards/S5.svg"
import S6 from "@/assets/images/cards/S6.svg"
import S7 from "@/assets/images/cards/S7.svg"
import S8 from "@/assets/images/cards/S8.svg"
import S9 from "@/assets/images/cards/S9.svg"
import S10 from "@/assets/images/cards/S10.svg"
import SJ from "@/assets/images/cards/SJ.svg"
import SQ from "@/assets/images/cards/SQ.svg"
import SK from "@/assets/images/cards/SK.svg"
import SA from "@/assets/images/cards/SA.svg"
import { Card as CardType } from "@/models/card"
import styles from "./Card.module.scss"

const cardToSrc = {
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
  return (
    <img
      src={cardToSrc[value || "back"]}
      alt={`Card ${value}`}
      className={`${styles.card} ${styles[`card__${size}`]} ${classes || ""}`}
    />
  )
}

CardImage.defaultProps = {
  interactive: false,
}

interface Props {
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
