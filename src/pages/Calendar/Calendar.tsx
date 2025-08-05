import { useState } from 'react';
import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight, BookOpen, FileText, Clock } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import type { CalendarEvent } from '../../types';
import styles from './Calendar.module.css';

export function Calendar() {
  const [events, setEvents] = useLocalStorage<CalendarEvent[]>('calendarEvents', []);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    type: 'other' as CalendarEvent['type'],
    description: ''
  });

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const today = new Date().toISOString().split('T')[0];
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get first day of the month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());

  // Generate calendar days
  const calendarDays = [];
  const currentCalendarDate = new Date(startDate);
  
  for (let i = 0; i < 42; i++) {
    calendarDays.push(new Date(currentCalendarDate));
    currentCalendarDate.setDate(currentCalendarDate.getDate() + 1);
  }

  const getEventIcon = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'exam': return BookOpen;
      case 'assignment': return FileText;
      case 'study': return Clock;
      default: return CalendarIcon;
    }
  };

  const handleAddEvent = () => {
    if (newEvent.title.trim() && newEvent.date) {
      const event: CalendarEvent = {
        id: Date.now().toString(),
        title: newEvent.title,
        date: newEvent.date,
        time: newEvent.time || undefined,
        type: newEvent.type,
        description: newEvent.description || undefined
      };
      setEvents(prev => [...prev, event]);
      setNewEvent({ title: '', date: '', time: '', type: 'other', description: '' });
      setShowAddForm(false);
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  const getEventsForDate = (date: string) => {
    return events.filter(event => event.date === date);
  };

  const upcomingEvents = events
    .filter(event => event.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5);

  return (
    <div className={styles.calendarPage}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <CalendarIcon className={styles.titleIcon} size={28} />
          Calendario
        </h1>
        <button 
          className={styles.addButton}
          onClick={() => setShowAddForm(true)}
        >
          <Plus size={24} />
          <span style={{ display: window.innerWidth >= 768 ? 'inline' : 'none' }}>
            Agregar Evento
          </span>
        </button>
      </header>

      {showAddForm && (
        <div className="card" style={{ marginBottom: 'var(--spacing-lg)', padding: 'var(--spacing-md)' }}>
          <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Agregar Nuevo Evento</h3>
          <input
            type="text"
            placeholder="Título del evento"
            value={newEvent.title}
            onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
            className="input"
            style={{ marginBottom: 'var(--spacing-sm)' }}
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-sm)' }}>
            <input
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
              className="input"
            />
            <input
              type="time"
              value={newEvent.time}
              onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
              className="input"
            />
          </div>
          <select
            value={newEvent.type}
            onChange={(e) => setNewEvent(prev => ({ ...prev, type: e.target.value as CalendarEvent['type'] }))}
            className="input"
            style={{ marginBottom: 'var(--spacing-sm)' }}
          >
            <option value="other">Otro</option>
            <option value="exam">Examen</option>
            <option value="assignment">Tarea</option>
            <option value="study">Sesión de Estudio</option>
          </select>
          <textarea
            placeholder="Descripción (opcional)"
            value={newEvent.description}
            onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
            className="input textarea"
            style={{ marginBottom: 'var(--spacing-md)' }}
            rows={3}
          />
          <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
            <button className="btn btn-primary" onClick={handleAddEvent}>
              Agregar Evento
            </button>
            <button className="btn btn-secondary" onClick={() => setShowAddForm(false)}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className={styles.calendarContainer}>
        <div className={styles.calendarHeader}>
          <button className={styles.navButton} onClick={() => navigateMonth('prev')}>
            <ChevronLeft size={20} />
          </button>
          <h2 className={styles.monthYear}>
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <button className={styles.navButton} onClick={() => navigateMonth('next')}>
            <ChevronRight size={20} />
          </button>
        </div>

        <div className={styles.calendarGrid}>
          {dayNames.map(day => (
            <div key={day} className={styles.dayHeader}>
              {day}
            </div>
          ))}
          {calendarDays.map((day, index) => {
            const dateString = day.toISOString().split('T')[0];
            const isCurrentMonth = day.getMonth() === currentMonth;
            const isToday = dateString === today;
            const isSelected = dateString === selectedDate;
            const dayEvents = getEventsForDate(dateString);

            return (
              <div
                key={index}
                className={`${styles.dayCell} ${
                  !isCurrentMonth ? styles.otherMonth : ''
                } ${isToday ? styles.today : ''} ${isSelected ? styles.selected : ''}`}
                onClick={() => setSelectedDate(dateString)}
              >
                <div className={styles.dayNumber}>{day.getDate()}</div>
                {dayEvents.length > 0 && (
                  <div className={`${styles.eventDot} ${styles[dayEvents[0].type]}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.eventsList}>
        <h3 className={styles.eventsTitle}>
          <CalendarIcon size={20} />
          Próximos Eventos
        </h3>
        {upcomingEvents.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No hay eventos próximos. ¡Agrega tu primer evento!</p>
          </div>
        ) : (
          upcomingEvents.map(event => {
            const Icon = getEventIcon(event.type);
            return (
              <div key={event.id} className={styles.eventCard}>
                <div className={`${styles.eventTypeIcon} ${styles[event.type]}`}>
                  <Icon size={20} />
                </div>
                <div className={styles.eventContent}>
                  <div className={styles.eventTitle}>{event.title}</div>
                  <div className={styles.eventDate}>
                    {new Date(event.date).toLocaleDateString('es-ES', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })} 
                    {event.time && ` a las ${event.time}`}
                  </div>
                  {event.description && (
                    <div style={{ fontSize: 'var(--font-size-small)', color: 'var(--text-medium)', marginTop: 'var(--spacing-xs)' }}>
                      {event.description}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
