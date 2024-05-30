import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={css.movieList}>
      {movies.map(movie => (
        <li className={css.movieListItem} key={movie.id}>
          <div className={css.imageContainer}>
            <img
              src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
              alt={`${movie.title} poster`}
            />
          </div>
          <div className={css.movieTtitle}>
            <Link
              className={css.linkStyle}
              to={`/movies/${movie.id}`}
              state={{ from: location }}
            >
              {' '}
              {movie.title}{' '}
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
