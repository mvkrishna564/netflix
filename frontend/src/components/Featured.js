import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';
import './Featured.css';

const Featured = ({ type }) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRandom = async () => {
      try {
        const url = type ? `/movies/random?type=${type}` : '/movies/random';
        const { data } = await axios.get(url);
        setContent(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRandom();
  }, [type]);

  if (loading) {
    return <div className="featured featured--loading"><div className="featured__shimmer" /></div>;
  }

  if (!content) return null;

  return (
    <div
      className="featured"
      style={{
        backgroundImage: `url(${content.img || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600'})`,
      }}
    >
      <div className="featured__overlay" />
      <div className="featured__content">
        {content.imgTitle ? (
          <img src={content.imgTitle} alt={content.title} className="featured__title-img" />
        ) : (
          <h1 className="featured__title">{content.title}</h1>
        )}

        <div className="featured__meta">
          {content.rating && (
            <span className="featured__rating">{content.rating}/10 ⭐</span>
          )}
          {content.year && <span>{content.year}</span>}
          {content.limit && <span className="featured__limit">{content.limit}+</span>}
          {content.duration && <span>{content.duration}</span>}
          {content.genre && <span className="featured__genre">{content.genre}</span>}
        </div>

        <p className="featured__desc">{content.desc}</p>

        <div className="featured__buttons">
          <button
            className="featured__btn featured__btn--play"
            onClick={() => navigate(`/watch/${content._id}`)}
          >
            ▶ Play
          </button>
          <button className="featured__btn featured__btn--info">
            ℹ More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
