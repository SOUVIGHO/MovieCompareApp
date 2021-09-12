//Using Material UI for a Header without search bar

import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

const Header = () => {
  const classes=useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4" className={classes.title}>
          MovieComparator
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
