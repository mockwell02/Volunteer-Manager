import React from 'react';
import { format } from 'date-fns';
import {
  X,
  Mail,
  Phone,
  Calendar,
  Clock,
  FileText,
  Shield,
  Edit,
  Archive,
  Download,
  Plus,
} from 'lucide-react';
import type { Volunteer } from '../../pages/Volunteers';

interface VolunteerProfileDialogProps {
  open: boolean;
  onClose: () => void;
  volunteer: Volunteer;
}

export function VolunteerProfileDialog({
  open,
  onClose,
  volunteer,
}: VolunteerProfileDialogProps) {
  if (!open) return null;

  const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="inline-block w-full max-w-4xl transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:align-middle">
          <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
            <button
              onClick={onClose}
              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="bg-white px-6 pb-6 pt-5 sm:p-6">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 w-full sm:mt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={volunteer.photo}
                      alt=""
                      className="h-16 w-16 rounded-full"
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {volunteer.name}
                      </h3>
                      <div className="mt-1 flex items-center">
                        <span
                          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            volunteer.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : volunteer.status === 'inactive'
                              ? 'bg-gray-100 text-gray-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {volunteer.status.charAt(0).toUpperCase() + volunteer.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </button>
                    <button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                      <Archive className="h-4 w-4 mr-2" />
                      Archive
                    </button>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Contact Information</h4>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center text-sm">
                        <Mail className="h-4 w-4 text-gray-400 mr-2" />
                        {volunteer.email}
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 text-gray-400 mr-2" />
                        {volunteer.phone}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Skills</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {volunteer.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Availability</h4>
                    <div className="mt-2 grid grid-cols-7 gap-2">
                      {weekDays.map((day) => (
                        <div
                          key={day}
                          className={`flex flex-col items-center rounded-md p-2 text-xs ${
                            volunteer.availability[day]
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-400'
                          }`}
                        >
                          {day.charAt(0).toUpperCase()}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Background Check</h4>
                    <div className="mt-2">
                      <div className="flex items-center">
                        <Shield className={`h-4 w-4 mr-2 ${
                          volunteer.backgroundCheck.status === 'completed'
                            ? 'text-green-500'
                            : volunteer.backgroundCheck.status === 'pending'
                            ? 'text-yellow-500'
                            : 'text-gray-400'
                        }`} />
                        <span className="text-sm">
                          {volunteer.backgroundCheck.status === 'completed' && (
                            <>
                              Completed on{' '}
                              {format(volunteer.backgroundCheck.completedAt!, 'MMM d, yyyy')}
                            </>
                          )}
                          {volunteer.backgroundCheck.status === 'pending' && 'In Progress'}
                          {volunteer.backgroundCheck.status === 'not_started' && 'Not Started'}
                          {volunteer.backgroundCheck.status === 'expired' && 'Expired'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-500">Documents</h4>
                  <div className="mt-2 space-y-2">
                    {volunteer.documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between rounded-lg border border-gray-200 p-3"
                      >
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 text-gray-400 mr-2" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {doc.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              Uploaded {format(doc.uploadedAt, 'MMM d, yyyy')}
                            </div>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-500">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <button className="mt-2 inline-flex items-center text-sm text-blue-600 hover:text-blue-500">
                      <Plus className="h-4 w-4 mr-1" />
                      Upload Document
                    </button>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-500">Event History</h4>
                  <div className="mt-2 space-y-2">
                    {volunteer.events.map((event) => (
                      <div
                        key={event.id}
                        className="flex items-center justify-between rounded-lg border border-gray-200 p-3"
                      >
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {event.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {format(event.date, 'MMM d, yyyy')}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-sm text-gray-500">{event.hours} hours</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-500">Notes</h4>
                  <div className="mt-2">
                    <textarea
                      rows={3}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      defaultValue={volunteer.notes}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}