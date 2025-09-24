"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { User } from "@/types"
import { 
  LogOut, 
  Settings, 
  User as UserIcon, 
  GraduationCap,
  BookOpen,
  Users,
  UserPlus,
  Plus,
  Trash2,
  Edit,
  Shield,
  School,
  Calendar,
  UserCheck,
  UserX,
  Check,
  X,
  Activity,
  BarChart3,
  TrendingUp,
  Clock
} from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

// Mock data for admin
const mockCourses = [
  {
    id: '1',
    title: 'Advanced React Development',
    sections: ['CSE-401-A', 'CSE-401-B'],
    teachers: ['Dr. Sarah Johnson', 'Prof. Michael Chen'],
    totalStudents: 83,
    color: 'from-cyan-500/20 to-blue-500/20',
    sectionStudents: [
      { section: 'CSE-401-A', students: 45 },
      { section: 'CSE-401-B', students: 38 }
    ]
  },
  {
    id: '2',
    title: 'Machine Learning Fundamentals',
    sections: ['CSE-402-A', 'CSE-402-B'],
    teachers: ['Prof. Michael Chen', 'Dr. Emily Davis'],
    totalStudents: 76,
    color: 'from-purple-500/20 to-pink-500/20',
    sectionStudents: [
      { section: 'CSE-402-A', students: 42 },
      { section: 'CSE-402-B', students: 34 }
    ]
  },
  {
    id: '3',
    title: 'Database Design & SQL',
    sections: ['CSE-301-A', 'CSE-301-B', 'CSE-301-C'],
    teachers: ['Dr. Sarah Johnson', 'Prof. Robert Wilson'],
    totalStudents: 124,
    color: 'from-green-500/20 to-emerald-500/20',
    sectionStudents: [
      { section: 'CSE-301-A', students: 45 },
      { section: 'CSE-301-B', students: 42 },
      { section: 'CSE-301-C', students: 37 }
    ]
  }
]

const mockTeachers = [
  { id: '1', name: 'Dr. Sarah Johnson', email: 'sarah.johnson@elms.edu', courses: 2, students: 97 },
  { id: '2', name: 'Prof. Michael Chen', email: 'michael.chen@elms.edu', courses: 2, students: 76 },
  { id: '3', name: 'Dr. Emily Davis', email: 'emily.davis@elms.edu', courses: 1, students: 38 },
  { id: '4', name: 'Prof. Robert Wilson', email: 'robert.wilson@elms.edu', courses: 1, students: 52 }
]

const mockStudents = [
  { id: '1', name: 'Alice Johnson', email: 'alice@student.elms.edu', courses: 3, section: 'CSE-401-A' },
  { id: '2', name: 'Bob Smith', email: 'bob@student.elms.edu', courses: 2, section: 'CSE-402-B' },
  { id: '3', name: 'Carol Davis', email: 'carol@student.elms.edu', courses: 4, section: 'CSE-301-C' },
  { id: '4', name: 'David Wilson', email: 'david@student.elms.edu', courses: 3, section: 'CSE-401-B' }
]

// Mock activity logs
const mockActivityLogs = [
  { id: 1, user: 'Admin', action: 'Created course', target: 'Advanced React Development', time: '2 hours ago', type: 'create' },
  { id: 2, user: 'Admin', action: 'Assigned teacher', target: 'Dr. Sarah Johnson to CSE-401-A', time: '3 hours ago', type: 'assign' },
  { id: 3, user: 'Admin', action: 'Enrolled student', target: 'Alice Johnson in CSE-401-A', time: '5 hours ago', type: 'enroll' },
  { id: 4, user: 'Admin', action: 'Updated course', target: 'Machine Learning Fundamentals', time: '1 day ago', type: 'update' },
  { id: 5, user: 'Admin', action: 'Removed student', target: 'John Doe from CSE-301-B', time: '2 days ago', type: 'remove' },
  { id: 6, user: 'Admin', action: 'Created section', target: 'CSE-301-C', time: '3 days ago', type: 'create' },
  { id: 7, user: 'Admin', action: 'Assigned teacher', target: 'Prof. Robert Wilson to CSE-301-C', time: '3 days ago', type: 'assign' }
]

// Mock data for charts
const courseGrowthData = [
  { month: 'Jan', courses: 12, students: 280 },
  { month: 'Feb', courses: 14, students: 320 },
  { month: 'Mar', courses: 15, students: 380 },
  { month: 'Apr', courses: 18, students: 420 },
  { month: 'May', courses: 20, students: 460 },
  { month: 'Jun', courses: 22, students: 510 }
]

