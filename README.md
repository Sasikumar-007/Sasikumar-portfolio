# Sasikumar B — Portfolio Website

A modern, responsive full-stack portfolio built with **React + Vite + Tailwind CSS** frontend and **FastAPI + Supabase** backend.

## 📁 Structure

```
portfolio/
├── frontend/          # React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/   # Navbar, Hero, About, Skills, Projects, Contact, Footer
│   │   ├── context/      # ThemeContext (dark/light mode)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── ...
├── backend/           # FastAPI + Supabase
│   ├── main.py
│   ├── requirements.txt
│   └── .env.example
└── README.md
```

## 🚀 Getting Started (Unified Server)

Now that the frontend and backend are merged, you only need to run the FastAPI server to access everything.

```bash
# 1. Start the server
python backend/main.py
```

Visit **http://localhost:8000** to see your portfolio!

### Alternative: Development Mode

If you are developing and need Hot Module Replacement (HMR) for the frontend:

```bash
# Terminal 1: Backend
uvicorn backend.main:app --reload --port 8000

# Terminal 2: Frontend
cd frontend
npm run dev
```
Visit `http://localhost:5173` for dev mode.

## ☁️ Deployment (Vercel)

The project is optimized for a single-click deployment on Vercel.

1.  **Push** this folder to a GitHub repository.
2.  **Import** the repository into **Vercel**.
3.  **Environment Variables**: Add these in Vercel Settings:
    - `SUPABASE_URL`
    - `SUPABASE_KEY`
    - `SMTP_EMAIL`
    - `SMTP_PASSWORD`
    - `RECIPIENT_EMAIL`
4.  **Done!** Vercel will host both your React site and FastAPI backend.

## 🗄️ Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Run this SQL in the **SQL Editor**:

```sql
CREATE TABLE contacts (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (optional)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Allow inserts from the API
CREATE POLICY "Allow anonymous inserts"
  ON contacts FOR INSERT
  WITH CHECK (true);
```

3. Copy your **Project URL** and **anon key** from Settings → API into `.env`

## 📧 Email Setup (Gmail SMTP)

1. Enable 2-Factor Authentication on your Google Account
2. Generate an **App Password**: Google Account → Security → App Passwords
3. Use the app password in `.env` as `SMTP_PASSWORD`

## 🌐 Deployment

### Frontend → Vercel
1. Push `frontend/` to GitHub
2. Import in [vercel.com](https://vercel.com) → Set root directory to `frontend`
3. Add env variable: `VITE_API_URL=https://your-backend.onrender.com`

### Backend → Render
1. Push `backend/` to GitHub
2. Create a new **Web Service** on [render.com](https://render.com)
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add all `.env` variables in the Environment tab

## ✨ Features

- 🎨 Glassmorphism + gradient UI with dark/light mode
- ✍️ Animated typing effect for skills
- 🎆 Floating particles background
- 📱 Fully responsive (mobile-first)
- 🎞️ Framer Motion scroll-reveal animations
- 📬 Contact form → Supabase + Email notification
- 🔝 Sticky navbar with smooth scrolling
