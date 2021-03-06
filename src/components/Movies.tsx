import React, { useEffect, useState } from "react";
import api from "../services/api";

import "../styles/movies.css";

import notAvailable from "../assets/imagem-nao-disponivel.jpg";
import { Link } from "react-router-dom";

interface Movie {
  original_title: string;
  id: number;
  poster_path: string;
}

interface MovieProps {
  value: string;
}

const Movies = ({ value }: MovieProps) => {
  const [films, setFilms] = useState<Movie[]>([]);

  const key = "10ae2a06054a21f8c4bc55011987026d";
  const urlImg = `https://www.themoviedb.org/t/p/w300_and_h450_bestv2`;

  useEffect(() => {
    api
      .get(`/search/movie?api_key=${key}&query=${value}`)
      .then((result) => setFilms(result.data.results))
      .catch((error) => {
        console.error("ops! ocorreu um erro" + error);
      });
  }, [value]);

  console.log(films);

  return (
    <div className="films">
      {films.map((film) => (
        <Link to={"/movie/" + film.id}>
          <div key={film.id}>
            <div id="image-box">
              {film.poster_path ? (
                <img
                  src={urlImg + film.poster_path}
                  alt="Foto não disponivel"
                />
              ) : (
                <img src={notAvailable} width="300" height="450" alt="" />
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Movies;
