import {
  useParams,
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const previousLocation = useRef(location.state?.from ?? '/');

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
    const options = {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZjBkODQxZjUzNGJkMmNjZTY2MjkwMzg3YjY2Mjc5MiIsInN1YiI6IjY2NTFiMmEyZWY3MzUzMmYyYjIzMWE3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DFnKlxTzPpvkM0R5Gd3GdBcyY4VAVmUsbRXRUf5W21s',
      },
    };
    axios
      .get(url, options)
      .then(response => setMovie(response.data))
      .catch(error => console.log(error));
  }, [movieId]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className={css.container}>
      <button
        className={css.goBackBtn}
        onClick={() => navigate(previousLocation.current)}
      >
        Go back
      </button>
      <div className={css.infoWrapper}>
        <div className={css.movieInfo}>
          <h1 className={css.movieTitle}>
            {movie.title} ({movie.release_date.split('-')[0]})
          </h1>
          <p className={css.greyText}>
            User score: {movie.vote_average * 10}%{' '}
          </p>
          <h2 className={css.overviewTitle}>Overview</h2>
          <p className={css.greyText}> {movie.overview} </p>
          <h3 className={css.overviewTitle}>Genres</h3>
          <p className={css.greyText}>
            {' '}
            {movie.genres.map(genre => genre.name).join(' ')}{' '}
          </p>
          <div className={css.additionaWrapper}>
            <h3 className={css.overviewTitle}>Additional Information</h3>
            <ul className={css.additionalList}>
              <li>
                <Link
                  to={`cast`}
                  className={css.additionalLink}
                  state={{ from: previousLocation.current }}
                >
                  Cast
                </Link>
              </li>
              <li>
                <Link
                  to={`reviews`}
                  className={css.additionalLink}
                  state={{ from: previousLocation.current }}
                >
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={css.imageContainer}>
          <img
            className={css.moviesImg}
            src={imageUrl}
            alt={`${movie.title} poster`}
          />
        </div>
      </div>
      <Outlet></Outlet>
    </div>
  );
}
