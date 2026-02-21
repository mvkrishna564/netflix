import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={`movie-card ${hovered ? 'movie-card--hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={movie.imgSm || movie.img || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400'}
        alt={movie.title}
        className="movie-card__img"
      />
      {hovered && (
        <div className="movie-card__info">
          <div className="movie-card__controls">
            <button
              className="movie-card__btn movie-card__btn--play"
              onClick={() => navigate(`/watch/${movie._id}`)}
            >▶</button>
            <button className="movie-card__btn">+</button>
            <button className="movie-card__btn">👍</button>
            <button className="movie-card__btn movie-card__btn--chevron">⌄</button>
          </div>
          <h3 className="movie-card__title">{movie.title}</h3>
          <div className="movie-card__meta">
            {movie.rating && <span className="movie-card__rating">⭐ {movie.rating}</span>}
            {movie.year && <span>{movie.year}</span>}
            {movie.limit && <span className="movie-card__limit">{movie.limit}+</span>}
            {movie.duration && <span>{movie.duration}</span>}
          </div>
          <div className="movie-card__tags">
            {movie.genre && <span className="movie-card__tag">{movie.genre}</span>}
            {movie.isSeries && <span className="movie-card__tag">Series</span>}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
