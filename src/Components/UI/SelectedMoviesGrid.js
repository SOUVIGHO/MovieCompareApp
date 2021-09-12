import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Card from "./Cards";
import Cards from "./Cards";

//This component is to show the selected movies in a horizontal frame , It lifts the state by passing function using props
//
const SelectedMoviesGrid = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 200,
      width: 200,
    },
    control: {
      padding: theme.spacing(2),
    },
  }));
  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(2);

  //The above code has been taken fro Material UI doc, Remove Handler removes movies from selected section and Grapgh
  //Handle show is responsible to uplift the state of the flag which determines whether to show in graph or not
  const removeHandler = (movie) => {
    props.remove(movie);
  };
  const handleShow = (movieselect) => {
    props.show(movieselect);
  };
  return (
    <div
      style={{ "overflow-y": "hidden", "overflow-x": "auto", height: "200px" }}
    >
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={spacing}>
            {props.mov.map((movie) => (
              <Grid key={props.mov.indexOf(movie)} item>
                <Paper className={classes.paper}>
                  <Cards
                    mov={movie}
                    list={true}
                    remove={removeHandler}
                    showgraph={handleShow}
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default SelectedMoviesGrid;
