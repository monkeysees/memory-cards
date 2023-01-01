import React from "react"

import styles from "./Button.module.scss"

interface Props {
  label?: string
  type?: "button" | "submit" | "reset"
  isDisabled?: boolean
  clickHandler?: React.MouseEventHandler<HTMLButtonElement>
}

export default function Button({
  label,
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
      {label}
    </button>
  )
}

Button.defaultProps = {
  label: "",
  type: "button",
  isDisabled: false,
  clickHandler: () => {},
}
