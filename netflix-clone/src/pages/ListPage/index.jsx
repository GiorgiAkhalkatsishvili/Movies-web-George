import React from 'react';
import './ListPage.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ListPage = () => {
  const addedMovies = useSelector((state) => state.movie.addedMovies);

  const posterBaseURL = 'https://image.tmdb.org/t/p/w500';

  return (
    <div className='listPage'>
      <div className="inner">
        <div className="main-heading">
          <h1>My List</h1>
        </div>
        <div className="movie-list">
          {addedMovies.length === 0 ? (
            <p>No movies added yet.</p>
          ) : (
            addedMovies.map((movie) => (
              <Link key={movie.id} to={`/player/${movie.id}`} onClick={() => window.scroll(0, 0)} className="movie-link">
                <div className="movie-item">
                  {movie.poster_path && (
                    <img 
                      src={`${posterBaseURL}${movie.poster_path}`} 
                      alt={movie.title} 
                      className="movie-poster" 
                    />
                  )}
                  <p>{movie.title}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ListPage;
