import { useState } from 'react';
import { Heart } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useTimer } from '../../hooks/useTimer';
import type { MoodEntry } from '../../types';
import styles from './Mood.module.css';

export function Mood() {
  const [moodEntries, setMoodEntries] = useLocalStorage<MoodEntry[]>('moodEntries', []);
  const [selectedMood, setSelectedMood] = useState<MoodEntry['mood'] | null>(null);
  const [note, setNote] = useState('');
  const [period, setPeriod] = useState<'week' | 'month'>('week');
  const { sessions } = useTimer();

  const moodOptions = [
    { value: 'excellent' as const, emoji: '😄', label: 'Excellent' },
    { value: 'good' as const, emoji: '😊', label: 'Good' },
    { value: 'okay' as const, emoji: '😐', label: 'Okay' },
    { value: 'stressed' as const, emoji: '😰', label: 'Stressed' },
    { value: 'sad' as const, emoji: '😢', label: 'Sad' }
  ];

  const today = new Date().toISOString().split('T')[0];
  const todayEntry = moodEntries.find(entry => entry.date === today);

  // Calculate today's study hours
  const todaySessions = sessions.filter(session => session.date === today);
  const todayStudyHours = todaySessions.reduce((total, session) => total + session.duration, 0) / 3600;

  const handleSaveMood = () => {
    if (selectedMood) {
      const entry: MoodEntry = {
        id: Date.now().toString(),
        date: today,
        mood: selectedMood,
        note: note.trim() || undefined,
        studyHours: todayStudyHours
      };

      if (todayEntry) {
        // Update existing entry
        setMoodEntries(prev => 
          prev.map(e => e.id === todayEntry.id ? entry : e)
        );
      } else {
        // Add new entry
        setMoodEntries(prev => [entry, ...prev]);
      }

      setSelectedMood(null);
      setNote('');
    }
  };

  // Get entries for selected period
  const getPeriodEntries = () => {
    const now = new Date();
    const daysAgo = period === 'week' ? 7 : 30;
    const startDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    
    return moodEntries.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate >= startDate;
    });
  };

  const periodEntries = getPeriodEntries();

  // Calculate stats
  const averageMoodScore = periodEntries.length > 0 
    ? periodEntries.reduce((sum, entry) => {
        const scores = { excellent: 5, good: 4, okay: 3, stressed: 2, sad: 1 };
        return sum + scores[entry.mood];
      }, 0) / periodEntries.length
    : 0;

  const averageStudyHours = periodEntries.length > 0
    ? periodEntries.reduce((sum, entry) => sum + (entry.studyHours || 0), 0) / periodEntries.length
    : 0;

  const mostCommonMood = periodEntries.length > 0 
    ? Object.entries(
        periodEntries.reduce((acc, entry) => {
          acc[entry.mood] = (acc[entry.mood] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      ).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A'
    : 'N/A';

  return (
    <div className={styles.moodPage}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <Heart className={styles.titleIcon} size={28} />
          Mood
        </h1>
        <p className={styles.subtitle}>
          {period === 'week' ? 'Past Week' : 'Past Month'}
        </p>
      </header>

      {!todayEntry && (
        <div className={styles.currentMoodSection}>
          <h2 className={styles.sectionTitle}>How are you feeling today?</h2>
          
          <div className={styles.moodOptions}>
            {moodOptions.map(option => (
              <button
                key={option.value}
                className={`${styles.moodOption} ${selectedMood === option.value ? styles.selected : ''}`}
                onClick={() => setSelectedMood(option.value)}
              >
                <div className={styles.moodEmoji}>{option.emoji}</div>
                <div className={styles.moodLabel}>{option.label}</div>
              </button>
            ))}
          </div>

          <textarea
            placeholder="Add a note about your day (optional)..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className={`input textarea ${styles.noteInput}`}
            rows={3}
          />

          <button 
            className={`btn btn-primary ${styles.saveButton}`}
            onClick={handleSaveMood}
            disabled={!selectedMood}
          >
            Save Mood
          </button>
        </div>
      )}

      {todayEntry && (
        <div className={styles.currentMoodSection}>
          <h2 className={styles.sectionTitle}>Today's Mood</h2>
          <div className={styles.moodEntry}>
            <div className={styles.entryMood}>
              {moodOptions.find(m => m.value === todayEntry.mood)?.emoji}
            </div>
            <div className={styles.entryContent}>
              <div className={styles.entryDate}>Today</div>
              {todayEntry.note && (
                <div className={styles.entryNote}>{todayEntry.note}</div>
              )}
              {todayEntry.studyHours && todayEntry.studyHours > 0 && (
                <div className={styles.entryStudyHours}>
                  {todayEntry.studyHours.toFixed(1)}h studied
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className={styles.historySection}>
        <div className={styles.historyCard}>
          <div className={styles.periodSelector}>
            <button
              className={`${styles.periodButton} ${period === 'week' ? styles.active : ''}`}
              onClick={() => setPeriod('week')}
            >
              Past Week
            </button>
            <button
              className={`${styles.periodButton} ${period === 'month' ? styles.active : ''}`}
              onClick={() => setPeriod('month')}
            >
              Past Month
            </button>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statValue}>
                {averageMoodScore.toFixed(1)}
              </div>
              <div className={styles.statLabel}>Avg Mood Score</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>
                {averageStudyHours.toFixed(1)}h
              </div>
              <div className={styles.statLabel}>Avg Study Hours</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>
                {moodOptions.find(m => m.value === mostCommonMood)?.emoji || '—'}
              </div>
              <div className={styles.statLabel}>Most Common</div>
            </div>
          </div>

          <h3 className={styles.sectionTitle}>Mood History</h3>
          <div className={styles.moodHistory}>
            {periodEntries.length === 0 ? (
              <div className={styles.emptyState}>
                <p>No mood entries for this period.</p>
              </div>
            ) : (
              periodEntries.map(entry => (
                <div key={entry.id} className={styles.moodEntry}>
                  <div className={styles.entryMood}>
                    {moodOptions.find(m => m.value === entry.mood)?.emoji}
                  </div>
                  <div className={styles.entryContent}>
                    <div className={styles.entryDate}>
                      {new Date(entry.date).toLocaleDateString()}
                    </div>
                    {entry.note && (
                      <div className={styles.entryNote}>{entry.note}</div>
                    )}
                    {entry.studyHours && entry.studyHours > 0 && (
                      <div className={styles.entryStudyHours}>
                        {entry.studyHours.toFixed(1)}h studied
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
