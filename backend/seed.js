const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Movie = require('./models/Movie');
const List = require('./models/List');
const User = require('./models/User');

dotenv.config();

const movies = [
  {
    title: 'Inception',
    desc: 'A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea into the mind of a C.E.O.',
    img: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1200',
    imgSm: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400',
    year: '2010',
    limit: 13,
    genre: 'Sci-Fi',
    isSeries: false,
    duration: '2h 28min',
    rating: 8.8,
  },
  {
    title: 'The Dark Knight',
    desc: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    img: 'https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=1200',
    imgSm: 'https://images.unsplash.com/photo-1534809027769-b00d750a6bac?w=400',
    year: '2008',
    limit: 13,
    genre: 'Action',
    isSeries: false,
    duration: '2h 32min',
    rating: 9.0,
  },
  {
    title: 'Interstellar',
    desc: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
    img: 'https://images.unsplash.com/photo-1446941303075-e36ffe6f7f2f?w=1200',
    imgSm: 'https://images.unsplash.com/photo-1446941303075-e36ffe6f7f2f?w=400',
    year: '2014',
    limit: 13,
    genre: 'Sci-Fi',
    isSeries: false,
    duration: '2h 49min',
    rating: 8.7,
  },
  {
    title: 'Breaking Bad',
    desc: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine to secure his family\'s future.',
    img: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1200',
    imgSm: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400',
    year: '2008',
    limit: 18,
    genre: 'Drama',
    isSeries: true,
    duration: '5 Seasons',
    rating: 9.5,
  },
  {
    title: 'Stranger Things',
    desc: 'When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces in order to get him back.',
    img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200',
    imgSm: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400',
    year: '2016',
    limit: 16,
    genre: 'Horror',
    isSeries: true,
    duration: '4 Seasons',
    rating: 8.7,
  },
  {
    title: 'The Crown',
    desc: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the twentieth century.',
    img: 'https://images.unsplash.com/photo-1584448097764-372e4f9d50c1?w=1200',
    imgSm: 'https://images.unsplash.com/photo-1584448097764-372e4f9d50c1?w=400',
    year: '2016',
    limit: 16,
    genre: 'Drama',
    isSeries: true,
    duration: '6 Seasons',
    rating: 8.7,
  },
  {
    title: 'Avengers: Endgame',
    desc: 'After the devastating events of Avengers: Infinity War, the universe is in ruins. The Avengers assemble once more to undo Thanos\'s actions and restore order.',
    img: 'https://images.unsplash.com/photo-1579566346927-c68383817a25?w=1200',
    imgSm: 'https://images.unsplash.com/photo-1579566346927-c68383817a25?w=400',
    year: '2019',
    limit: 13,
    genre: 'Action',
    isSeries: false,
    duration: '3h 1min',
    rating: 8.4,
  },
  {
    title: 'The Witcher',
    desc: 'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.',
    img: 'https://images.unsplash.com/photo-1612198790700-0c85e98f592e?w=1200',
    imgSm: 'https://images.unsplash.com/photo-1612198790700-0c85e98f592e?w=400',
    year: '2019',
    limit: 18,
    genre: 'Fantasy',
    isSeries: true,
    duration: '3 Seasons',
    rating: 8.2,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Movie.deleteMany({});
    await List.deleteMany({});
    console.log('🗑️  Cleared existing movies and lists');

    // Insert movies
    const insertedMovies = await Movie.insertMany(movies);
    console.log(`✅ Inserted ${insertedMovies.length} movies`);

    // Create lists
    const movieDocs = insertedMovies.filter((m) => !m.isSeries);
    const seriesDocs = insertedMovies.filter((m) => m.isSeries);
    const actionMovies = insertedMovies.filter((m) => m.genre === 'Action');
    const scifiMovies = insertedMovies.filter((m) => m.genre === 'Sci-Fi');

    const lists = await List.insertMany([
      {
        title: 'Trending Now',
        type: null,
        content: insertedMovies.slice(0, 5).map((m) => m._id),
      },
      {
        title: 'Top Picks for You',
        type: null,
        content: insertedMovies.slice(2, 7).map((m) => m._id),
      },
      {
        title: 'Movies',
        type: 'movie',
        content: movieDocs.map((m) => m._id),
      },
      {
        title: 'TV Shows',
        type: 'series',
        content: seriesDocs.map((m) => m._id),
      },
      {
        title: 'Action & Adventure',
        genre: 'Action',
        content: actionMovies.map((m) => m._id),
      },
    ]);
    console.log(`✅ Inserted ${lists.length} lists`);

    // Create admin user
    const adminExists = await User.findOne({ email: 'admin@netflix.com' });
    if (!adminExists) {
      await User.create({
        username: 'admin',
        email: 'admin@netflix.com',
        password: 'admin123',
        isAdmin: true,
      });
      console.log('✅ Admin user created: admin@netflix.com / admin123');
    }

    // Create test user
    const testExists = await User.findOne({ email: 'user@netflix.com' });
    if (!testExists) {
      await User.create({
        username: 'testuser',
        email: 'user@netflix.com',
        password: 'user123',
        isAdmin: false,
      });
      console.log('✅ Test user created: user@netflix.com / user123');
    }

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
};

seedDB();
