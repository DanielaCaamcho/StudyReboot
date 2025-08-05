export interface StudySession {
  id: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // in seconds
  date: string;
}

export interface Question {
  id: string;
  text: string;
  category: string;
  isResolved: boolean;
  notes?: string;
  createdAt: Date;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  text: string;
  isCompleted: boolean;
  createdAt: Date;
  category?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time?: string;
  type: 'exam' | 'assignment' | 'study' | 'other';
  description?: string;
}

export interface MoodEntry {
  id: string;
  date: string;
  mood: 'excellent' | 'good' | 'okay' | 'stressed' | 'sad';
  note?: string;
  studyHours?: number;
}

export interface StudyStats {
  totalHoursToday: number;
  totalHoursWeek: number;
  totalHoursMonth: number;
  averageDailyHours: number;
  mostProductiveDays: string[];
  weeklyData: { day: string; hours: number }[];
}

export type Page = 'home' | 'questions' | 'notes' | 'calendar' | 'mood' | 'stats';
