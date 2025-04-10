import React from 'react';
import { X, Plus, Clock, Calendar, Gift, Bell, ToggleLeft as Toggle, Trash } from 'lucide-react';

interface AutomationDialogProps {
  open: boolean;
  onClose: () => void;
}

const sampleAutomations = [
  {
    id: '1',
    name: 'Event Reminder',
    trigger: '24 hours before event',
    type: 'email',
    template: 'Event Reminder Template',
    active: true,
  },
  {
    id: '2',
    name: 'Birthday Wishes',
    trigger: 'On volunteer birthday',
    type: 'email',
    template: 'Birthday Wishes Template',
    active: true,
  },
];

export function AutomationDialog({ open, onClose }: AutomationDialogProps) {
  if (!open) return null;

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
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold leading-6 text-gray-900">
                  Message Automations
                </h3>
                <button
                  className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Automation
                </button>
              </div>

              <div className="mt-6 space-y-4">
                {sampleAutomations.map((automation) => (
                  <div
                    key={automation.id}
                    className="rounded-lg border border-gray-200 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {automation.trigger.includes('event') ? (
                          <Calendar className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Gift className="h-5 w-5 text-gray-400" />
                        )}
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {automation.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            Trigger: {automation.trigger}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            automation.active ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                              automation.active ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                        <button className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-red-500">
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">
                        Uses template: {automation.template}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={onClose}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}