"use client"

import { Course } from '@/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Users, BookOpen } from "lucide-react"

interface CourseListProps {
  courses: Course[]
  selectedCourseId?: string
  onCourseSelect: (courseId: string) => void
}

/**
 * CourseList component displays a list of courses for the logged-in user
 * Features glassmorphic design with neon-punk hover effects
 */
export function CourseList({ courses, selectedCourseId, onCourseSelect }: CourseListProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-white/10 flex-shrink-0">
        <h2 className="text-xl font-semibold text-foreground mb-2">My Courses</h2>
        <Badge variant="secondary" className="glassmorphic">
          <BookOpen className="w-3 h-3 mr-1" />
          {courses.length} Enrolled
        </Badge>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-3">
          {courses.map((course) => (
            <Card
              key={course.id}
              className={`glassmorphic hover:glow-purple cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                selectedCourseId === course.id ? 'ring-2 ring-purple-500' : ''
              }`}
              onClick={() => onCourseSelect(course.id)}
            >
              <CardHeader className="p-4">
                <div className={`w-full h-3 rounded-full mb-3 ${course.color}`} />
                <CardTitle className="text-sm font-medium text-foreground leading-tight">
                  {course.title}
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground line-clamp-2">
                  {course.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{course.teacher}</span>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Users className="w-3 h-3 mr-1" />
                    {course.enrolledStudents}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
