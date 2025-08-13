"use client"

import { CalendarEvent } from '@/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CalendarDays, Clock, BookOpen, FileText, Users, GraduationCap } from "lucide-react"
import { useState } from 'react'

interface CalendarPanelProps {
  events: CalendarEvent[]
}

/**
 * CalendarPanel component displays a monthly calendar with highlighted assignment deadlines
 * and upcoming events with different colors based on event type
 */
export function CalendarPanel({ events }: CalendarPanelProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'assignment':
        return <FileText className="w-3 h-3" />
      case 'exam':
        return <GraduationCap className="w-3 h-3" />
      case 'class':
        return <BookOpen className="w-3 h-3" />
      case 'meeting':
        return <Users className="w-3 h-3" />
      default:
        return <CalendarDays className="w-3 h-3" />
    }
  }

  const getEventBadgeStyle = (type: string) => {
    const styles = {
      assignment: 'bg-red-500/20 text-red-400 border-red-500/30',
      exam: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      class: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      meeting: 'bg-green-500/20 text-green-400 border-green-500/30'
    }
    return styles[type as keyof typeof styles] || 'bg-gray-500/20 text-gray-400'
  }

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    )
  }

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : []

  const hasEvents = (date: Date) => {
    return events.some(event => event.date.toDateString() === date.toDateString())
  }

  return (
    <Card className="h-full glassmorphic flex flex-col">
      <CardHeader className="p-4 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center space-x-2">
          <CalendarDays className="w-5 h-5 text-purple-400" />
          <div>
            <CardTitle className="text-sm font-medium text-foreground">Academic Calendar</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Track deadlines and events
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 flex flex-col flex-1 overflow-hidden">
        <div className="mb-4 flex-shrink-0">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border-none"
            classNames={{
              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-4",
              caption: "flex justify-center pt-1 relative items-center",
              caption_label: "text-sm font-medium text-foreground",
              nav: "space-x-1 flex items-center",
              nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 glassmorphic",
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
              row: "flex w-full mt-2",
              cell: `relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md`,
              day: `h-8 w-8 p-0 font-normal aria-selected:opacity-100 glassmorphic text-xs ${hasEvents(selectedDate || new Date()) ? 'bg-purple-500/20 text-purple-400' : ''}`,
              day_range_end: "day-range-end",
              day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
              day_today: "bg-accent text-accent-foreground",
              day_outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
              day_disabled: "text-muted-foreground opacity-50",
              day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
              day_hidden: "invisible",
            }}
            modifiers={{
              hasEvents: (date) => hasEvents(date)
            }}
            modifiersClassNames={{
              hasEvents: "bg-purple-500/30 text-purple-300 font-semibold"
            }}
          />
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <h3 className="text-sm font-medium text-foreground mb-3 flex-shrink-0">
            {selectedDate ? `Events for ${selectedDate.toDateString()}` : 'Select a date'}
          </h3>
          
          <div className="flex-1 overflow-y-auto">
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-2 pr-2">
                {selectedDateEvents.map((event) => (
                  <div
                    key={event.id}
                    className="glassmorphic p-3 rounded-lg border border-white/10 hover:glow-purple transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm font-medium text-foreground">{event.title}</h4>
                      <Badge className={`glassmorphic ${getEventBadgeStyle(event.type)}`}>
                        {getEventIcon(event.type)}
                        <span className="ml-1 text-xs">{event.type}</span>
                      </Badge>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="w-3 h-3 mr-1" />
                      {event.date.toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CalendarDays className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No events scheduled</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
