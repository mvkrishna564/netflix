import MovieCard from './MovieCard';
import './MovieRow.css';

const MovieRow = ({ list }) => {
  return (
    <div className="movie-row">
      <h2 className="movie-row__title">{list.title}</h2>
      <div className="movie-row__slider">
        <div className="movie-row__track">
          {list.content?.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieRow;
