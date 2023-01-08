import React from "react"

import styles from "./styles.module.scss"

interface Props {
  label: string
  id: string
  name: string
  value: number
  min?: number
  max?: number
  changeHandler: React.ChangeEventHandler<HTMLInputElement>
}

export default function NumberInput({
  label,
  id,
  name,
  value,
  min,
  max,
  changeHandler,
}: Props) {
  return (
    <div className={styles.control}>
      <label htmlFor={id}>{label}</label>
      <input
        className={styles.input}
        id={id}
        name={name}
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={changeHandler}
      />
    </div>
  )
}

NumberInput.defaultProps = {
  min: undefined,
  max: undefined,
}
