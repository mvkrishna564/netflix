import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axios';
import './Watch.css';

const Watch = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const { data } = await axios.get(`/movies/${id}`);
        setMovie(data);
      } catch (err) {
        console.error(err);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id, navigate]);

  if (loading) return <div className="watch watch--loading"><div className="spinner" /></div>;
  if (!movie) return null;

  return (
    <div className="watch">
      <button className="watch__back" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="watch__player">
        {movie.video ? (
          <video
            src={movie.video}
            controls
            autoPlay
            className="watch__video"
          />
        ) : movie.trailer ? (
          <iframe
            src={movie.trailer}
            title={movie.title}
            className="watch__iframe"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        ) : (
          <div className="watch__placeholder">
            <div className="watch__placeholder-content">
              <img
                src={movie.img || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800'}
                alt={movie.title}
              />
              <div className="watch__placeholder-overlay">
                <div className="watch__placeholder-text">
                  <h2>{movie.title}</h2>
                  <p>No video source available for this demo</p>
                  <p>Add a video URL to the movie via the API</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="watch__info">
        <h1>{movie.title}</h1>
        <div className="watch__meta">
          {movie.year && <span>{movie.year}</span>}
          {movie.duration && <span>{movie.duration}</span>}
          {movie.genre && <span>{movie.genre}</span>}
          {movie.rating && <span>⭐ {movie.rating}/10</span>}
          {movie.limit && <span>{movie.limit}+</span>}
        </div>
        <p className="watch__desc">{movie.desc}</p>
      </div>
    </div>
  );
};

export default Watch;
