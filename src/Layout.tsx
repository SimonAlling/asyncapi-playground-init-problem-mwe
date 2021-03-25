import CssBaseline from "@material-ui/core/CssBaseline"
import Hidden from "@material-ui/core/Hidden"
import {
  createMuiTheme,
  createStyles,
  ThemeProvider,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles"
import React from "react"

import Navigator from "./Navigator"
import Viewer from "./Viewer"
import { AppState } from "./app-state"

const theme = createMuiTheme({})

const themeWithOverrides = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: "#18202c",
      },
    },
    MuiButton: {
      label: {
        textTransform: "none",
      },
      contained: {
        boxShadow: "none",
        "&:active": {
          boxShadow: "none",
        },
      },
    },
  },
} as const

const drawerWidth = 256

const styles = createStyles({
  root: {
    display: "flex",
    minHeight: "100vh",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
})

interface LayoutProps extends WithStyles<typeof styles>, Props {}

type Props = {
  appState: AppState
}

function Layout(props: LayoutProps) {
  const { classes, appState } = props

  return (
    <ThemeProvider theme={themeWithOverrides}>
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          <Hidden implementation="css">
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              appState={appState}
            />
          </Hidden>
        </nav>
        <Viewer appState={appState} />
      </div>
    </ThemeProvider>
  )
}

export default withStyles(styles)(Layout)
