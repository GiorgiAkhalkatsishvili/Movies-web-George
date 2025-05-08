import React from 'react';
import './PopularMoviesComponent.css';
import CardsComponent from '../CardsComponent';

const PopularMoviesComponent = () => {
  return (
    <div className='popularMoviesComponent'>
      <div className="inner">
          <CardsComponent title={"Popular on Netflix"} category={"now_playing"} />
        <div className="second-cards">
            <CardsComponent title="New On Netflix" category={"top_rated"} />
        </div>
        <div className="second-cards">
            <CardsComponent title="Hollywood Movies" category={"popular"} />
        </div>
        <div className="second-cards">
            <CardsComponent title="Adventures" category={"upcoming"} />
        </div>
        <div className="second-cards">
            <CardsComponent title="Action Movies" category="now_playing" />
        </div>
        <div className="second-cards">
            <CardsComponent title="Get In on the Action" category="popular" />
        </div>
      </div>
    </div>
  );
};

export default PopularMoviesComponent;
