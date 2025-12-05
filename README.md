# YouTube Clone – Frontend (React + TailwindCSS)

* This repository contains the frontend application of the YouTube Clone project.
The UI is built using React, TailwindCSS, React Router, Redux Toolkit, and Axios, delivering a fully responsive and interactive user experience similar to YouTube.

## ⚡ Tech Stack
- Frontend

- React (Vite)

- TailwindCSS (Dark/Light Mode Support)

- Redux Toolkit (State Management)

- Axios (API Calls)

- React Router DOM (Routing)

- React Icons (UI Icons)

## 🚀 Features (Complete Functionality)

Below is a comprehensive list of all frontend modules and their implemented functionality.

1. Authentication Module
- User Login

* JWT-based authentication.

* Stores token in localStorage.

* Global auth state handled by Redux.

* Redirects user after login.

* Header menu updates automatically after login.

- User Logout

* Clears all stored credentials.

* Redirects to homepage.

* Redux user state reset.

2. Header & Navigation

The header is designed to match YouTube’s modern UI.

- Key Features

* Responsive layout (mobile, tablet, desktop).

* Dark/Light mode toggle with global theme support.

* Search bar with live typing.

* Mobile Search Toggle

* Search icon opens a full-width input on small screens.

* Closes automatically after performing search.

* Hamburger menu for opening sidebar.

* YouTube logo navigating to homepage.

* Profile Dropdown Includes:

 Google Account

Switch Account

Sign Out

YouTube Studio

Purchases

Settings

Help & Feedback

Theme toggle and language selector

* Channel Menu

- Accessible via video camera icon:

- Upload Video

- View Channel

3. Home Page

* Fetches all videos using backend API.

* Displays video cards with:

- Thumbnail

- Title

- Channel details

- Views & uploaded time

- Skeleton loaders while content is loading.

- Fully responsive for grid display.

4. Video Watch Page

* Displays a single video with all YouTube-style interactions.

* Video Player Area

* Embedded video using React player or HTML <video>.

* Video title displayed.

* Uploader/channel info displayed.

* Channel avatar, name, handle, and subscriber count.

* Subscribe/Unsubscribe

* Button toggles based on current user subscription.

* Prevents subscribing to own channel.

* Updates UI instantly after API call.

* Video Stats

* Likes/Dislikes count 

* Views

* Uploaded date

* Comments Section

* Add new comment (JWT protected)

* Edit your comment

* Delete your comment

* Real-time UI update without reload

* Error handling for unauthorized users

* Comments display:

- User avatar

- Username

- Comment text

- Timestamp

5. Search Functionality

* Global search from Header.

Search results page:

- List of videos matching keyword.

- The URL structure:
/search/:query

- Search works on both desktop & mobile search bar.

6. Channel System
* Your Channel Page (/channel)

Displays:

- Channel name, handle, and avatar

- Channel cover image (optional)

- Uploaded videos

- Subscribers count

- Channel details

- Customize Channel Page Includes:

* Update channel name

* Update channel handle

* Update about/description

* Update profile avatar

* Update channel banner/cover image

* Save changes button

* Cancel button (reverts UI and navigates back)

7. Video Upload Module
- Upload Page (/channel/upload)

- Features:

* Upload video file

* Upload thumbnail

* Set title

* Set description

* Set category/tags

* Preview video before upload

Error validation for:

* Missing title

* Missing video file

* Invalid formats

* Protected route: requires login

8. Sidebar Navigation

* Collapsible sidebar for mobile & desktop.

* Opens using hamburger icon.

Contains:

- Home, Subscriptions, Your Channel, Watch Later, History,Trending, Settings

- Sidebar state controlled via Redux (sidebarslice).

9. Dark Mode (Global Theme System)

- Uses Tailwind’s dark: classes.

- Stores theme mode in Redux + localStorage.

- Consistent dark mode across:

* Header, Sidebar, Video cards, Profile menu, Forms and inputs

10. User State Management (Redux)

- Slices implemented:

* User Slice – user info, token, login state

* Theme Slice – light/dark mode

* Sidebar Slice – open/close sidebar

* Fully integrated across app.

11. Responsive Design

- Fully mobile-responsive

- Grid adjusts dynamically

- Mobile search bar

- Mobile sidebar

- Mobile header alignment

12. Error Handling

* Frontend handles:

- Invalid token (auto logout)

- API errors from backend

- 404 video not found

- Failed video upload alerts

- Unauthorized access (login required)

- Comment edit/submit errors

13. Optimizations

- No full page reload after actions (React state updates)

- Debounced search typing (optional)

- Lazy-loaded pages using LazyWrapper

- Automatic dropdown closing on outside click


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

# Project Github Link
Github Link: [Project](https://github.com/R-Srijanki/Youtube-clone.git)

## Author
**Rathod Srijanki**  
GitHub: [R-Srijanki](https://github.com/R-Srijanki)