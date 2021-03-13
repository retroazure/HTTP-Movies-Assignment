import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Link, useHistory, useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, getMovieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();

  let history = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const deleteMovie = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then((res) => {
        getMovieList();
        console.log(res);
        history.push("/");
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <button>
        <Link
          style={{ textDecoration: "none" }}
          to={`/update-movie/${movie.id}`}
        >
          <div>Update</div>
        </Link>
      </button>

      <button onClick={deleteMovie} className="delete-movie">
        <div>Delete</div>
      </button>

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
    </div>
  );
}

export default Movie;
