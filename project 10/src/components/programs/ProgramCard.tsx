import React from 'react';
import { Calendar, Users, ChevronRight, Edit, Trash } from 'lucide-react';
import { format } from 'date-fns';

interface ProgramCardProps {
  program: {
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
  };
}

export function ProgramCard({ program }: ProgramCardProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow transition-shadow hover:shadow-md">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
            ${program.status === 'active' ? 'bg-green-100 text-green-800' :
              program.status === 'completed' ? 'bg-gray-100 text-gray-800' :
              'bg-blue-100 text-blue-800'}`}>
            {program.status.charAt(0).toUpperCase() + program.status.slice(1)}
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

        <h3 className="mt-4 text-lg font-medium text-gray-900">{program.name}</h3>
        <p className="mt-1 text-sm text-gray-500">{program.description}</p>

        <div className="mt-4 space-y-3">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
            <span>
              Started {format(program.startDate, 'MMM d, yyyy')}
              {program.endDate && ` • Ends ${format(program.endDate, 'MMM d, yyyy')}`}
            </span>
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <Users className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
            <span>{program.volunteers.length} volunteers</span>
          </div>

          {program.subPrograms.length > 0 && (
            <div className="rounded-md bg-gray-50 p-3">
              <h4 className="text-sm font-medium text-gray-900">Sub-Programs</h4>
              <ul className="mt-2 space-y-1">
                {program.subPrograms.map((subProgram) => (
                  <li key={subProgram.id} className="text-sm text-gray-500">
                    {subProgram.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-6">
          <button className="inline-flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            View Details
            <ChevronRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}