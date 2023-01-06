import React from "react"

import styles from "./styles.module.scss"

interface Props {
  label: string
  id: string
  name: string
  options: Array<[string, string]>
  selectedOption: string
  disabled: boolean
  changeHandler: React.ChangeEventHandler<HTMLSelectElement>
}

export default function Select({
  label,
  id,
  name,
  options,
  selectedOption,
  disabled,
  changeHandler,
}: Props) {
  return (
    <div
      className={`
      ${styles.control}
      ${disabled ? styles.control__disabled : ""}
      `}
    >
      <label htmlFor={id}>{label}</label>
      <div className={styles.wrapper}>
        <select
          className={styles.select}
          id={id}
          name={name}
          value={selectedOption}
          disabled={disabled}
          onChange={changeHandler}
        >
          {options.map(([value, valueLabel]) => (
            <option value={value} key={value}>
              {valueLabel}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
