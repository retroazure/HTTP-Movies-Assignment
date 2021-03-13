import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieList from "../Movies/MovieList";

export const UpdateForm = ({ movieList, getMovieList }) => {
  let params = useParams();

  const [formInput, setFormInput] = useState({
    id: params.id,
    title: "",
    director: "",
    metascore: "",
    stars: "",
  });

  const history = useHistory();

  const getCurrentMovie = () => {
    return movieList.filter((item) => Number(item.id) === Number(params.id))[0];
  };

  useEffect(() => {
    if (movieList[0] !== undefined) {
      console.log("movieList id defined!");

      let currentMovie = getCurrentMovie();

      console.log("Current movie stars:", currentMovie.stats);

      setFormInput({
        ...formInput,
        stars: currentMovie.stars.toString(),
      });
    } else {
      console.log("movieList is not defined");
    }
  }, [movieList]);

  const inputChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  const updateMovie = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${params.id}`, {
        id: Number(formInput.id),
        title: formInput.title,
        director: formInput.director,
        metascore: Number(formInput.metascore),
        stars: formInput.stars.split(","),
      })
      .then((response) => {
        getMovieList();

        history.push(`/movies/${params.id}`);

        setFormInput({
          id: params.id,
          title: "",
          director: "",
          metascore: "",
          stars: "",
        });
      });
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
      }}
      onSubmit={updateMovie}
    >
      <label>
        Title
        <input
          type="text"
          name="title"
          onChange={inputChange}
          value={formInput.title}
        ></input>
      </label>
      <label>
        Director
        <input
          type="text"
          name="director"
          onChange={inputChange}
          value={formInput.director}
        ></input>
      </label>
      <label>
        Metascore
        <input
          type="text"
          name="metascore"
          onChange={inputChange}
          value={formInput.metascore}
        ></input>
      </label>
      <label>
        Stars (separate stars with commas)
        <input
          type="stars"
          name="title"
          onChange={inputChange}
          value={formInput.stars}
        ></input>
      </label>
      <button>Save</button>
    </form>
  );
};
