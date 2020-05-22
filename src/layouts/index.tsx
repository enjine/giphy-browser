import React, { ReactNode } from "react";


import {
  createMuiTheme,
  withStyles,
  createStyles,
  Theme,
  WithStyles,
  StyleRules
} from "@material-ui/core/styles";

import {
  MuiThemeProvider,
  CssBaseline,
} from "@material-ui/core";

import blue from "@material-ui/core/colors/blue";


const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: {
      main: "#fff"
    },
    background: {
      default: "#fff"
    }
  }
});

const styles: (theme: Theme) => StyleRules<string> = theme =>
  createStyles({
    root: {

    },
    app: {
      textAlign: "center"
    }
  });

type Props = { children: ReactNode }
type AppProps = {} & WithStyles<typeof styles> & Props;

const App = ({ classes, ...props }: AppProps) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <div className={classes.app}>
      {props.children}
    </div>
  </MuiThemeProvider>
);

export default {
  Main: withStyles(styles)(App)
}
