import React, { useState } from 'react';
import { X, Users, BookTemplate as Template, Send, Clock } from 'lucide-react';

interface ComposeMessageDialogProps {
  open: boolean;
  onClose: () => void;
}

export function ComposeMessageDialog({ open, onClose }: ComposeMessageDialogProps) {
  const [messageType, setMessageType] = useState<'email' | 'sms'>('email');
  const [recipientType, setRecipientType] = useState<'individual' | 'group' | 'program'>('individual');

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="inline-block w-full max-w-3xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-bottom shadow-xl transition-all sm:my-8 sm:align-middle">
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
                New Message
              </h3>

              <form className="mt-6 space-y-6">
                <div className="flex gap-4">
                  <div className="flex rounded-md shadow-sm flex-1">
                    <button
                      type="button"
                      onClick={() => setMessageType('email')}
                      className={`relative flex-1 inline-flex items-center justify-center rounded-l-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-10 ${
                        messageType === 'email'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      Email
                    </button>
                    <button
                      type="button"
                      onClick={() => setMessageType('sms')}
                      className={`relative -ml-px flex-1 inline-flex items-center justify-center rounded-r-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-10 ${
                        messageType === 'sms'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      SMS
                    </button>
                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    <Template className="h-4 w-4 mr-2" />
                    Use Template
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Send To
                  </label>
                  <div className="mt-1">
                    <select
                      value={recipientType}
                      onChange={(e) => setRecipientType(e.target.value as typeof recipientType)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      <option value="individual">Individual Volunteers</option>
                      <option value="group">Volunteer Group</option>
                      <option value="program">Program Participants</option>
                    </select>
                  </div>
                </div>

                {messageType === 'email' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="mt-6 flex justify-between">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Schedule
                  </button>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Now
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}