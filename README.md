# 🎬 FilmSphere — Fullstack Movie & Playlist Management Service

A web-based service for movie cataloging and custom playlist management. Built as a modular SPA with a Node.js backend and local SQLite database.

## 🚀 Tech Stack
* Backend: Node.js, Express (REST API)
* Frontend: React 19, HTML5/CSS3
* Database: SQLite3

---

## 🔧 Setup & Local Execution

### 1. Installation
```bash
npm install
```
### 2. Backend & Database Server
The backend runs on port 5000 and handles all API requests:
```bash
node server.js
```
### 3. Frontend Development Server
```bash
npm start
```
Opens automatically at http://localhost:3000

---

## 🏗 Architectural Features

* Client-Server Pattern: Decoupled architecture using asynchronous REST (fetch) calls.
* Multi-User Profile Switching: Dynamic database context switching to isolate personal collections.
* State-based Navigation: SPA router using a centralized state machine (currentView).
* Full CRUD: Reactive data manipulation for playlists and movie collections.
