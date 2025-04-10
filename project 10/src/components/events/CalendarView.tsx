import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';

interface CalendarViewProps {
  events: Array<{
    id: string;
    title: string;
    date: Date;
    program: string;
  }>;
}

export function CalendarView({ events }: CalendarViewProps) {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <div className="rounded-lg bg-white shadow">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            {format(today, 'MMMM yyyy')}
          </h2>
          <div className="flex gap-2">
            <button className="rounded-md px-2 py-1 text-sm text-gray-600 hover:bg-gray-100">
              Previous
            </button>
            <button className="rounded-md px-2 py-1 text-sm text-gray-600 hover:bg-gray-100">
              Next
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-7 gap-px">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div
              key={day}
              className="py-2 text-center text-sm font-medium text-gray-500"
            >
              {day}
            </div>
          ))}

          {days.map((day) => {
            const dayEvents = events.filter((event) =>
              isSameDay(event.date, day)
            );

            return (
              <div
                key={day.toString()}
                className={`min-h-[100px] border border-gray-200 p-2 ${
                  isSameDay(day, today)
                    ? 'bg-blue-50'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="text-sm font-medium text-gray-900">
                  {format(day, 'd')}
                </div>
                <div className="mt-1 space-y-1">
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className="rounded bg-blue-100 p-1 text-xs text-blue-700"
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}