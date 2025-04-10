import React, { useState } from 'react';
import { Search, Send } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isAdmin: boolean;
}

const sampleChats: ChatMessage[] = [
  {
    id: '1',
    sender: 'John Doe',
    content: 'Hi, I have a question about tomorrow\'s event',
    timestamp: new Date('2024-03-21T10:00:00'),
    isAdmin: false,
  },
  {
    id: '2',
    sender: 'Admin',
    content: 'Sure, how can I help you?',
    timestamp: new Date('2024-03-21T10:01:00'),
    isAdmin: true,
  },
];

export function ChatPanel() {
  const [message, setMessage] = useState('');

  return (
    <div className="flex h-[calc(100vh-12rem)] rounded-lg border border-gray-200 bg-white">
      <div className="w-64 border-r border-gray-200">
        <div className="p-4">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="search"
              placeholder="Search chats..."
              className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="space-y-1 p-2">
          {['John Doe', 'Jane Smith', 'Mike Johnson'].map((name) => (
            <button
              key={name}
              className="flex w-full items-center gap-3 rounded-md p-2 text-left hover:bg-gray-100"
            >
              <div className="h-8 w-8 rounded-full bg-gray-200" />
              <div>
                <div className="font-medium text-gray-900">{name}</div>
                <div className="text-sm text-gray-500">Online</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {sampleChats.map((chat) => (
            <div
              key={chat.id}
              className={`flex ${chat.isAdmin ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-md ${
                  chat.isAdmin
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <div className="text-sm font-medium">{chat.sender}</div>
                <div>{chat.content}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
            <button
              className="rounded-md bg-blue-600 p-2 text-white hover:bg-blue-500"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}