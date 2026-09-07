const API_URL = 'http://localhost:3000/api/notes';

let currentNoteId = null;

// DOM Elements
const createBtn = document.getElementById('createBtn');
const noteTitle = document.getElementById('noteTitle');
const noteContent = document.getElementById('noteContent');
const notesList = document.getElementById('notesList');

const noteModal = document.getElementById('noteModal');
const modalTitle = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');
const modalDate = document.getElementById('modalDate');
const closeModal = document.querySelector('.close');
const editBtn = document.getElementById('editBtn');
const deleteBtn = document.getElementById('deleteBtn');

const editModal = document.getElementById('editModal');
const editTitle = document.getElementById('editTitle');
const editContent = document.getElementById('editContent');
const saveBtn = document.getElementById('saveBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const closeEditModal = document.querySelector('.close-edit');

// Event Listeners
createBtn.addEventListener('click', createNote);
closeModal.addEventListener('click', () => noteModal.style.display = 'none');
closeEditModal.addEventListener('click', () => editModal.style.display = 'none');
editBtn.addEventListener('click', openEditModal);
deleteBtn.addEventListener('click', deleteNote);
saveBtn.addEventListener('click', saveNote);
cancelEditBtn.addEventListener('click', () => editModal.style.display = 'none');

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  if (e.target === noteModal) {
    noteModal.style.display = 'none';
  }
  if (e.target === editModal) {
    editModal.style.display = 'none';
  }
});

// Fetch and display all notes
async function fetchNotes() {
  try {
    const response = await fetch(API_URL);
    const notes = await response.json();
    displayNotes(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
  }
}

// Display notes in the list
function displayNotes(notes) {
  notesList.innerHTML = '';
  if (notes.length === 0) {
    notesList.innerHTML = '<p style="color: #94a3b8; text-align: center;">No notes yet. Create one!</p>';
    return;
  }

  notes.forEach(note => {
    const noteCard = document.createElement('div');
    noteCard.className = 'note-card';
    noteCard.innerHTML = `
      <h3>${escapeHtml(note.title)}</h3>
      <p>${escapeHtml(note.content)}</p>
      <small>${new Date(note.createdAt).toLocaleString()}</small>
    `;
    noteCard.addEventListener('click', () => viewNote(note));
    notesList.appendChild(noteCard);
  });
}

// Create a new note
async function createNote() {
  const title = noteTitle.value.trim();
  const content = noteContent.value.trim();

  if (!title || !content) {
    alert('Please enter both title and content');
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, content })
    });

    if (response.ok) {
      noteTitle.value = '';
      noteContent.value = '';
      fetchNotes();
      alert('Note created successfully!');
    } else {
      alert('Error creating note');
    }
  } catch (error) {
    console.error('Error creating note:', error);
    alert('Error creating note');
  }
}

// View a note in modal
function viewNote(note) {
  currentNoteId = note.id;
  modalTitle.textContent = note.title;
  modalContent.textContent = note.content;
  modalDate.textContent = `Created: ${new Date(note.createdAt).toLocaleString()}`;
  noteModal.style.display = 'block';
}

// Open edit modal
async function openEditModal() {
  try {
    const response = await fetch(`${API_URL}/${currentNoteId}`);
    const note = await response.json();
    editTitle.value = note.title;
    editContent.value = note.content;
    noteModal.style.display = 'none';
    editModal.style.display = 'block';
  } catch (error) {
    console.error('Error fetching note:', error);
  }
}

// Save edited note
async function saveNote() {
  const title = editTitle.value.trim();
  const content = editContent.value.trim();

  if (!title || !content) {
    alert('Please enter both title and content');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${currentNoteId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, content })
    });

    if (response.ok) {
      editModal.style.display = 'none';
      fetchNotes();
      alert('Note updated successfully!');
    } else {
      alert('Error updating note');
    }
  } catch (error) {
    console.error('Error updating note:', error);
    alert('Error updating note');
  }
}

// Delete a note
async function deleteNote() {
  if (!confirm('Are you sure you want to delete this note?')) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${currentNoteId}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      noteModal.style.display = 'none';
      fetchNotes();
      alert('Note deleted successfully!');
    } else {
      alert('Error deleting note');
    }
  } catch (error) {
    console.error('Error deleting note:', error);
    alert('Error deleting note');
  }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Load notes on page load
document.addEventListener('DOMContentLoaded', fetchNotes);
