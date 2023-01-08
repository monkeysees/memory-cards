import React, { ReactNode } from "react"

import styles from "./styles.module.scss"

interface Props {
  children?: ReactNode
  type?: "button" | "submit" | "reset"
  isDisabled?: boolean
  clickHandler?: React.MouseEventHandler<HTMLButtonElement>
  classes?: string
}

export default function Button({
  children,
  type,
  isDisabled,
  clickHandler,
  classes,
}: Props) {
  return (
    <button
      type={type}
      onClick={clickHandler}
      className={`${styles.button} ${classes || ""}`}
      disabled={isDisabled}
    >
      {children}
    </button>
  )
}

Button.defaultProps = {
  children: null,
  type: "button",
  isDisabled: false,
  clickHandler: () => {},
  classes: undefined,
}
