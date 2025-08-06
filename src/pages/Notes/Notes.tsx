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
    if (formData.title.trim() && formData.content.trim()) {
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
          title: formData.title.trim(),
          content: formData.content.trim(),
          category: formData.category.trim() || 'General',
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
    if (confirm('¿Estás seguro de que quieres eliminar esta nota?')) {
      setNotes(prev => prev.filter(note => note.id !== id));
    }
  };

  return (
    <div className={styles.notesPage}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <FileText className={styles.titleIcon} size={28} />
          Notas
        </h1>
        <button 
          className={styles.addButton}
          onClick={() => setShowModal(true)}
        >
          <Plus size={24} />
          <span style={{ display: window.innerWidth >= 768 ? 'inline' : 'none' }}>
            Agregar Nota
          </span>
        </button>
      </header>

      <div className={styles.searchContainer}>
        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} size={20} />
          <input
            type="text"
            placeholder="Buscar notas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.notesList}>
        {filteredNotes.length === 0 ? (
          <div className={styles.emptyState}>
            <FileText className={styles.emptyIcon} size={48} />
            <p>No se encontraron notas. ¡Crea tu primera nota!</p>
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
                {editingNote ? 'Editar Nota' : 'Crear Nueva Nota'}
              </h2>
              <button className={styles.closeButton} onClick={handleCloseModal}>
                <X size={24} />
              </button>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Título</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="input"
                placeholder="Ingresa el título de la nota..."
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Categoría</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="input"
                placeholder="ej. Biología, Matemáticas, Historia"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Contenido</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                className="input textarea"
                placeholder="Escribe el contenido de tu nota aquí..."
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
                  Eliminar
                </button>
              )}
              <button className="btn btn-secondary" onClick={handleCloseModal}>
                Cancelar
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                {editingNote ? 'Actualizar' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
