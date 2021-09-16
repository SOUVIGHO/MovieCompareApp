import "./App.css";
import React from "react";
import SelectedMoviesGrid from "./Components/UI/SelectedMoviesGrid";
import Header from "./Components/UI/Header";
import GraphGrid from "./Components/UI/GraphGrid";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { useState ,useEffect } from "react";
import { Paper } from "@material-ui/core";
import AddModal from "./Components/AddModal";
import { webcall } from "./Webcall";


function App() {
  // state for Add Modal which is responsible for showing the Add Movie UI
  const [modal, setmodal] = useState(false);
  let movielist = [];
    //initializing selectedmovielist array and state to manage the same
    const [movies, setmovies] = useState(movielist);

  useEffect(()=>{
    webcall('GET').then(function(result){
      result.map((mov)=>{
        localStorage.setItem(mov.title,mov.id);
        return mov;
      })
      setmovies(result);
    });
  },[]);



  

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
      webcall('POST',moviedetail).then(function(result){
        console.log('res: '+result.id);
        localStorage.setItem(result.title,result.id);
      });
      return [
        ...prevstate,
        {
          title: moviedetail.Title,
          poster: moviedetail.Poster,
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
        webcall('DELETE',movie);
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
      webcall('PATCH',movshow);
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
