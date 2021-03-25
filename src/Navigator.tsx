import Drawer, { DrawerProps } from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core/styles"
import { Omit } from "@material-ui/types"
import clsx from "clsx"
import React from "react"
import * as ReactRouterDom from "react-router-dom"

import { AppState } from "./app-state"
import { PathName, playgroundPathname } from "./routing"
import T from "./text"

const styles = (theme: Theme) => createStyles({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 0,
    paddingBottom: 0,
    color: "rgba(255, 255, 255, 0.7)",
    "&:hover,&:focus": {
      backgroundColor: "rgba(255, 255, 255, 0.08)",
    },
  },
  itemCategory: {
    backgroundColor: "#232f3e",
    boxShadow: "0 -1px 0 #404854 inset",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  heading: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  itemActiveItem: {
    color: "#4fc3f7",
  },
  itemPrimary: {
    fontSize: "inherit",
  },
  itemLink: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  link: {
    color: "unset",
    textDecoration: "none",
    "&:hover,&:focus": {
      textDecoration: "none",
    },
  },
})

type Props = {
  appState: AppState
}

interface NavigatorProps extends
  Omit<DrawerProps, "classes">,
  WithStyles<typeof styles>,
  Props {}

function Navigator(props: NavigatorProps) {
  const { classes, appState, ...other } = props
  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ReactRouterDom.Link to="/" className={classes.link}>
          <ListItem className={clsx(classes.heading, classes.item, classes.itemCategory)}>
            {T.app_heading}
          </ListItem>
        </ReactRouterDom.Link>
        <Section classes={classes} heading={T.nav_heading} items={[
          {
            active: appState._ === "playground",
            key: "playground",
            path: playgroundPathname,
            title: T.playground,
          },
          {
            active: appState._ === "not found",
            key: "dummy",
            path: "/",
            title: T.dummy,
          },
        ]} />
      </List>
    </Drawer>
  )
}

type Item = {
  active: boolean
  key: string
  path: PathName
  title: string
}

type CategoryProps = {
  heading: string
  items: Item[]
}

interface SectionProps extends
  Omit<DrawerProps, "classes">,
  WithStyles<typeof styles>,
  CategoryProps {}

function Section(props: SectionProps) {
  const { classes, heading, items } = props
  return (
    <React.Fragment>
      <ListItem className={classes.categoryHeader}>
        <ListItemText
          classes={{
            primary: classes.categoryHeaderPrimary,
          }}
        >
          {heading}
        </ListItemText>
      </ListItem>
      {items.map(item => (
        <ListItem
          disableGutters // Makes the link inside fill the entire width.
          key={item.key}
          button
          className={clsx(classes.item, item.active && classes.itemActiveItem)}
        >
          <ReactRouterDom.Link to={item.path} className={clsx(
            classes.item,
            classes.link,
            classes.itemLink,
            "MuiListItem-root", // Dirty hack to keep the MUI styles even though this is a non-MUI item.
          )}>
            <ListItemText classes={{ primary: classes.itemPrimary }}>
              {item.title}
            </ListItemText>
          </ReactRouterDom.Link>
        </ListItem>
      ))}
    </React.Fragment>
  )
}

export default withStyles(styles)(Navigator)
