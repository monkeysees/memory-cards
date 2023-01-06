import React from "react"

import Game from "@/models/game"
import { useGame, useGameDispatch } from "@/providers/GameProvider"
import { Checkbox, Select } from "@/components"
import styles from "./styles.module.scss"

export default function EntrySettingsForm() {
  const game = useGame()
  const gameDispatch = useGameDispatch()

  return (
    <form className={styles.wrapper}>
      <Checkbox
        label="Suit matters?"
        id="checkbox_suited"
        name="suited"
        isChecked={game.settings.isSuited}
        changeHandler={(e) =>
          gameDispatch({
            type: "update-settings",
            settings: {
              isSuited: e.target.checked,
            },
          })
        }
      />

      <Checkbox
        label="Order matters?"
        id="checkbox_ordered"
        name="ordered"
        isChecked={game.settings.isOrdered}
        changeHandler={(e) =>
          gameDispatch({
            type: "update-settings",
            settings: {
              isOrdered: e.target.checked,
            },
          })
        }
      />

      <fieldset>
        <Checkbox
          label="Enable timer?"
          id="checkbox_enable-timer"
          name="enable-timer"
          isChecked={game.settings.timer.isEnabled}
          changeHandler={(e) =>
            gameDispatch({
              type: "update-settings",
              settings: {
                timer: { isEnabled: e.target.checked },
              },
            })
          }
        />

        <Select
          label="Timer duration"
          id="select_timer-time"
          name="timer-time"
          options={[
            ["30", "30 sec"],
            ["60", "1 min"],
            ["120", "2 min"],
            ["180", "3 min"],
            ["300", "5 min"],
            ["420", "7 min"],
            ["600", "10 min"],
          ]}
          selectedOption={String(game.settings.timer.time)}
          disabled={!game.settings.timer.isEnabled}
          changeHandler={(e) =>
            gameDispatch({
              type: "update-settings",
              settings: {
                timer: {
                  time: Number(
                    e.target.value,
                  ) as Game["settings"]["timer"]["time"],
                },
              },
            })
          }
        />
      </fieldset>
    </form>
  )
}
