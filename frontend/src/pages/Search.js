import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from '../axios';
import './Search.css';

const Search = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const type = searchParams.get('type');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const params = type ? `?type=${type}` : '';
        const { data } = await axios.get(`/movies${params}`);
        setMovies(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [type]);

  const filtered = movies.filter((m) =>
    m.title?.toLowerCase().includes(query.toLowerCase()) ||
    m.genre?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search-page">
      <Navbar />
      <div className="search-page__content">
        <div className="search-page__header">
          <h1>
            {type === 'series' ? 'TV Shows' : type === 'movie' ? 'Movies' : 'Browse'}
          </h1>
          <div className="search-page__input-wrap">
            <input
              type="text"
              placeholder="Search titles, genres..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        {loading ? (
          <div className="search-page__loading">Loading...</div>
        ) : (
          <div className="search-page__grid">
            {filtered.map((movie) => (
              <div
                key={movie._id}
                className="search-page__card"
                onClick={() => navigate(`/watch/${movie._id}`)}
              >
                <img
                  src={movie.imgSm || movie.img || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400'}
                  alt={movie.title}
                />
                <div className="search-page__card-info">
                  <h3>{movie.title}</h3>
                  <div className="search-page__card-meta">
                    {movie.year && <span>{movie.year}</span>}
                    {movie.genre && <span>{movie.genre}</span>}
                    {movie.rating && <span>⭐ {movie.rating}</span>}
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="search-page__empty">
                No results found for "{query}"
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
