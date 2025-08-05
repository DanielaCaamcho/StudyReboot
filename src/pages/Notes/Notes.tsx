import { useState } from 'react';
import { FileText, Plus, Search, X } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { Note } from '../../types';
import styles from './Notes.module.css';

export function Notes() {
  const [notes, setNotes] = useLocalStorage<Note[]>('notes', []);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: ''
  });

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = () => {
    if (formData.title.trim() && formData.content.trim() && formData.category.trim()) {
      if (editingNote) {
        // Update existing note
        setNotes(prev =>
          prev.map(note =>
            note.id === editingNote.id
              ? { ...note, ...formData, updatedAt: new Date() }
              : note
          )
        );
      } else {
        // Create new note
        const newNote: Note = {
          id: Date.now().toString(),
          ...formData,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        setNotes(prev => [newNote, ...prev]);
      }
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingNote(null);
    setFormData({ title: '', content: '', category: '' });
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setFormData({
      title: note.title,
      content: note.content,
      category: note.category
    });
    setShowModal(true);
  };

  const handleDeleteNote = (id: string) => {
    if (confirm('Are you sure you want to delete this note?')) {
      setNotes(prev => prev.filter(note => note.id !== id));
    }
  };

  return (
    <div className={styles.notesPage}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <FileText className={styles.titleIcon} size={28} />
          Notes
        </h1>
        <button 
          className={styles.addButton}
          onClick={() => setShowModal(true)}
        >
          <Plus size={24} />
          <span style={{ display: window.innerWidth >= 768 ? 'inline' : 'none' }}>
            Add Note
          </span>
        </button>
      </header>

      <div className={styles.searchContainer}>
        <Search className={styles.searchIcon} size={20} />
        <input
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`input ${styles.searchInput}`}
        />
      </div>

      <div className={styles.notesList}>
        {filteredNotes.length === 0 ? (
          <div className={styles.emptyState}>
            <FileText className={styles.emptyIcon} size={48} />
            <p>No notes found. Create your first note!</p>
          </div>
        ) : (
          filteredNotes.map(note => (
            <div 
              key={note.id} 
              className={styles.noteCard}
              onClick={() => handleEditNote(note)}
            >
              <div className={styles.noteHeader}>
                <h3 className={styles.noteTitle}>{note.title}</h3>
              </div>
              <div className={styles.noteContent}>
                {note.content}
              </div>
              <div className={styles.noteMeta}>
                <span className={styles.categoryTag}>
                  {note.category}
                </span>
                <span className={styles.noteDate}>
                  {new Date(note.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className={styles.modal} onClick={(e) => e.target === e.currentTarget && handleCloseModal()}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                {editingNote ? 'Edit Note' : 'Create New Note'}
              </h2>
              <button className={styles.closeButton} onClick={handleCloseModal}>
                <X size={24} />
              </button>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="input"
                placeholder="Enter note title..."
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="input"
                placeholder="e.g., Biology, Math, History"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Content</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                className="input textarea"
                placeholder="Write your note content here..."
                rows={8}
              />
            </div>

            <div className={styles.modalActions}>
              {editingNote && (
                <button 
                  className="btn btn-secondary"
                  onClick={() => {
                    handleDeleteNote(editingNote.id);
                    handleCloseModal();
                  }}
                >
                  Delete
                </button>
              )}
              <button className="btn btn-secondary" onClick={handleCloseModal}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                {editingNote ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
