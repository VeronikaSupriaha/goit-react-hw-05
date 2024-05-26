import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import MovieList from '/src/components/MovieList/MovieList';
import css from './MoviesPage.module.css';

export default function MoviesPage() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = async (values, actions) => {
    try {
      if (!values.query.trim()) {
        toast.error('Please enter text to search for movies.');
        actions.setSubmitting(false);
        return;
      }

      const url = `https://api.themoviedb.org/3/search/movie?query=${values.query}&language=en-US`;
      const options = {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZjBkODQxZjUzNGJkMmNjZTY2MjkwMzg3YjY2Mjc5MiIsInN1YiI6IjY2NTFiMmEyZWY3MzUzMmYyYjIzMWE3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DFnKlxTzPpvkM0R5Gd3GdBcyY4VAVmUsbRXRUf5W21s',
        },
      };
      const response = await axios.get(url, options);
      setSearchResults(response.data.results);
    } catch (error) {
      console.log(error);
      toast.error('Please try again later');
    }
  };

  return (
    <div className={css.moviesPageContainer}>
      <header>
        <Formik initialValues={{ query: '' }} onSubmit={handleSubmit}>
          <Form className={css.form}>
            <Field className={css.field} type="text" name="query" />
            <button className={css.searchBtn} type="submit">
              Search
            </button>
          </Form>
        </Formik>
      </header>
      <MovieList movies={searchResults} />
    </div>
  );
}
