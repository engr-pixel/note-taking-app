const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// In-memory notes storage (for MVP)
let notes = [
  { id: 1, title: 'Welcome', content: 'Welcome to your note-taking app!', createdAt: new Date() }
];

let nextId = 2;

// Routes

// GET all notes
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

// GET a single note by ID
app.get('/api/notes/:id', (req, res) => {
  const note = notes.find(n => n.id === parseInt(req.params.id));
  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }
  res.json(note);
});

// CREATE a new note
app.post('/api/notes', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  const newNote = {
    id: nextId++,
    title,
    content,
    createdAt: new Date()
  };

  notes.push(newNote);
  res.status(201).json(newNote);
});

// UPDATE a note
app.put('/api/notes/:id', (req, res) => {
  const note = notes.find(n => n.id === parseInt(req.params.id));
  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }

  const { title, content } = req.body;
  if (title) note.title = title;
  if (content) note.content = content;

  res.json(note);
});

// DELETE a note
app.delete('/api/notes/:id', (req, res) => {
  const index = notes.findIndex(n => n.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Note not found' });
  }

  const deletedNote = notes.splice(index, 1);
  res.json(deletedNote[0]);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Note-taking app server running on http://localhost:${PORT}`);
});
