import React, { ReactNode } from "react"

import styles from "./Button.module.scss"

interface Props {
  children?: ReactNode
  type?: "button" | "submit" | "reset"
  isDisabled?: boolean
  clickHandler?: React.MouseEventHandler<HTMLButtonElement>
}

export default function Button({
  children,
  type,
  isDisabled,
  clickHandler,
}: Props) {
  return (
    <button
      type={type}
      onClick={clickHandler}
      className={styles.button}
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
}
