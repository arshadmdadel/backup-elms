export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  avatar?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  teacher: string;
  enrolledStudents: number;
  color: string;
}

export interface Material {
  id: string;
  courseId: string;
  title: string;
  type: 'pdf' | 'pptx' | 'docx' | 'video';
  url: string;
  uploadDate: string;
  size: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  avatar?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: 'assignment' | 'exam' | 'class' | 'meeting';
  courseId?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
