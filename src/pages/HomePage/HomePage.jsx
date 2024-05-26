import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieList from '/src/components/MovieList/MovieList';
import css from './HomePage.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/trending/movie/day?language=en-US`;
    const options = {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZjBkODQxZjUzNGJkMmNjZTY2MjkwMzg3YjY2Mjc5MiIsInN1YiI6IjY2NTFiMmEyZWY3MzUzMmYyYjIzMWE3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DFnKlxTzPpvkM0R5Gd3GdBcyY4VAVmUsbRXRUf5W21s',
      },
    };

    axios
      .get(url, options)
      .then(response => setMovies(response.data.results))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className={css.homePageContainer}>
      <h1 className={css.headerHomePage}>Trending today</h1>
      <MovieList className={css.movieList} movies={movies}></MovieList>
    </div>
  );
}
