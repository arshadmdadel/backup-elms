import { Course, Material, ChatMessage, CalendarEvent } from '@/types';

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Advanced React Development',
    description: 'Deep dive into React hooks, context, and performance optimization',
    teacher: 'Dr. Sarah Johnson',
    enrolledStudents: 45,
    color: 'bg-gradient-to-r from-cyan-500 to-blue-500'
  },
  {
    id: '2',
    title: 'Machine Learning Fundamentals',
    description: 'Introduction to ML algorithms and data science',
    teacher: 'Prof. Michael Chen',
    enrolledStudents: 38,
    color: 'bg-gradient-to-r from-purple-500 to-pink-500'
  },
  {
    id: '3',
    title: 'Database Design & SQL',
    description: 'Relational database concepts and advanced SQL queries',
    teacher: 'Dr. Emily Rodriguez',
    enrolledStudents: 52,
    color: 'bg-gradient-to-r from-green-500 to-teal-500'
  },
  {
    id: '4',
    title: 'Web Security & Cryptography',
    description: 'Modern web security practices and cryptographic protocols',
    teacher: 'Prof. David Kim',
    enrolledStudents: 29,
    color: 'bg-gradient-to-r from-orange-500 to-red-500'
  }
];

export const mockMaterials: Material[] = [
  {
    id: '1',
    courseId: '1',
    title: 'React Hooks Deep Dive',
    type: 'pdf',
    url: '#', // Mock URL - would be replaced with actual file in production
    uploadDate: '2024-03-15',
    size: '2.5 MB'
  },
  {
    id: '2',
    courseId: '1',
    title: 'Component Optimization Techniques',
    type: 'pptx',
    url: '#', // Mock URL - would be replaced with actual file in production
    uploadDate: '2024-03-14',
    size: '8.1 MB'
  },
  {
    id: '3',
    courseId: '1',
    title: 'State Management Best Practices',
    type: 'docx',
    url: '#', // Mock URL - would be replaced with actual file in production
    uploadDate: '2024-03-13',
    size: '1.2 MB'
  },
  {
    id: '4',
    courseId: '1',
    title: 'Advanced React Patterns Tutorial',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Safe demo video
    uploadDate: '2024-03-12',
    size: '45 min'
  },
  {
    id: '5',
    courseId: '2',
    title: 'Linear Regression Introduction',
    type: 'pdf',
    url: '#', // Mock URL - would be replaced with actual file in production
    uploadDate: '2024-03-10',
    size: '3.8 MB'
  },
  {
    id: '6',
    courseId: '2',
    title: 'Data Preprocessing Workshop',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Safe demo video
    uploadDate: '2024-03-08',
    size: '38 min'
  }
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    sender: 'Alice Cooper',
    message: 'Has anyone started working on the React assignment yet?',
    timestamp: '2024-03-15T10:30:00Z'
  },
  {
    id: '2',
    sender: 'Bob Wilson',
    message: 'I\'m having trouble with the useEffect hook in the third exercise.',
    timestamp: '2024-03-15T10:32:00Z'
  },
  {
    id: '3',
    sender: 'Dr. Sarah Johnson',
    message: 'Remember that useEffect runs after every render by default. Make sure to include the dependency array!',
    timestamp: '2024-03-15T10:35:00Z'
  },
  {
    id: '4',
    sender: 'Charlie Brown',
    message: 'Thanks Dr. Johnson! That clears up the confusion.',
    timestamp: '2024-03-15T10:37:00Z'
  },
  {
    id: '5',
    sender: 'Diana Prince',
    message: 'Don\'t forget the submission deadline is tomorrow at 11:59 PM!',
    timestamp: '2024-03-15T11:00:00Z'
  }
];

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'React Assignment Due',
    date: new Date('2024-03-16'),
    type: 'assignment',
    courseId: '1'
  },
  {
    id: '2',
    title: 'ML Midterm Exam',
    date: new Date('2024-03-20'),
    type: 'exam',
    courseId: '2'
  },
  {
    id: '3',
    title: 'Database Design Workshop',
    date: new Date('2024-03-18'),
    type: 'class',
    courseId: '3'
  },
  {
    id: '4',
    title: 'Project Team Meeting',
    date: new Date('2024-03-17'),
    type: 'meeting'
  },
  {
    id: '5',
    title: 'Security Lab Session',
    date: new Date('2024-03-22'),
    type: 'class',
    courseId: '4'
  }
];
