import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import css from './MovieReviews.module.css';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US`;
    const options = {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZjBkODQxZjUzNGJkMmNjZTY2MjkwMzg3YjY2Mjc5MiIsInN1YiI6IjY2NTFiMmEyZWY3MzUzMmYyYjIzMWE3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DFnKlxTzPpvkM0R5Gd3GdBcyY4VAVmUsbRXRUf5W21s',
      },
    };
    axios
      .get(url, options)
      .then(response => setReviews(response.data.results))
      .catch(error => console.log(error));
  }, [movieId]);

  return (
    <div className={css.reviewsContainer}>
      {reviews.length === 0 ? (
        <p className={css.text}>We don't have any reviews for this movie.</p>
      ) : (
        <ul className={css.reviewsList}>
          {reviews.map(review => (
            <li key={review.id}>
              <h4>Author: {review.author} </h4>
              <p className={css.greyText}> {review.content} </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
