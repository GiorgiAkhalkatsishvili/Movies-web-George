import React from 'react';
import './PopularMoviesComponent.css';
import CardsComponent from '../CardsComponent';

const PopularMoviesComponent = () => {
  return (
    <div className='popularMoviesComponent'>
      <div className="inner">
        <div className="cards-list">
          <CardsComponent title={"Popular on Netflix"} category={"now_playing"} />
        </div>
        <div className="second-cards">
          <div className="cards-list">
            <CardsComponent title="New On Netflix" category={"top_rated"} />
          </div>
        </div>
        <div className="second-cards">
          <div className="cards-list">
            <CardsComponent title="Hollywood Movies" category={"popular"} />
          </div>
        </div>
        <div className="second-cards">
          <div className="cards-list">
            <CardsComponent title="Horror Movies" category={"upcoming"} />
          </div>
        </div>
        <div className="second-cards">
          <div className="cards-list">
            <CardsComponent title="Action Movies" category="now_playing" />
          </div>
        </div>
        <div className="second-cards">
          <div className="cards-list">
            <CardsComponent title="Get In on the Action" category="popular" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularMoviesComponent;
