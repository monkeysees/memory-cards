import React from "react"

import styles from "./Checkbox.module.scss"

interface Props {
  label: string
  id: string
  name: string
  isChecked: boolean
  changeHandler: React.ChangeEventHandler<HTMLInputElement>
}

export default function Checkbox({
  label,
  id,
  name,
  isChecked,
  changeHandler,
}: Props) {
  return (
    <label className={styles.control} htmlFor={id}>
      <input
        className={styles.input}
        type="checkbox"
        name={name}
        id={id}
        checked={isChecked}
        onChange={changeHandler}
      />
      {label}
    </label>
  )
}
