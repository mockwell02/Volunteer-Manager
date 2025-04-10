import React, { useState } from 'react';
import { format } from 'date-fns';
import {
  Calendar,
  List,
  Plus,
  Share2,
  QrCode,
  Mail,
  Eye,
  Filter,
  Search,
} from 'lucide-react';
import { EventCard } from '../components/events/EventCard';
import { CalendarView } from '../components/events/CalendarView';
import { CreateEventDialog } from '../components/events/CreateEventDialog';

type ViewMode = 'list' | 'calendar';
type EventStatus = 'upcoming' | 'past' | 'draft';
type Privacy = 'public' | 'unlisted' | 'private';

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: {
    type: 'in-person' | 'virtual';
    address?: string;
    link?: string;
  };
  privacy: Privacy;
  program: string;
  status: EventStatus;
  shifts: Array<{
    id: string;
    startTime: Date;
    endTime: Date;
    role: string;
    volunteerLimit: number;
    signedUp: number;
  }>;
  coHosts: string[];
  requirements: {
    minimumAge?: number;
    waivers: string[];
  };
}

const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Community Food Drive',
    description: 'Monthly food collection and distribution event',
    date: new Date('2024-03-25T09:00:00'),
    location: {
      type: 'in-person',
      address: '123 Main St, Anytown, USA',
    },
    privacy: 'public',
    program: 'Food Bank',
    status: 'upcoming',
    shifts: [
      {
        id: 'shift1',
        startTime: new Date('2024-03-25T09:00:00'),
        endTime: new Date('2024-03-25T12:00:00'),
        role: 'Food Sorter',
        volunteerLimit: 10,
        signedUp: 6,
      },
      {
        id: 'shift2',
        startTime: new Date('2024-03-25T13:00:00'),
        endTime: new Date('2024-03-25T16:00:00'),
        role: 'Distribution Helper',
        volunteerLimit: 8,
        signedUp: 4,
      }
    ],
    coHosts: ['partner@foodbank.org'],
    requirements: {
      minimumAge: 16,
      waivers: ['liability-waiver'],
    },
  },
  {
    id: '2',
    title: 'Virtual Tutoring Session',
    description: 'Online tutoring for high school students',
    date: new Date('2024-03-27T15:00:00'),
    location: {
      type: 'virtual',
      link: 'https://meet.example.com/tutoring',
    },
    privacy: 'private',
    program: 'Education',
    status: 'upcoming',
    shifts: [
      {
        id: 'shift3',
        startTime: new Date('2024-03-27T15:00:00'),
        endTime: new Date('2024-03-27T17:00:00'),
        role: 'Tutor',
        volunteerLimit: 5,
        signedUp: 3,
      }
    ],
    coHosts: ['education@example.com'],
    requirements: {
      minimumAge: 18,
      waivers: ['background-check', 'confidentiality-agreement'],
    },
  },
  {
    id: '3',
    title: 'Park Cleanup Day',
    description: 'Spring cleaning at Central Park',
    date: new Date('2024-04-01T10:00:00'),
    location: {
      type: 'in-person',
      address: 'Central Park, Anytown, USA',
    },
    privacy: 'public',
    program: 'Environment',
    status: 'upcoming',
    shifts: [
      {
        id: 'shift4',
        startTime: new Date('2024-04-01T10:00:00'),
        endTime: new Date('2024-04-01T13:00:00'),
        role: 'Cleanup Volunteer',
        volunteerLimit: 20,
        signedUp: 15,
      }
    ],
    coHosts: ['parks@citygovernment.org'],
    requirements: {
      minimumAge: 12,
      waivers: ['liability-waiver'],
    },
  },
  {
    id: '4',
    title: 'Senior Center Social Hour',
    description: 'Weekly social activities with seniors',
    date: new Date('2024-03-30T14:00:00'),
    location: {
      type: 'in-person',
      address: '456 Elder St, Anytown, USA',
    },
    privacy: 'unlisted',
    program: 'Healthcare',
    status: 'upcoming',
    shifts: [
      {
        id: 'shift5',
        startTime: new Date('2024-03-30T14:00:00'),
        endTime: new Date('2024-03-30T16:00:00'),
        role: 'Activity Coordinator',
        volunteerLimit: 6,
        signedUp: 2,
      }
    ],
    coHosts: ['seniorcare@healthcare.org'],
    requirements: {
      minimumAge: 16,
      waivers: ['health-screening', 'confidentiality-agreement'],
    },
  }
];

export function Events() {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<EventStatus>('upcoming');

  const programs = ['all', 'Food Bank', 'Education', 'Healthcare', 'Environment'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Events</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCreateDialogOpen(true)}
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <Plus className="h-4 w-4" />
            Create Event
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex rounded-md shadow-sm">
            <button
              onClick={() => setViewMode('list')}
              className={`relative inline-flex items-center rounded-l-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-10 ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-900 hover:bg-gray-50'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`relative -ml-px inline-flex items-center rounded-r-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-10 ${
                viewMode === 'calendar'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Calendar className="h-4 w-4" />
            </button>
          </div>

          <select
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
            className="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
          >
            {programs.map((program) => (
              <option key={program} value={program}>
                {program.charAt(0).toUpperCase() + program.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as EventStatus)}
            className="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
          >
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="search"
            placeholder="Search events..."
            className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      {viewMode === 'list' ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sampleEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <CalendarView events={sampleEvents} />
      )}

      <CreateEventDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
      />
    </div>
  );
}