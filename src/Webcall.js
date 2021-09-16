export const webcall = (method, moviedetail = []) => {
  if (method === "POST") {
    let id=-1;
    const response = fetch("http://localhost:3000/movies", {
      method: method,
      body: JSON.stringify({
        title: moviedetail.Title,
        poster: moviedetail.Poster,
        rating: moviedetail.imdbRating,
        graphenabled: false,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then(function (data) {
        console.log(data);
        return data.data;

      })
      .catch(function (error) {
        console.log("Something went wrong.", error);
      });
      return response;
  } 
  if (method === "GET")  {
    //console.log("Inside Else");
    const response = fetch("http://localhost:3000/movies")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.data);
        return data.data;
      });
      return response;
  }
  if (method === "PATCH") {
    const response = fetch("http://localhost:3000/movies/"+localStorage.getItem(moviedetail.title), {
      method: 'PATCH',
      body: JSON.stringify({
        title: moviedetail.Title,
        poster: moviedetail.Poster,
        rating: moviedetail.imdbRating,
        graphenabled: false,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        'Access-Control-Allow-Origin': 'http://localhost:3001',
        'Access-Control-Allow-Credentials':'true'
      },
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then(function (data) {
        console.log(data);
      })
      .catch(function (error) {
        console.log("Something went wrong.", error);
      });
  }
  if (method === "DELETE") {
    const response = fetch("http://localhost:3000/movies/"+localStorage.getItem(moviedetail.title), {
      method: 'DELETE',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        'Access-Control-Allow-Origin': 'http://localhost:3001',
        'Access-Control-Allow-Credentials':'true'
      },
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then(function (data) {
        console.log(data);
      })
      .catch(function (error) {
        console.log("Something went wrong.", error);
      });
  }
};
