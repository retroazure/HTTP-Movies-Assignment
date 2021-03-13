import Axios from "axios";
import React, { useState, useEffect } from "react";

const AddMovie = ({ movies, getMovieList }) => {
  const [formInput, SetFormInput] = useState({
    id: "",
    tile: "",
    director: "",
    metascore: "",
    stars: "",
  });

  const inputChange = (e) => {
    SetFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  const addMovie = (e) => {
    e.preventDefault(); //to prevent the page from refreshing when adding the movie

    Axios.post(`http://localhost:5000/api/movies/`, {
      id: movies.length,
      title: formInput.title,
      director: formInput.director,
      metascore: Number(formInput.metascore),
      stars: formInput.stars.split(","),
    })
      .then((res) => {
        console.log(res);
        SetFormInput({
          id: "",
          title: "",
          director: "",
          metascore: "",
          stars: "",
        });

        getMovieList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="form-div">
      <form className="update-form" onSubmit={addMovie}>
        <label>
          Title
          <input
            type="text"
            name="title"
            onChange={inputChange}
            value={formInput.title}
          />
        </label>
        <label>
          Director
          <input
            type="text"
            name="director"
            onChange={inputChange}
            value={formInput.director}
          />
        </label>
        <label>
          Metascore
          <input
            type="text"
            name="metascore"
            onChange={inputChange}
            value={formInput.metascore}
          />
        </label>
        <label>
          Star (Separate stars with commas)
          <input
            type="text"
            name="stars"
            onChange={inputChange}
            value={formInput.stars}
          />
        </label>
        <button>Save</button>
      </form>
    </div>
  );
};

export default AddMovie;
