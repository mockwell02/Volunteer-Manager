import React from 'react';
import { Users, Edit, Trash, GripVertical, Plus } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Group } from '../../pages/Groups';

interface GroupCardProps {
  group: Group;
}

export function GroupCard({ group }: GroupCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: group.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <div
        {...attributes}
        {...listeners}
        className="absolute right-4 top-4 cursor-move opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <GripVertical className="h-5 w-5 text-gray-400" />
      </div>

      <div className="flex items-center justify-between">
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
          ${group.type === 'role' ? 'bg-blue-100 text-blue-800' :
            group.type === 'skill' ? 'bg-green-100 text-green-800' :
            'bg-purple-100 text-purple-800'}`}>
          {group.type.charAt(0).toUpperCase() + group.type.slice(1)}
        </span>
        <div className="flex items-center gap-2">
          <button className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
            <Edit className="h-4 w-4" />
          </button>
          <button className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-red-500">
            <Trash className="h-4 w-4" />
          </button>
        </div>
      </div>

      <h3 className="mt-4 text-lg font-medium text-gray-900">{group.name}</h3>
      <p className="mt-1 text-sm text-gray-500">{group.description}</p>

      <div className="mt-4">
        <div className="flex items-center text-sm text-gray-500">
          <Users className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
          <span>{group.members.length} members</span>
        </div>

        <div className="mt-4">
          <div className="flex -space-x-2 overflow-hidden">
            {group.members.map((member) => (
              <img
                key={member.id}
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                src={member.photo}
                alt={member.name}
              />
            ))}
            <button className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200">
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}