import React, { useState } from 'react';
import { Plus, Search, Filter, Download, Upload, ChevronDown } from 'lucide-react';
import { VolunteerTable } from '../components/volunteers/VolunteerTable';
import { VolunteerProfileDialog } from '../components/volunteers/VolunteerProfileDialog';
import { CreateVolunteerDialog } from '../components/volunteers/CreateVolunteerDialog';

export type VolunteerStatus = 'active' | 'inactive' | 'pending';

export interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: VolunteerStatus;
  totalHours: number;
  lastActivity: Date;
  photo?: string;
  skills: string[];
  availability: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  notes: string;
  documents: Array<{
    id: string;
    name: string;
    type: string;
    uploadedAt: Date;
  }>;
  backgroundCheck: {
    status: 'not_started' | 'pending' | 'completed' | 'expired';
    completedAt?: Date;
    expiresAt?: Date;
  };
  events: Array<{
    id: string;
    name: string;
    date: Date;
    hours: number;
    status: 'completed' | 'upcoming' | 'canceled';
  }>;
}

const sampleVolunteers: Volunteer[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '(555) 123-4567',
    status: 'active',
    totalHours: 45,
    lastActivity: new Date('2024-03-15'),
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    skills: ['Driving', 'First Aid', 'Teaching'],
    availability: {
      monday: true,
      tuesday: false,
      wednesday: true,
      thursday: false,
      friday: true,
      saturday: true,
      sunday: false,
    },
    notes: 'Reliable volunteer with excellent communication skills',
    documents: [
      {
        id: 'doc1',
        name: 'Liability Waiver',
        type: 'pdf',
        uploadedAt: new Date('2024-01-01'),
      },
      {
        id: 'doc2',
        name: 'Driver License',
        type: 'pdf',
        uploadedAt: new Date('2024-01-02'),
      }
    ],
    backgroundCheck: {
      status: 'completed',
      completedAt: new Date('2024-01-15'),
      expiresAt: new Date('2025-01-15'),
    },
    events: [
      {
        id: 'event1',
        name: 'Food Drive',
        date: new Date('2024-03-10'),
        hours: 4,
        status: 'completed',
      },
      {
        id: 'event2',
        name: 'Senior Center Visit',
        date: new Date('2024-03-15'),
        hours: 3,
        status: 'completed',
      }
    ],
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '(555) 987-6543',
    status: 'active',
    totalHours: 32,
    lastActivity: new Date('2024-03-18'),
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    skills: ['Organization', 'Leadership', 'Event Planning'],
    availability: {
      monday: true,
      tuesday: true,
      wednesday: false,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false,
    },
    notes: 'Experienced event coordinator with strong leadership skills',
    documents: [
      {
        id: 'doc3',
        name: 'Background Check Consent',
        type: 'pdf',
        uploadedAt: new Date('2024-02-01'),
      }
    ],
    backgroundCheck: {
      status: 'completed',
      completedAt: new Date('2024-02-15'),
      expiresAt: new Date('2025-02-15'),
    },
    events: [
      {
        id: 'event3',
        name: 'Community Garden',
        date: new Date('2024-03-17'),
        hours: 3,
        status: 'completed',
      }
    ],
  },
  {
    id: '3',
    name: 'Michael Johnson',
    email: 'michael@example.com',
    phone: '(555) 555-1234',
    status: 'pending',
    totalHours: 0,
    lastActivity: new Date('2024-03-20'),
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    skills: ['Marketing', 'Social Media', 'Photography'],
    availability: {
      monday: false,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: false,
      saturday: true,
      sunday: false,
    },
    notes: 'New volunteer with marketing background',
    documents: [],
    backgroundCheck: {
      status: 'pending',
      completedAt: undefined,
      expiresAt: undefined,
    },
    events: [],
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    phone: '(555) 777-8888',
    status: 'inactive',
    totalHours: 15,
    lastActivity: new Date('2024-02-15'),
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    skills: ['Teaching', 'Tutoring', 'Spanish'],
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false,
    },
    notes: 'Former teacher, interested in education programs',
    documents: [
      {
        id: 'doc4',
        name: 'Teaching Certification',
        type: 'pdf',
        uploadedAt: new Date('2024-01-15'),
      }
    ],
    backgroundCheck: {
      status: 'expired',
      completedAt: new Date('2023-01-15'),
      expiresAt: new Date('2024-01-15'),
    },
    events: [
      {
        id: 'event4',
        name: 'After-School Tutoring',
        date: new Date('2024-02-10'),
        hours: 2,
        status: 'completed',
      }
    ],
  }
];

export function Volunteers() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<VolunteerStatus | 'all'>('all');

  const handleViewProfile = (volunteer: Volunteer) => {
    setSelectedVolunteer(volunteer);
    setIsProfileOpen(true);
  };

  const filteredVolunteers = sampleVolunteers.filter(volunteer => {
    const matchesSearch = volunteer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         volunteer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || volunteer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Volunteers</h1>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </button>
          <button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Volunteer
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="search"
              placeholder="Search volunteers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as VolunteerStatus | 'all')}
            className="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>

          <button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      <VolunteerTable
        volunteers={filteredVolunteers}
        onViewProfile={handleViewProfile}
      />

      {selectedVolunteer && (
        <VolunteerProfileDialog
          open={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          volunteer={selectedVolunteer}
        />
      )}

      <CreateVolunteerDialog
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </div>
  );
}