import React, { useEffect, useState } from 'react';
import './CardsComponent.css';

const CardsComponent = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmFjNjA0OTI5ZTEwZTNjYTA3OWI1MTVlNzlmMGRkMyIsIm5iZiI6MTc0NjIwMTk2MC45OTksInN1YiI6IjY4MTRlZDY4NDY3MDZmMmFhZjA4OThlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AIZieflJ1IjKZtoIMdtxFFZuAo1XaeM60sI1BR89TdA'
    }
  };

  useEffect(() => {
    const endpoint = `https://api.themoviedb.org/3/movie/${category || "now_playing"}?language=en-US&page=1`;

    fetch(endpoint, options)
      .then(res => res.json())
      .then(res => {
        if (res && res.results) {
          setApiData(res.results);
        } else {
          console.error("No results found", res);
          setApiData([]);
        }
      })
      .catch(err => console.error(err));
  }, [category]);

  return (
    <div className='cardsComponent'>
      {title && <h1>{title}</h1>}
      <div className="cards-list">
        {apiData.map((item, index) => (
          <div key={index} className="cards">
            <div className="cards-info">
              <img
                src={`https://image.tmdb.org/t/p/w500${item.backdrop_path || item.poster_path}`}
                alt={item.title || 'Untitled'}
              />
              <p>{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardsComponent;
