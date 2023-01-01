import React from "react"
import ReactDOM from "react-dom/client"

import { GameProvider } from "@/providers/GameProvider"
import App from "@/App"
import "@/assets/styles/_base.scss"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GameProvider>
      <App />
    </GameProvider>
  </React.StrictMode>,
)
