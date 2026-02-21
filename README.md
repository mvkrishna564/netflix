# 🎬 Netflix Clone

A full-stack Netflix clone built with React, Node.js, Express, and MongoDB. Built for deployment practice.

## 📁 Project Structure

```
netflix-clone/
├── backend/              # Express.js REST API
│   ├── models/           # Mongoose models (User, Movie, List)
│   ├── routes/           # API routes (auth, movies, lists, users)
│   ├── middleware/       # JWT auth middleware
│   ├── server.js         # Entry point
│   ├── seed.js           # Database seeder
│   └── Dockerfile
├── frontend/             # React.js SPA
│   ├── src/
│   │   ├── components/   # Navbar, Featured, MovieCard, MovieRow
│   │   ├── pages/        # Home, Login, Register, Watch, Search
│   │   ├── context/      # AuthContext (JWT state)
│   │   └── axios.js      # Axios instance with auth interceptor
│   ├── nginx.conf        # Nginx config for production
│   └── Dockerfile
└── docker-compose.yml    # Full stack deployment
```

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### 1. Clone & Install

```bash
# Backend
cd backend
cp .env.example .env
# Edit .env with your MONGO_URI and JWT_SECRET
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Seed the Database

```bash
cd backend
node seed.js
```

This creates:
- **Admin user**: `admin@netflix.com` / `admin123`
- **Test user**: `user@netflix.com` / `user123`
- 8 sample movies and 5 lists

### 3. Start Development Servers

```bash
# Terminal 1 - Backend
cd backend
npm run dev   # Runs on http://localhost:5000

# Terminal 2 - Frontend
cd frontend
npm start     # Runs on http://localhost:3000
```

---

## 🐳 Docker Deployment

```bash
# Build and run everything
docker-compose up --build

# Access at http://localhost:3000
```

---

## ☁️ Cloud Deployment Options

### Option 1: Render.com (Free Tier)

**Backend:**
1. Create a new "Web Service" on Render
2. Connect your GitHub repo
3. Set root directory to `backend`
4. Build command: `npm install`
5. Start command: `node server.js`
6. Add environment variables:
   - `MONGO_URI` = your MongoDB Atlas URI
   - `JWT_SECRET` = random long string
   - `NODE_ENV` = production
   - `FRONTEND_URL` = your frontend URL

**Frontend:**
1. Create a new "Static Site" on Render
2. Root directory: `frontend`
3. Build command: `npm install && npm run build`
4. Publish directory: `build`
5. Add environment variable:
   - `REACT_APP_API_URL` = your backend URL + `/api`

### Option 2: Railway.app

```bash
# Install Railway CLI
npm install -g @railway/cli
railway login

# Deploy backend
cd backend
railway init
railway up

# Deploy frontend
cd ../frontend
railway init
railway up
```

### Option 3: Vercel (Frontend) + Railway (Backend)

**Frontend on Vercel:**
```bash
cd frontend
npx vercel
# Follow prompts, set REACT_APP_API_URL env var
```

**Backend on Railway:**
```bash
cd backend
railway up
```

### Option 4: AWS / GCP / Azure (VPS)

```bash
# On your server
git clone <your-repo>
cd netflix-clone

# Set environment variables
cp backend/.env.example backend/.env
nano backend/.env   # Add your values

# Deploy with Docker
docker-compose up -d
```

---

## 🔌 API Reference

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Get current user |

### Movies
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/movies` | ✅ | Get all movies |
| GET | `/api/movies/random?type=movie` | ✅ | Random featured |
| GET | `/api/movies/:id` | ✅ | Get movie by ID |
| POST | `/api/movies` | Admin | Create movie |
| PUT | `/api/movies/:id` | Admin | Update movie |
| DELETE | `/api/movies/:id` | Admin | Delete movie |

### Lists
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/lists?type=series&genre=Drama` | ✅ | Get lists |
| POST | `/api/lists` | Admin | Create list |
| DELETE | `/api/lists/:id` | Admin | Delete list |

### Example: Add a Movie via API

```bash
# First login to get token
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@netflix.com","password":"admin123"}'

# Use the token to create a movie
curl -X POST http://localhost:5000/api/movies \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "My Movie",
    "desc": "A great movie description",
    "img": "https://example.com/image.jpg",
    "imgSm": "https://example.com/thumbnail.jpg",
    "year": "2024",
    "genre": "Action",
    "isSeries": false,
    "duration": "2h 10min",
    "rating": 8.5,
    "limit": 13
  }'
```

---

## 🔧 Environment Variables

### Backend `.env`
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/netflix-clone
JWT_SECRET=your_super_long_random_secret_key_here
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend `.env` (optional)
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router 6 |
| Styling | Pure CSS with CSS Variables |
| HTTP Client | Axios with interceptors |
| Backend | Node.js, Express 4 |
| Database | MongoDB with Mongoose |
| Auth | JWT (JSON Web Tokens) |
| Containerization | Docker, Docker Compose |
| Web Server | Nginx (production) |

---

## 📝 Features

- ✅ JWT Authentication (register, login, protected routes)
- ✅ Responsive Netflix-style UI
- ✅ Featured hero banner with random movie
- ✅ Horizontal scrolling movie rows
- ✅ Movie hover cards with details
- ✅ Watch page (supports video URLs and iframes)
- ✅ Search/browse page
- ✅ Admin-only movie/list management
- ✅ Database seeder with sample data
- ✅ Docker + Docker Compose setup
- ✅ Nginx configuration for SPA routing
