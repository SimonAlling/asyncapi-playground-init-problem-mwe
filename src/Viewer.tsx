import Typography from "@material-ui/core/Typography"
import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core/styles"
import React from "react"

import { AppState } from "./app-state"
import Playground from "./playground/Playground"
import T from "./text"

const styles = (theme: Theme) => (
  createStyles({
    text: {
      margin: theme.spacing(2),
    },
  })
)

type Props = {
  appState: AppState
}

interface ViewerProps extends
  WithStyles<typeof styles>,
  Props {}

class Viewer extends React.Component<ViewerProps> {
  render() {
    const { classes, appState } = this.props
    return (
      this.content(appState, classes)
    )
  }

  private content(appState: AppState, classes: WithStyles<typeof styles>["classes"]): JSX.Element {
    switch (appState._) {
      case "not found":
        return this.textContent(T.not_found, classes)
      case "playground":
        return <Playground />
    }
  }

  private textContent(text: string, classes: WithStyles<typeof styles>["classes"]): JSX.Element {
    return <Typography className={classes.text}>{text}</Typography>
  }
}

export default withStyles(styles)(Viewer)
