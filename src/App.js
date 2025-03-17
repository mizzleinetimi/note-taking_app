import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  // Load notes from localStorage when the app loads
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // Add a new note
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    const addedNote = {
      id: Date.now(),
      content: newNote,
    };
    
    setNotes([...notes, addedNote]);
    setNewNote('');
  };

  // Delete a note
  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>My Notes</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit} className="note-form">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Type a note..."
            className="note-input"
          />
          <button type="submit" className="add-button">Add Note</button>
        </form>
        
        <div className="notes-container">
          {notes.length === 0 ? (
            <p className="no-notes">No notes yet. Add one above!</p>
          ) : (
            notes.map((note) => (
              <div key={note.id} className="note-card">
                <p>{note.content}</p>
                <button 
                  onClick={() => deleteNote(note.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default App;