import React from "react"
import ReactDOM from "react-dom"
import SafeProvider from "@gnosis.pm/safe-apps-react-sdk"
import "./index.css"
import App from "./App"

ReactDOM.render(
  <React.StrictMode>
    <SafeProvider
      loader={
        <>
          <p>Waiting for Safe...</p>
        </>
      }
    >
      <App />
    </SafeProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
