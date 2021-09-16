import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { alpha, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Backdrop from "@material-ui/core/Backdrop";
import { Paper } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import SimpleCard from "./Movdetails";
import AddToQueueIcon from "@material-ui/icons/AddToQueue";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const AddModal = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [moviename, setmoviename] = useState("");
  const [moviedetail, setmoviedetail] = useState([]);
  const [error, seterror] = useState(false);
  const [status, setstatus] = useState(false);
  console.log(open);
  const handleClose = () => {
    setOpen(false);
    props.onclose();
  };
  /*const handleToggle = () => {
    setOpen(!open);
  };
  */
  function searchHandler() {
    //console.log('searching');
    fetch("http://localhost:3000/searchmovies/" + moviename)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.data.Response === "False") {
          seterror(true);
        } else {
          setstatus(true);
        }

        setmoviedetail(data.data);
        console.log(data.data);
      });
  }
  const textchangehandler = (event) => {
    setmoviename(event.target.value);
  };
  const addMovieHandler = () => {
    let rating = +moviedetail.imdbRating;
    console.log(rating);
    if (
      typeof moviedetail.imdbRating === "undefined" ||
      isNaN(rating) ||
      rating < 1
    ) {
      seterror(true);
      setmoviename("");
      setmoviedetail([]);
      setstatus(false);
    } else {
      props.addMovie(moviedetail);
    }
  };

  const handleerrormodal = () => {
    seterror(false);
    setmoviename("");
  };

  return (
    <Backdrop className={classes.backdrop} open={open}>
      <CssBaseline />
      <Container fixed>
        <Typography
          component="div"
          style={{
            backgroundColor: "#cfe8fc",
            height: "50vh",
            padding: "20px",
          }}
        >
          <div>
            <TextField
              id="outlined-basic"
              label="Search by Name"
              variant="outlined"
              value={moviename}
              onChange={textchangehandler}
              autoComplete="off"
              size="small"
            />
            <SearchIcon
              fontSize="large"
              style={{ margin: "10px" }}
              onClick={searchHandler}
            />
            <DeleteForeverIcon
              fontSize="large"
              style={{ margin: "10px" }}
              onClick={handleClose}
            />
          </div>
          {status && <SimpleCard mov={moviedetail} />}
          {status && (
            <div>
              <AddToQueueIcon
                fontSize="large"
                style={{ margin: "20px" }}
                onClick={addMovieHandler}
              />
              <CancelPresentationIcon
                fontSize="large"
                style={{ margin: "20px" }}
                onClick={handleClose}
              />
            </div>
          )}
        </Typography>
      </Container>
      {error && (
        <Backdrop
          className={classes.backdrop}
          open={error}
          onClick={handleerrormodal}
        >
          <CssBaseline />
          <Container fixed>
            <Paper>
              {" "}
              Invalid value ! Please ensure movie exists and has rating
              associated
            </Paper>
          </Container>
        </Backdrop>
      )}
    </Backdrop>
  );
};

export default AddModal;
