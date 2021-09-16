import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Cards from "./UI/Cards";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const movie = {
    title: props.mov.Title,
    poster:props.mov.Poster,
    rating: props.mov.imdbRating,
  };
  console.log(props.mov.Title);
  return (
    <Card className={classes.root}>
      <CardContent>
        <div>
          <Cards mov={movie} />
        </div>
        <div>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {props.mov.Title}
          </Typography>
          <Typography variant="h5" component="h2">
          {props.mov.imdbRating}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
