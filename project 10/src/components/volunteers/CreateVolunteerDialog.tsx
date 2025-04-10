import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';

interface CreateVolunteerDialogProps {
  open: boolean;
  onClose: () => void;
}

export function CreateVolunteerDialog({ open, onClose }: CreateVolunteerDialogProps) {
  const [availability, setAvailability] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  if (!open) return null;

  const weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="inline-block w-full max-w-2xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-bottom shadow-xl transition-all sm:my-8 sm:align-middle">
          <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
            <button
              onClick={onClose}
              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="mt-3 w-full text-center sm:mt-0 sm:text-left">
              <h3 className="text-lg font-semibold leading-6 text-gray-900">
                Add New Volunteer
              </h3>

              <form className="mt-6 space-y-6">
                <div className="flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-100">
                      <div className="flex h-full items-center justify-center">
                        <Upload className="h-8 w-8 text-gray-400" />
                      </div>
                    </div>
                    <button
                      type="button"
                      className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-500"
                    >
                      Upload Photo
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Skills
                    </label>
                    <input
                      type="text"
                      placeholder="Separate skills with commas"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Availability
                  </label>
                  <div className="mt-2 grid grid-cols-7 gap-2">
                    {weekDays.map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() =>
                          setAvailability((prev) => ({
                            ...prev,
                            [day]: !prev[day],
                          }))
                        }
                        className={`flex flex-col items-center rounded-md p-2 text-xs ${
                          availability[day]
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {day.charAt(0).toUpperCase() + day.slice(1, 3)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Notes
                  </label>
                  <textarea
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Documents
                  </label>
                  <div className="mt-2">
                    <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <div className="text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-300" />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <label className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500">
                            <span>Upload files</span>
                            <input
                              type="file"
                              className="sr-only"
                              multiple
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                          PDF, DOC up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Create Volunteer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}