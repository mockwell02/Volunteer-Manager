import React, { useState } from 'react';
import { X, Plus, Trash } from 'lucide-react';

interface CreateEventDialogProps {
  open: boolean;
  onClose: () => void;
}

export function CreateEventDialog({ open, onClose }: CreateEventDialogProps) {
  const [shifts, setShifts] = useState([{ id: '1', role: '', limit: 1 }]);

  if (!open) return null;

  const addShift = () => {
    setShifts([...shifts, { id: Date.now().toString(), role: '', limit: 1 }]);
  };

  const removeShift = (id: string) => {
    setShifts(shifts.filter((shift) => shift.id !== id));
  };

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
                Create New Event
              </h3>

              <form className="mt-6 space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Date
                      </label>
                      <input
                        type="date"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Time
                      </label>
                      <input
                        type="time"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Location Type
                    </label>
                    <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                      <option value="in-person">In Person</option>
                      <option value="virtual">Virtual</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Privacy
                    </label>
                    <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                      <option value="public">Public</option>
                      <option value="unlisted">Unlisted</option>
                      <option value="private">Private</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Program
                    </label>
                    <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                      <option value="food-bank">Food Bank</option>
                      <option value="education">Education</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="environment">Environment</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium text-gray-700">
                        Shifts
                      </label>
                      <button
                        type="button"
                        onClick={addShift}
                        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500"
                      >
                        <Plus className="mr-1 h-4 w-4" />
                        Add Shift
                      </button>
                    </div>
                    <div className="mt-2 space-y-3">
                      {shifts.map((shift) => (
                        <div
                          key={shift.id}
                          className="flex items-center gap-3 rounded-lg border border-gray-200 p-3"
                        >
                          <input
                            type="text"
                            placeholder="Role"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                          <input
                            type="number"
                            min="1"
                            placeholder="Limit"
                            className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                          <button
                            type="button"
                            onClick={() => removeShift(shift.id)}
                            className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Requirements
                    </label>
                    <div className="mt-2 space-y-2">
                      <div>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            Background Check Required
                          </span>
                        </label>
                      </div>
                      <div>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            Liability Waiver Required
                          </span>
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-700">
                          Minimum Age:
                        </label>
                        <input
                          type="number"
                          min="0"
                          className="w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
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
                    Create Event
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