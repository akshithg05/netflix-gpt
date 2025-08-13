# 🎬 NetflixGPT

NetflixGPT is a personal project that blends the sleek UI of Netflix with the intelligence of OpenAI’s GPT-4o model.  
It allows users to explore trending movies, watch trailers, and even get AI-powered recommendations based on natural language prompts — all in a responsive, modern web application.

---

## 🚀 Features

### 🔑 Authentication & User Management

- **Sign Up / Login / Logout** using Firebase Authentication.
- **Form validation** with instant feedback.
- **Profile updates** including display name.
- **Auth guard** to protect routes (redirects to login if unauthenticated).
- Unsubscribe from `onAuthStateChanged` listener to avoid memory leaks.

### 🎥 Movie Browsing

- Fetch **Now Playing**, **Top Movies**, and more using **TMDB API**.
- **Main hero section** with autoplaying & muted background trailers.
- **Movie list & card** components with responsive Tailwind CSS styling.
- On-click **movie trailer pop-up**.
- Cached API responses using **Redux memoization** for better performance.

### 🤖 AI-Powered Movie Search

- GPT-4o integration for **natural language movie search**.
- AI returns top 5 movie suggestions based on user input.
- Results fetched via **TMDB Search API** and displayed with movie details.
- **Multi-language support**: English, Spanish, Hindi, Kannada, Tamil.
- Offensive comment filtering with **guardrails**.
- Search **clear button** and prompt optimization for better AI results.

### 🛠 Technical Improvements

- **Redux store** with `userSlice` and movie state management.
- **Custom hooks** for data fetching from TMDB.
- **Error handling** with custom error routes and edge case coverage.
- **Responsive design** for mobile, tablet, and desktop.
- **Memoization** to reduce redundant API calls.
- **Unit testing** with Jest.

---

## 🏗 Tech Stack

- **Frontend:** React (Vite), Tailwind CSS
- **State Management:** Redux Toolkit
- **Authentication & Hosting:** Firebase
- **API Integration:** TMDB API, OpenAI GPT-4o
- **Testing:** Jest
- **Deployment:** Firebase Hosting

---

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/netflix-gpt.git
   cd netflix-gpt
   ```

# 🎬 NetflixGPT

NetflixGPT is a personal project that blends the sleek UI of Netflix with the intelligence of OpenAI’s GPT-4o model.  
It allows users to explore trending movies, watch trailers, and even get AI-powered recommendations based on natural language prompts — all in a responsive, modern web application.

---

## 🚀 Features

### 🔑 Authentication & User Management

- **Sign Up / Login / Logout** using Firebase Authentication.
- **Form validation** with instant feedback.
- **Profile updates** including display name.
- **Auth guard** to protect routes (redirects to login if unauthenticated).
- Unsubscribe from `onAuthStateChanged` listener to avoid memory leaks.

### 🎥 Movie Browsing

- Fetch **Now Playing**, **Top Movies**, and more using **TMDB API**.
- **Main hero section** with autoplaying & muted background trailers.
- **Movie list & card** components with responsive Tailwind CSS styling.
- On-click **movie trailer pop-up**.
- Cached API responses using **Redux memoization** for better performance.

### 🤖 AI-Powered Movie Search

- GPT-4o integration for **natural language movie search**.
- AI returns top 5 movie suggestions based on user input.
- Results fetched via **TMDB Search API** and displayed with movie details.
- **Multi-language support**: English, Spanish, Hindi, Kannada, Tamil.
- Offensive comment filtering with **guardrails**.
- Search **clear button** and prompt optimization for better AI results.

### 🛠 Technical Improvements

- **Redux store** with `userSlice` and movie state management.
- **Custom hooks** for data fetching from TMDB.
- **Error handling** with custom error routes and edge case coverage.
- **Responsive design** for mobile, tablet, and desktop.
- **Memoization** to reduce redundant API calls.
- **Unit testing** with Jest.

---

## 🏗 Tech Stack

- **Frontend:** React (Vite), Tailwind CSS
- **State Management:** Redux Toolkit
- **Authentication & Hosting:** Firebase
- **API Integration:** TMDB API, OpenAI GPT-4o
- **Testing:** Jest
- **Deployment:** Firebase Hosting

---

# Clone the repository
git clone https://github.com/yourusername/netflix-gpt.git
cd netflix-gpt

# Install dependencies
npm install

# Create .env file with your keys
cat <<EOF > .env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_TMDB_ACCESS_TOKEN=your_tmdb_token
VITE_OPENAI_API_KEY=your_openai_api_key
EOF

# Run locally
npm run dev

# Build for production
npm run build
