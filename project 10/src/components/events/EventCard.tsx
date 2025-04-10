import React from 'react';
import { format } from 'date-fns';
import { MapPin, Video, Users, Share2, QrCode, Mail, Eye, Calendar } from 'lucide-react';

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description: string;
    date: Date;
    location: {
      type: 'in-person' | 'virtual';
      address?: string;
      link?: string;
    };
    privacy: 'public' | 'unlisted' | 'private';
    program: string;
    shifts: Array<{
      id: string;
      startTime: Date;
      endTime: Date;
      role: string;
      volunteerLimit: number;
      signedUp: number;
    }>;
  };
}

export function EventCard({ event }: EventCardProps) {
  const totalSpots = event.shifts.reduce((acc, shift) => acc + shift.volunteerLimit, 0);
  const totalSignups = event.shifts.reduce((acc, shift) => acc + shift.signedUp, 0);

  return (
    <div className="overflow-hidden rounded-lg bg-white shadow transition-shadow hover:shadow-md">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
            {event.program}
          </span>
          <div className="flex items-center gap-2">
            <button className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
              <Share2 className="h-4 w-4" />
            </button>
            <button className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
              <QrCode className="h-4 w-4" />
            </button>
            <button className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
              <Mail className="h-4 w-4" />
            </button>
          </div>
        </div>

        <h3 className="mt-4 text-lg font-medium text-gray-900">{event.title}</h3>
        <p className="mt-1 text-sm text-gray-500">{event.description}</p>

        <div className="mt-4 space-y-3">
          <div className="flex items-center text-sm text-gray-500">
            <div className="flex items-center">
              {event.location.type === 'in-person' ? (
                <MapPin className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
              ) : (
                <Video className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
              )}
              {event.location.type === 'in-person'
                ? event.location.address
                : 'Virtual Event'}
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <Users className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
            <span>
              {totalSignups} / {totalSpots} volunteers
            </span>
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
            <time dateTime={event.date.toISOString()}>
              {format(event.date, 'MMMM d, yyyy h:mm a')}
            </time>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button className="flex-1 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
            Sign Up
          </button>
          <button className="rounded-md px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50">
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}