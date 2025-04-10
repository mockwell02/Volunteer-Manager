import React, { useState } from 'react';
import { Plus, Search, Filter, Users, GripVertical } from 'lucide-react';
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { GroupCard } from '../components/groups/GroupCard';
import { CreateGroupDialog } from '../components/groups/CreateGroupDialog';
import type { Volunteer } from './Volunteers';

export interface Group {
  id: string;
  name: string;
  description: string;
  type: 'role' | 'skill' | 'custom';
  members: Volunteer[];
  color: string;
}

const sampleGroups: Group[] = [
  {
    id: '1',
    name: 'Drivers',
    description: 'Volunteers who can provide transportation',
    type: 'role',
    color: 'blue',
    members: [
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
        documents: [],
        backgroundCheck: {
          status: 'completed',
          completedAt: new Date('2024-01-15'),
          expiresAt: new Date('2025-01-15'),
        },
        events: [],
      },
      {
        id: '2',
        name: 'Sarah Wilson',
        email: 'sarah@example.com',
        phone: '(555) 777-8888',
        status: 'active',
        totalHours: 30,
        lastActivity: new Date('2024-03-18'),
        photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        skills: ['Driving', 'Customer Service'],
        availability: {
          monday: true,
          tuesday: true,
          wednesday: false,
          thursday: true,
          friday: true,
          saturday: false,
          sunday: false,
        },
        notes: 'Experienced driver with perfect attendance',
        documents: [],
        backgroundCheck: {
          status: 'completed',
          completedAt: new Date('2024-02-01'),
          expiresAt: new Date('2025-02-01'),
        },
        events: [],
      },
    ],
  },
  {
    id: '2',
    name: 'Event Coordinators',
    description: 'Volunteers who can manage and organize events',
    type: 'role',
    color: 'green',
    members: [
      {
        id: '3',
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
        documents: [],
        backgroundCheck: {
          status: 'completed',
          completedAt: new Date('2024-02-15'),
          expiresAt: new Date('2025-02-15'),
        },
        events: [],
      },
    ],
  },
  {
    id: '3',
    name: 'Medical Professionals',
    description: 'Licensed healthcare providers',
    type: 'skill',
    color: 'red',
    members: [
      {
        id: '4',
        name: 'Dr. Michael Chen',
        email: 'michael@example.com',
        phone: '(555) 555-1234',
        status: 'active',
        totalHours: 25,
        lastActivity: new Date('2024-03-20'),
        photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        skills: ['Medicine', 'First Aid', 'Emergency Response'],
        availability: {
          monday: false,
          tuesday: true,
          wednesday: true,
          thursday: false,
          friday: false,
          saturday: true,
          sunday: false,
        },
        notes: 'Licensed physician specializing in family medicine',
        documents: [],
        backgroundCheck: {
          status: 'completed',
          completedAt: new Date('2024-01-10'),
          expiresAt: new Date('2025-01-10'),
        },
        events: [],
      },
    ],
  },
  {
    id: '4',
    name: 'Tutors',
    description: 'Education volunteers for after-school programs',
    type: 'role',
    color: 'purple',
    members: [
      {
        id: '5',
        name: 'Emily Rodriguez',
        email: 'emily@example.com',
        phone: '(555) 444-3333',
        status: 'active',
        totalHours: 40,
        lastActivity: new Date('2024-03-19'),
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        skills: ['Teaching', 'Mathematics', 'Science'],
        availability: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: false,
          saturday: false,
          sunday: false,
        },
        notes: 'Former teacher with 5 years of tutoring experience',
        documents: [],
        backgroundCheck: {
          status: 'completed',
          completedAt: new Date('2024-02-20'),
          expiresAt: new Date('2025-02-20'),
        },
        events: [],
      },
    ],
  },
];

export function Groups() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'role' | 'skill' | 'custom'>('all');
  const [groups, setGroups] = useState<Group[]>(sampleGroups);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );

  const handleDragStart = (event: any) => {
    const { active } = event;
    setActiveId(active.id);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const activeGroup = groups.find(g => g.id === active.id);
      const overGroup = groups.find(g => g.id === over.id);

      if (activeGroup && overGroup) {
        const updatedGroups = groups.map(group => {
          if (group.id === overGroup.id) {
            return { ...group, members: [...group.members, ...activeGroup.members] };
          }
          if (group.id === activeGroup.id) {
            return { ...group, members: [] };
          }
          return group;
        });
        setGroups(updatedGroups);
      }
    }

    setActiveId(null);
  };

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || group.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Groups</h1>
        <button
          onClick={() => setIsCreateOpen(true)}
          className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Group
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
              placeholder="Search groups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as typeof typeFilter)}
            className="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
          >
            <option value="all">All Types</option>
            <option value="role">Roles</option>
            <option value="skill">Skills</option>
            <option value="custom">Custom</option>
          </select>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredGroups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
            />
          ))}
        </div>

        <DragOverlay>
          {activeId ? (
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
              <div className="flex items-center">
                <GripVertical className="h-5 w-5 text-gray-400" />
                <span className="ml-2 text-sm font-medium text-gray-900">
                  Moving group...
                </span>
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <CreateGroupDialog
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </div>
  );
}