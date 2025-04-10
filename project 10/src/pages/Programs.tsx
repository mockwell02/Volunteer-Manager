import React, { useState } from 'react';
import { Plus, Search, Calendar, Users, ChevronRight, Edit, Trash } from 'lucide-react';
import { CreateProgramDialog } from '../components/programs/CreateProgramDialog';
import { ProgramCard } from '../components/programs/ProgramCard';

interface Program {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date | null;
  volunteers: Array<{
    id: string;
    name: string;
    email: string;
    role: string;
  }>;
  subPrograms: Array<{
    id: string;
    name: string;
    description: string;
  }>;
  status: 'active' | 'completed' | 'upcoming';
}

const samplePrograms: Program[] = [
  {
    id: '1',
    name: 'Food Pantry',
    description: 'Weekly food distribution program for local communities in need',
    startDate: new Date('2024-01-01'),
    endDate: null,
    volunteers: [
      { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Coordinator' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Driver' },
      { id: '3', name: 'Mike Wilson', email: 'mike@example.com', role: 'Sorter' },
    ],
    subPrograms: [
      { id: '1', name: 'Food Collection', description: 'Collecting donations from local stores' },
      { id: '2', name: 'Distribution', description: 'Weekly distribution to families' },
      { id: '3', name: 'Mobile Pantry', description: 'Delivering to homebound individuals' },
    ],
    status: 'active',
  },
  {
    id: '2',
    name: 'Free Medical Clinic',
    description: 'Monthly medical services for uninsured residents',
    startDate: new Date('2024-02-01'),
    endDate: null,
    volunteers: [
      { id: '3', name: 'Dr. Sarah Johnson', email: 'sarah@example.com', role: 'Medical Director' },
      { id: '4', name: 'Tom Brown', email: 'tom@example.com', role: 'Nurse' },
      { id: '5', name: 'Lisa Chen', email: 'lisa@example.com', role: 'Administrator' },
    ],
    subPrograms: [
      { id: '3', name: 'General Checkups', description: 'Basic health screenings' },
      { id: '4', name: 'Dental Services', description: 'Basic dental care' },
      { id: '5', name: 'Vision Care', description: 'Eye examinations and glasses' },
    ],
    status: 'active',
  },
  {
    id: '3',
    name: 'Youth Mentoring',
    description: 'After-school mentoring program for at-risk youth',
    startDate: new Date('2024-03-01'),
    endDate: null,
    volunteers: [
      { id: '6', name: 'Robert Taylor', email: 'robert@example.com', role: 'Program Director' },
      { id: '7', name: 'Maria Garcia', email: 'maria@example.com', role: 'Mentor' },
    ],
    subPrograms: [
      { id: '6', name: 'Academic Support', description: 'Homework help and tutoring' },
      { id: '7', name: 'Life Skills', description: 'Teaching essential life skills' },
    ],
    status: 'active',
  },
  {
    id: '4',
    name: 'Senior Companion',
    description: 'Providing companionship and assistance to elderly residents',
    startDate: new Date('2024-04-01'),
    endDate: null,
    volunteers: [
      { id: '8', name: 'Patricia Lee', email: 'patricia@example.com', role: 'Coordinator' },
      { id: '9', name: 'James Wilson', email: 'james@example.com', role: 'Companion' },
    ],
    subPrograms: [
      { id: '8', name: 'Home Visits', description: "Regular visits to seniors' homes" },
      { id: '9', name: 'Transportation', description: 'Rides to appointments and errands' },
    ],
    status: 'upcoming',
  },
  {
    id: '5',
    name: 'Summer Reading Program',
    description: 'Literacy program for elementary school students',
    startDate: new Date('2023-06-01'),
    endDate: new Date('2023-08-31'),
    volunteers: [
      { id: '10', name: 'Emily White', email: 'emily@example.com', role: 'Program Lead' },
      { id: '11', name: 'David Kim', email: 'david@example.com', role: 'Reading Tutor' },
    ],
    subPrograms: [
      { id: '10', name: 'Reading Sessions', description: 'One-on-one reading assistance' },
      { id: '11', name: 'Book Club', description: 'Group reading discussions' },
    ],
    status: 'completed',
  }
];

export function Programs() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'completed' | 'upcoming'>('all');

  const filteredPrograms = samplePrograms.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || program.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Programs</h1>
        <button
          onClick={() => setIsCreateDialogOpen(true)}
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <Plus className="h-4 w-4" />
          Create Program
        </button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="search"
              placeholder="Search programs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            className="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPrograms.map((program) => (
          <ProgramCard key={program.id} program={program} />
        ))}
      </div>

      <CreateProgramDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
      />
    </div>
  );
}