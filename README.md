# YouTube Clone – Frontend (React + TailwindCSS)

- This is the frontend application for a full-stack YouTube clone built with React. It allows users to view, search, filter, and interact with videos. The UI is responsive and supports user authentication, channel creation, video uploads, commenting, liking, and subscribing to channels.

## ⚡ Tech Stack
- Frontend

- React (Vite)

- TailwindCSS (Dark/Light Mode Support)

- Redux Toolkit (State Management)

- Axios (API Calls)

- React Router DOM (Routing)

- React Icons (UI Icons)

## ✨ Features

* Home Page
  - 📱 Responsive YouTube-style header

  - ☰ Toggleable sidebar via hamburger menu

  - 🔍 Real-time search by video title

  - 🎨 Category filter buttons

  - 🏷️ Video cards: title, thumbnail, channel, views

- Authentication
  - 👤 Register/Login (username, email, password)

  - 🔐 JWT token authentication

  - 👑 Profile dropdown with logout + dark mode

- Video Player
  - 🎥 Embedded video player

  - 👍 Like/Dislike toggle buttons

  - 💬 Full comment CRUD (add, edit, delete, like/dislike)

- Channel Management
  - 🆕 Create channel (one per user)

  - 📺 View/manage uploaded videos

  - ✏️ Edit/delete own videos

  - 🎨 Customize channel banner/info

- Responsive Design
  - 📱 Mobile-first 

  - 💻 Tablet 

  - 🖥️ Desktop 

  - 🌙 Dark mode support

- src/
- ├── components/        # Reusable UI components (Header, Sidebar, VideoCard, Comments, etc.)
- ├── utils/             # Redux slices, store configuration
- ├── pages/             # Pages like Home, Video, Channel, Login, Register
- ├── App.jsx            # Main app container with layout
- └── main.jsx           # Entry point and router setup


## 📌 Installation & Setup
1. Clone repo
```bash 
git clone https://github.com/R-Srijanki/Youtube-clone.git
cd Youtube-clone
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

Open http://localhost:5173 in your browser.

- ThumbnailUrl :[ThumbnailUrl Site](https://www.softr.io/tools/download-youtube-thumbnail)
    - To get youtube thumbnail, click on above site paste youtube video url and click on download. It gives us thumbnail of it. Copy and use url in upload video thumbnailUrl field.
## Project Github Link
Github Link: [Project](https://github.com/R-Srijanki/Youtube-clone.git)

## Author
**Rathod Srijanki**  
GitHub: [R-Srijanki](https://github.com/R-Srijanki)