const teacherLoadData = [
  { name: 'Dr. Sarah', load: 97 },
  { name: 'Prof. Michael', load: 76 },
  { name: 'Dr. Emily', load: 38 },
  { name: 'Prof. Robert', load: 52 }
]

const COLORS = ['#06b6d4', '#a855f7', '#10b981', '#f59e0b']

export default function AdminDashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [newCourseName, setNewCourseName] = useState('')
  const [newSectionName, setNewSectionName] = useState('')
  const [selectedCourse, setSelectedCourse] = useState('')
  const [selectedChartCourse, setSelectedChartCourse] = useState('1')
  const router = useRouter()

  // Inline editing states
  const [editingCourse, setEditingCourse] = useState<string | null>(null)
  const [editingTeacher, setEditingTeacher] = useState<string | null>(null)
  const [editingStudent, setEditingStudent] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')

  // Local state for courses, teachers, students to enable editing
  const [courses, setCourses] = useState(mockCourses)
  const [teachers, setTeachers] = useState(mockTeachers)
  const [students, setStudents] = useState(mockStudents)
  const [activityLogs, setActivityLogs] = useState(mockActivityLogs)

  useEffect(() => {
    // Check authentication
    const authData = localStorage.getItem('auth')
    if (!authData) {
      router.push('/')
      return
    }

    const auth = JSON.parse(authData)
    if (!auth.isAuthenticated || auth.user.role !== 'admin') {
      router.push('/')
      return
    }

    setUser(auth.user)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('auth')
    router.push('/')
  }

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault()
    const newCourse = {
      id: String(courses.length + 1),
      title: newCourseName,
      sections: [],
      teachers: [],
      totalStudents: 0,
      color: 'from-yellow-500/20 to-red-500/20',
      sectionStudents: []
    }
    setCourses([...courses, newCourse])
    
    // Add to activity log
    const newLog = {
      id: activityLogs.length + 1,
      user: 'Admin',
      action: 'Created course',
      target: newCourseName,
      time: 'Just now',
      type: 'create'
    }
    setActivityLogs([newLog, ...activityLogs])
    
    setNewCourseName('')
  }

  const handleCreateSection = (e: React.FormEvent) => {
    e.preventDefault()
    const courseIndex = courses.findIndex(c => c.id === selectedCourse)
    if (courseIndex !== -1) {
      const updatedCourses = [...courses]
      updatedCourses[courseIndex].sections.push(newSectionName)
      setCourses(updatedCourses)
      
      // Add to activity log
      const newLog = {
        id: activityLogs.length + 1,
        user: 'Admin',
        action: 'Created section',
        target: newSectionName,
        time: 'Just now',
        type: 'create'
      }
      setActivityLogs([newLog, ...activityLogs])
    }
    setNewSectionName('')
  }

  // Inline editing functions
  const startEditCourse = (courseId: string, currentTitle: string) => {
    setEditingCourse(courseId)
    setEditValue(currentTitle)
  }

  const saveEditCourse = (courseId: string) => {
    const updatedCourses = courses.map(c => 
      c.id === courseId ? { ...c, title: editValue } : c
    )
    setCourses(updatedCourses)
    
    // Add to activity log
    const newLog = {
      id: activityLogs.length + 1,
      user: 'Admin',
      action: 'Updated course',
      target: editValue,
      time: 'Just now',
      type: 'update'
    }
    setActivityLogs([newLog, ...activityLogs])
    
    setEditingCourse(null)
    setEditValue('')
  }

  const startEditTeacher = (teacherId: string, currentName: string) => {
    setEditingTeacher(teacherId)
    setEditValue(currentName)
  }

  const saveEditTeacher = (teacherId: string) => {
    const updatedTeachers = teachers.map(t => 
      t.id === teacherId ? { ...t, name: editValue } : t
    )
    setTeachers(updatedTeachers)
    
    // Add to activity log
    const newLog = {
      id: activityLogs.length + 1,
      user: 'Admin',
      action: 'Updated teacher',
      target: editValue,
      time: 'Just now',
      type: 'update'
    }
    setActivityLogs([newLog, ...activityLogs])
    
    setEditingTeacher(null)
    setEditValue('')
  }

  const startEditStudent = (studentId: string, currentName: string) => {
    setEditingStudent(studentId)
    setEditValue(currentName)
  }

  const saveEditStudent = (studentId: string) => {
    const updatedStudents = students.map(s => 
      s.id === studentId ? { ...s, name: editValue } : s
    )
    setStudents(updatedStudents)
    
    // Add to activity log
    const newLog = {
      id: activityLogs.length + 1,
      user: 'Admin',
      action: 'Updated student',
      target: editValue,
      time: 'Just now',
      type: 'update'
    }
    setActivityLogs([newLog, ...activityLogs])
    
    setEditingStudent(null)
    setEditValue('')
  }

  const cancelEdit = () => {
    setEditingCourse(null)
    setEditingTeacher(null)
    setEditingStudent(null)
    setEditValue('')
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <span className="text-foreground">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header */}
      <header className="glassmorphic border-b border-white/10 p-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <GraduationCap className="w-8 h-8 text-cyan-400" />
              <div>
                <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">System Administrator Panel</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="glassmorphic">
              <Shield className="w-3 h-3 mr-1" />
              Administrator
            </Badge>
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-to-br from-red-500/20 to-orange-500/20 text-red-400">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="glassmorphic" align="end">
                <DropdownMenuItem>
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>{user.name}</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 glassmorphic">
            <TabsTrigger value="courses" className="glassmorphic hover:glow-cyan">
              <BookOpen className="w-4 h-4 mr-2" />
              Courses
            </TabsTrigger>
            <TabsTrigger value="teachers" className="glassmorphic hover:glow-purple">
              <Users className="w-4 h-4 mr-2" />
              Teachers
            </TabsTrigger>
            <TabsTrigger value="students" className="glassmorphic hover:glow-green">
              <School className="w-4 h-4 mr-2" />
              Students
            </TabsTrigger>
            <TabsTrigger value="assignments" className="glassmorphic hover:glow-yellow">
              <UserPlus className="w-4 h-4 mr-2" />
              Assignments
            </TabsTrigger>
            <TabsTrigger value="reports" className="glassmorphic hover:glow-blue">
              <BarChart3 className="w-4 h-4 mr-2" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="activity" className="glassmorphic hover:glow-orange">
              <Activity className="w-4 h-4 mr-2" />
              Activity
            </TabsTrigger>
          </TabsList>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Create Course */}
              <Card className="glassmorphic">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Plus className="w-5 h-5 mr-2 text-cyan-400" />
                    Create New Course
                  </CardTitle>
                  <CardDescription>
                    Add a new course to the system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateCourse} className="space-y-4">
                    <Input
                      placeholder="Course name (e.g., Advanced React Development)"
                      value={newCourseName}
                      onChange={(e) => setNewCourseName(e.target.value)}
                      className="glassmorphic border-white/20"
                      required
                    />
                    <Button type="submit" className="w-full glassmorphic hover:glow-cyan">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Course
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Create Section */}
              <Card className="glassmorphic">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Plus className="w-5 h-5 mr-2 text-purple-400" />
                    Create New Section
                  </CardTitle>
                  <CardDescription>
                    Add a section to an existing course
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateSection} className="space-y-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-between glassmorphic">
                          {selectedCourse ? courses.find(c => c.id === selectedCourse)?.title : "Select Course"}
                          <Edit className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="glassmorphic w-full">
                        {courses.map((course) => (
                          <DropdownMenuItem
                            key={course.id}
                            onClick={() => setSelectedCourse(course.id)}
                          >
                            {course.title}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Input
                      placeholder="Section name (e.g., CSE-401-C)"
                      value={newSectionName}
                      onChange={(e) => setNewSectionName(e.target.value)}
                      className="glassmorphic border-white/20"
                      required
                    />
                    <Button type="submit" className="w-full glassmorphic hover:glow-purple">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Section
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Existing Courses with Inline Editing */}
            <Card className="glassmorphic">
              <CardHeader>
                <CardTitle>Existing Courses</CardTitle>
                <CardDescription>
                  {courses.length} courses with {courses.reduce((acc, course) => acc + course.sections.length, 0)} sections
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div key={course.id} className="glassmorphic p-4 rounded-lg">
                      <div className={`w-full h-2 bg-gradient-to-r ${course.color} rounded-full mb-3`} />
                      <div className="flex items-center justify-between mb-2">
                        {editingCourse === course.id ? (
                          <div className="flex items-center space-x-2 flex-1">
                            <Input
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="glassmorphic border-white/20"
                              autoFocus
                            />
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => saveEditCourse(course.id)}
                              className="glassmorphic hover:glow-green"
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={cancelEdit}
                              className="glassmorphic hover:glow-red"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ) : (
                          <>
                            <h3 
                              className="font-semibold text-foreground cursor-pointer hover:opacity-80"
                              onClick={() => startEditCourse(course.id, course.title)}
                            >
                              {course.title}
                            </h3>
                            <div className="flex space-x-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="glassmorphic hover:glow-blue"
                                onClick={() => startEditCourse(course.id, course.title)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="glassmorphic hover:glow-red"
                                onClick={() => {
                                  if (window.confirm(`Are you sure you want to delete "${course.title}"? This action cannot be undone.`)) {
                                    setCourses(courses.filter(c => c.id !== course.id))
                                    const newLog = {
                                      id: activityLogs.length + 1,
                                      user: 'Admin',
                                      action: 'Deleted course',
                                      target: course.title,
                                      time: 'Just now',
                                      type: 'remove'
                                    }
                                    setActivityLogs([newLog, ...activityLogs])
                                  }
                                }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div>
                          <span className="font-medium">Sections: </span>
                          {course.sections.join(', ')}
                        </div>
                        <div>
                          <span className="font-medium">Students: </span>
                          {course.totalStudents}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Teachers Tab with Inline Editing */}
          <TabsContent value="teachers">
            <Card className="glassmorphic">
              <CardHeader>
                <CardTitle>Teacher Management</CardTitle>
                <CardDescription>
                  {teachers.length} teachers in the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {teachers.map((teacher) => (
                    <div key={teacher.id} className="flex items-center justify-between p-4 glassmorphic rounded-lg">
                      <div className="flex items-center space-x-3 flex-1">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-400">
                            {teacher.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          {editingTeacher === teacher.id ? (
                            <div className="flex items-center space-x-2">
                              <Input
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                className="glassmorphic border-white/20"
                                autoFocus
                              />
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => saveEditTeacher(teacher.id)}
                                className="glassmorphic hover:glow-green"
                              >
                                <Check className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={cancelEdit}
                                className="glassmorphic hover:glow-red"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          ) : (
                            <>
                              <p 
                                className="font-medium text-foreground cursor-pointer hover:opacity-80"
                                onClick={() => startEditTeacher(teacher.id, teacher.name)}
                              >
                                {teacher.name}
                              </p>
                              <p className="text-sm text-muted-foreground">{teacher.email}</p>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right text-sm text-muted-foreground">
                          <p>{teacher.courses} courses</p>
                          <p>{teacher.students} students</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="glassmorphic">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="glassmorphic">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => startEditTeacher(teacher.id, teacher.name)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Name
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <UserPlus className="w-4 h-4 mr-2" />
                              Assign to Course
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <UserX className="w-4 h-4 mr-2" />
                              Remove from Course
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-400">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Remove Teacher
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Students Tab with Inline Editing */}
          <TabsContent value="students">
            <Card className="glassmorphic">
              <CardHeader>
                <CardTitle>Student Management</CardTitle>
                <CardDescription>
                  {students.length} students enrolled
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {students.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-4 glassmorphic rounded-lg">
                      <div className="flex items-center space-x-3 flex-1">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-400">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          {editingStudent === student.id ? (
                            <div className="flex items-center space-x-2">
                              <Input
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                                              className="glassmorphic border-white/20"
                                                              autoFocus
                                                            />
                                                            <Button 
                                                              variant="ghost" 
                                                              size="sm" 
                                                              onClick={() => saveEditStudent(student.id)}
                                                              className="glassmorphic hover:glow-green"
                                                            >
                                                              <Check className="w-4 h-4" />
                                                            </Button>
                                                            <Button 
                                                              variant="ghost" 
                                                              size="sm" 
                                                              onClick={cancelEdit}
                                                              className="glassmorphic hover:glow-red"
                                                            >
                                                              <X className="w-4 h-4" />
                                                            </Button>
                                                          </div>
                                                        ) : (
                                                          <>
                                                            <p 
                                                              className="font-medium text-foreground cursor-pointer hover:opacity-80"
                                                              onClick={() => startEditStudent(student.id, student.name)}
                                                            >
                                                              {student.name}
                                                            </p>
                                                            <p className="text-sm text-muted-foreground">{student.email}</p>
                                                          </>
                                                        )}
                                                      </div>
                                                    </div>
                                                    <div className="flex items-center space-x-4">
                                                      <div className="text-right text-sm text-muted-foreground">
                                                        <p>{student.courses} courses</p>
                                                        <p>{student.section}</p>
                                                      </div>
                                                      <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                          <Button variant="ghost" size="sm" className="glassmorphic">
                                                            <Edit className="w-4 h-4" />
                                                          </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent className="glassmorphic">
                                                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                          <DropdownMenuItem onClick={() => startEditStudent(student.id, student.name)}>
                                                            <Edit className="w-4 h-4 mr-2" />
                                                            Edit Name
                                                          </DropdownMenuItem>
                                                          <DropdownMenuItem>
                                                            <UserCheck className="w-4 h-4 mr-2" />
                                                            Assign to Section
                                                          </DropdownMenuItem>
                                                          <DropdownMenuItem>
                                                            <UserX className="w-4 h-4 mr-2" />
                                                            Remove from Section
                                                          </DropdownMenuItem>
                                                          <DropdownMenuSeparator />
                                                          <DropdownMenuItem className="text-red-400">
                                                            <Trash2 className="w-4 h-4 mr-2" />
                                                            Remove Student
                                                          </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                      </DropdownMenu>
                                                    </div>
                                                  </div>
                                                ))}
                                              </div>
                                            </CardContent>
                                          </Card>
                                        </TabsContent>
                              
                                        {/* Assignments Tab (Placeholder) */}
                                        <TabsContent value="assignments">
                                          <Card className="glassmorphic">
                                            <CardHeader>
                                              <CardTitle>Assignments</CardTitle>
                                              <CardDescription>
                                                Manage course assignments and teacher/student allocations.
                                              </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                              <div className="text-muted-foreground">
                                                Assignment management features coming soon.
                                              </div>
                                            </CardContent>
                                          </Card>
                                        </TabsContent>
                              
                                        {/* Reports Tab (Charts) */}
                                        <TabsContent value="reports">
                                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            {/* Course Growth Chart */}
                                            <Card className="glassmorphic">
                                              <CardHeader>
                                                <CardTitle className="flex items-center">
                                                  <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
                                                  Course & Student Growth
                                                </CardTitle>
                                                <CardDescription>
                                                  Track the growth of courses and student enrollment over time.
                                                </CardDescription>
                                              </CardHeader>
                                              <CardContent>
                                                <ResponsiveContainer width="100%" height={250}>
                                                  <LineChart data={courseGrowthData}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="month" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Line type="monotone" dataKey="courses" stroke="#06b6d4" name="Courses" />
                                                    <Line type="monotone" dataKey="students" stroke="#a855f7" name="Students" />
                                                  </LineChart>
                                                </ResponsiveContainer>
                                              </CardContent>
                                            </Card>
                              
                                            {/* Teacher Load Chart */}
                                            <Card className="glassmorphic">
                                              <CardHeader>
                                                <CardTitle className="flex items-center">
                                                  <BarChart3 className="w-5 h-5 mr-2 text-purple-400" />
                                                  Teacher Load
                                                </CardTitle>
                                                <CardDescription>
                                                  Visualize teacher workload by number of students.
                                                </CardDescription>
                                              </CardHeader>
                                              <CardContent>
                                                <ResponsiveContainer width="100%" height={250}>
                                                  <BarChart data={teacherLoadData}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="name" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Bar dataKey="load" fill="#a855f7" name="Student Load" />
                                                  </BarChart>
                                                </ResponsiveContainer>
                                              </CardContent>
                                            </Card>
                                          </div>
                                        </TabsContent>
                              
                                        {/* Activity Tab */}
                                        <TabsContent value="activity">
                                          <Card className="glassmorphic">
                                            <CardHeader>
                                              <CardTitle>Recent Activity</CardTitle>
                                              <CardDescription>
                                                System logs and recent actions performed by admin.
                                              </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                              <div className="space-y-3">
                                                {activityLogs.map((log) => (
                                                  <div key={log.id} className="flex items-center justify-between p-3 glassmorphic rounded-lg">
                                                    <div className="flex items-center space-x-3">
                                                      <Avatar className="h-8 w-8">
                                                        <AvatarFallback className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 text-orange-400">
                                                          {log.user.charAt(0).toUpperCase()}
                                                        </AvatarFallback>
                                                      </Avatar>
                                                      <div>
                                                        <span className="font-medium text-foreground">{log.user}</span>
                                                        <span className="mx-2 text-muted-foreground">{log.action}</span>
                                                        <span className="font-semibold text-cyan-400">{log.target}</span>
                                                      </div>
                                                    </div>
                                                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                                      <Clock className="w-3 h-3" />
                                                      <span>{log.time}</span>
                                                    </div>
                                                  </div>
                                                ))}
                                              </div>
                                            </CardContent>
                                          </Card>
                                        </TabsContent>
                                      </Tabs>
                                    </div>
                                  </div>
                                )
                              }