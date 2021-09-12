import "./App.css";
import React, { Fragment } from "react";
import SelectedMoviesGrid from "./Components/UI/SelectedMoviesGrid";
import Header from "./Components/UI/Header";
import GraphGrid from "./Components/UI/GraphGrid";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { useState } from "react";
import { Paper } from "@material-ui/core";
import AddModal from "./Components/AddModal";

function App() {
  // state for Add Modal which is responsible for showing the Add Movie UI
  const [modal, setmodal] = useState(false);

  //initializing selectedmovielist array and state to manage the same
  const movielist = [];
  const [movies, setmovies] = useState(movielist);

  //addHandler to toggle the Add modal UI state
  const addHandler = () => {
    console.log("addhandler  " + modal);
    setmodal((state) => {
      return !state;
    });
  };

  //removeHandler to cancel the add ui and backdrop
  const removeHandler = () => {
    console.log("addhandler  " + modal);
    setmodal((state) => {
      return !state;
    });
  };

  //addhandlers actually adds selected movie in the movielist array and sets the state
  const addHandlers = (moviedetail) => {
    console.log(moviedetail);
    setmovies((prevstate) => {
      return [
        ...prevstate,
        {
          title: moviedetail.Title,
          imgurl: moviedetail.Poster,
          rating: moviedetail.imdbRating,
          graphenabled: false,
        },
      ];
    });
    setmodal((state) => {
      return !state;
    });
  };

  //remove removed movie from selected movielist
  const remove = (movie) => {
    setmovies((prevstate) => {
      const index = prevstate.indexOf(movie);
      console.log("index:" + index);
      if (index > -1) {
        let newstate = prevstate.filter((mov) => mov !== movie);
        return newstate;
      } else {
        return prevstate;
      }
    });
  };

  //handleshow adds/removes the movie to the Graph
  const hanldeShow = (movshow) => {
    setmovies((prevstate) => {
      let newst = prevstate.map((mov) =>
        mov.title === movshow.title ? movshow : mov
      );
      return newst;
    });
  };
  return (
    <div className="App">
      <Header />
      <GraphGrid mov={movies} />
      <Paper style={{ margin: "10px", padding: "10px" }}>
        <AddCircleOutlineIcon fontSize="large" onClick={addHandler} />
      </Paper>
      <SelectedMoviesGrid mov={movies} remove={remove} show={hanldeShow} />
      {modal && <AddModal onclose={removeHandler} addMovie={addHandlers} />}
    </div>
  );
}

export default App;
