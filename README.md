# 📝 Note-Taking App MVP

A simple, elegant note-taking application built with Node.js and Express.

## Features

✨ **Core Features**
- ✅ Create notes with title and content
- ✅ Read/view all your notes
- ✅ Edit existing notes
- ✅ Delete notes

🎨 **UI/UX**
- Modern, responsive design
- Clean and intuitive interface
- Modal-based note viewing and editing
- Works on desktop and mobile

## Tech Stack

- **Backend**: Node.js + Express.js
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Data Storage**: In-memory (perfect for MVP)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/engr-pixel/note-taking-app.git
   cd note-taking-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:3000`

### Development Mode

To run with auto-reload on file changes:
```bash
npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notes` | Get all notes |
| GET | `/api/notes/:id` | Get a specific note |
| POST | `/api/notes` | Create a new note |
| PUT | `/api/notes/:id` | Update a note |
| DELETE | `/api/notes/:id` | Delete a note |

### Example Requests

**Create a note:**
```bash
curl -X POST http://localhost:3000/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"My Note","content":"This is a test note"}'
```

**Get all notes:**
```bash
curl http://localhost:3000/api/notes
```

**Delete a note:**
```bash
curl -X DELETE http://localhost:3000/api/notes/1
```

## Project Structure

```
note-taking-app/
├── server.js          # Express server and API routes
├── package.json       # Dependencies and scripts
├── README.md          # This file
├── .gitignore         # Git ignore rules
└── public/
    ├── index.html     # Main HTML file
    ├── styles.css     # Styling
    └── app.js         # Frontend JavaScript
```

## Future Enhancements

- 🗂️ Add note categories/folders
- 🏷️ Add tags support
- 🔍 Add search functionality
- 💾 Persist data to database (MongoDB, PostgreSQL)
- 👤 User authentication and accounts
- ☁️ Cloud synchronization
- 📱 Mobile app version
- 🌙 Dark mode

## License

MIT License - Feel free to use this project for learning or as a starting point!

## Author

Created with ❤️ by engr-pixel
