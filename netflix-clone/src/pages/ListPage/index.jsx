import React, { useEffect } from 'react';
import './ListPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeMovie } from '../../Redux/moviesSlice';

const ListPage = () => {
  const addedMovies = useSelector((state) => state.movie.addedMovies);
  const posterBaseURL = 'https://image.tmdb.org/t/p/w500';
  const dispatch = useDispatch();

  const handleDeleteMovie = (id) => {
    dispatch(removeMovie(id));
  };

  useEffect(() => {
    localStorage.setItem('addedMovies', JSON.stringify(addedMovies));
  }, [addedMovies]);

  return (
    <div className='listPage'>
      <div className="inner">
        <div className="main-heading">
          <h1>My List</h1>
        </div>
        <div className="border">
          <hr />
        </div>
        <div className="movie-list">
          {addedMovies.length === 0 ? (
            <p>No movies added yet.</p>
          ) : (
            addedMovies.map((movie) => (
              <div className='eachMovie' key={movie.id}>
                <div className="movie-inner">
                  <div className="movie-item">
                    {movie.poster_path && (
                      <Link to={`/player/${movie.id}`} onClick={() => window.scroll(0, 0)} className="movie-link">
                        <img
                          src={`${posterBaseURL}${movie.poster_path}`}
                          alt={movie.title}
                          className="movie-poster"
                        />
                      </Link>
                    )}
                    <div className="movie-description">
                      <div className="movie-title">
                        <p>{movie.title}</p>
                      </div>
                      {movie.trailerType && (
                        <div className="movie-type">
                          <p>{movie.trailerType}</p>
                        </div>
                      )}
                      <div onClick={() => handleDeleteMovie(movie.id)} className='delete-movie'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                          <path
                            d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 
                              86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 
                              41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 
                              297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 
                              342.6 150.6z"
                            fill='#fff'
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ListPage;
