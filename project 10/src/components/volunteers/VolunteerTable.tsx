import React from 'react';
import { format } from 'date-fns';
import { Eye, Edit, Archive, MoreVertical } from 'lucide-react';
import type { Volunteer } from '../../pages/Volunteers';

interface VolunteerTableProps {
  volunteers: Volunteer[];
  onViewProfile: (volunteer: Volunteer) => void;
}

export function VolunteerTable({ volunteers, onViewProfile }: VolunteerTableProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
              Name
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Email
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Phone
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Status
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Total Hours
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Last Activity
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {volunteers.map((volunteer) => (
            <tr key={volunteer.id}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-6">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={volunteer.photo}
                      alt=""
                    />
                  </div>
                  <div className="ml-4">
                    <div className="font-medium text-gray-900">{volunteer.name}</div>
                  </div>
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {volunteer.email}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {volunteer.phone}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                  volunteer.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : volunteer.status === 'inactive'
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {volunteer.status.charAt(0).toUpperCase() + volunteer.status.slice(1)}
                </span>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {volunteer.totalHours}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {format(volunteer.lastActivity, 'MMM d, yyyy')}
              </td>
              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onViewProfile(volunteer)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-500">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-500">
                    <Archive className="h-4 w-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-500">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}