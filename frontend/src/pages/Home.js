import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Featured from '../components/Featured';
import MovieRow from '../components/MovieRow';
import axios from '../axios';
import './Home.css';

const Home = () => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);
  const [type, setType] = useState(null);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const params = new URLSearchParams();
        if (type) params.append('type', type);
        if (genre) params.append('genre', genre);

        const { data } = await axios.get(`/lists?${params}`);
        setLists(data);
      } catch (err) {
        console.error('Failed to fetch lists:', err);
      }
    };
    fetchLists();
  }, [type, genre]);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} />
      <div className="home__content">
        {lists.map((list) => (
          <MovieRow key={list._id} list={list} />
        ))}
        {lists.length === 0 && (
          <div className="home__empty">
            <p>No content available. Add some movies and lists via the API!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
