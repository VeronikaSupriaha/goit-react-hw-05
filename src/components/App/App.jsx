import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navigation from '../Navigation/Navigation';

const HomePage = lazy(() => import('/src/pages/HomePage/HomePage.jsx'));
const MoviesPage = lazy(() => import('/src/pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() =>
  import('/src/pages/MovieDetailsPage/MovieDetailsPage')
);
const NotFoundPage = lazy(() => import('/src/pages/NotFoundPage/NotFoundPage'));
const MovieCast = lazy(() => import('../MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../MovieReviews/MovieReviews'));

export default function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading page...</div>}>
        <Navigation></Navigation>

        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/movies" element={<MoviesPage />}></Route>
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}
