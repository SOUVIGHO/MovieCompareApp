
import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import VerticalBar from "./VerticalBar";

//This component shows the Graph is a Grid , passed a filtered movie list using props which
//shows only those movies whose checkbox is checked and to be compared in Graph

const GraphGrid=(props)=>{
    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
        },
        paper: {
          height: 500,
          width: 1000,
        },
        control: {
          padding: theme.spacing(2),
        },
      }));
    const classes = useStyles();
    const [spacing, setSpacing] = React.useState(2);
    const filteredmovies = props.mov.filter(movie=> movie.graphenabled===true);
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={spacing}>
            <Grid item>
              <Paper className={classes.paper} >
                  <VerticalBar test={props.test} mov={filteredmovies}/>
                  </Paper>
            </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default GraphGrid;