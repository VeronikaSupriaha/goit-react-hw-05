import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import css from './MovieCast.module.css/';

export default function MovieCast() {
  const params = useParams();
  const movieId = params.movieId;
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;
    const options = {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZjBkODQxZjUzNGJkMmNjZTY2MjkwMzg3YjY2Mjc5MiIsInN1YiI6IjY2NTFiMmEyZWY3MzUzMmYyYjIzMWE3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DFnKlxTzPpvkM0R5Gd3GdBcyY4VAVmUsbRXRUf5W21s',
      },
    };
    axios
      .get(url, options)
      .then(response => setCast(response.data.cast))
      .catch(error => console.log(error));
  }, [movieId]);

  return (
    <div className={css.castContainer}>
      <h3 className={css.visuallyHidden}>Cast</h3>
      <ul className={css.castList}>
        {cast.map(actor => (
          <li className={css.castItem} key={actor.cast_id}>
            <img
              src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
              alt={`${actor.name}profile`}
            />
            {actor.name}
            Character: {actor.character}
          </li>
        ))}
      </ul>
    </div>
  );
}
