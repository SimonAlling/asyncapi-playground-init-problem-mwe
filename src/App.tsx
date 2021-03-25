import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

import Layout from "./Layout"
import { playgroundPathname } from "./routing"

export class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route key="playground" path={playgroundPathname}>
            <Layout appState={{ _: "playground" }} />
          </Route>
          <Route key="">
            <Layout appState={{ _: "not found" }} />
          </Route>
        </Switch>
      </Router>
    )
  }
}
