import React, { useState } from 'react';
import { X, Plus, Trash } from 'lucide-react';

interface CreateProgramDialogProps {
  open: boolean;
  onClose: () => void;
}

export function CreateProgramDialog({ open, onClose }: CreateProgramDialogProps) {
  const [subPrograms, setSubPrograms] = useState([{ id: '1', name: '', description: '' }]);

  if (!open) return null;

  const addSubProgram = () => {
    setSubPrograms([...subPrograms, { id: Date.now().toString(), name: '', description: '' }]);
  };

  const removeSubProgram = (id: string) => {
    setSubPrograms(subPrograms.filter((program) => program.id !== id));
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
                Create New Program
              </h3>

              <form className="mt-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Program Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="e.g., Food Pantry"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Describe the program's purpose and goals..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      End Date (Optional)
                    </label>
                    <input
                      type="date"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">
                      Sub-Programs
                    </label>
                    <button
                      type="button"
                      onClick={addSubProgram}
                      className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500"
                    >
                      <Plus className="mr-1 h-4 w-4" />
                      Add Sub-Program
                    </button>
                  </div>
                  <div className="mt-2 space-y-3">
                    {subPrograms.map((program) => (
                      <div
                        key={program.id}
                        className="rounded-lg border border-gray-200 p-3 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            placeholder="Sub-Program Name"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                          <button
                            type="button"
                            onClick={() => removeSubProgram(program.id)}
                            className="ml-2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                        </div>
                        <textarea
                          placeholder="Sub-Program Description"
                          rows={2}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                    ))}
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
                    Create Program
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