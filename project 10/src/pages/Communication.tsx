import React, { useState } from 'react';
import { Mail, MessageSquare, Bell, Users, Search, Plus, ChevronDown, Send, BookTemplate as Template, Clock } from 'lucide-react';
import { ComposeMessageDialog } from '../components/communication/ComposeMessageDialog';
import { MessageTemplateDialog } from '../components/communication/MessageTemplateDialog';
import { AutomationDialog } from '../components/communication/AutomationDialog';
import { MessageList } from '../components/communication/MessageList';
import { ChatPanel } from '../components/communication/ChatPanel';

type MessageType = 'email' | 'sms' | 'chat';
type ViewMode = 'messages' | 'chat';

interface Message {
  id: string;
  type: MessageType;
  subject?: string;
  content: string;
  sender: string;
  recipients: string[];
  timestamp: Date;
  status: 'sent' | 'scheduled' | 'draft';
}

const sampleMessages: Message[] = [
  {
    id: '1',
    type: 'email',
    subject: 'Welcome to Food Bank Program',
    content: 'Thank you for joining our volunteer team...',
    sender: 'admin@volunteerapp.com',
    recipients: ['volunteer1@example.com', 'volunteer2@example.com'],
    timestamp: new Date('2024-03-20T10:00:00'),
    status: 'sent',
  },
  {
    id: '2',
    type: 'sms',
    content: 'Reminder: Food Drive tomorrow at 9 AM',
    sender: 'System',
    recipients: ['+1234567890'],
    timestamp: new Date('2024-03-21T15:30:00'),
    status: 'scheduled',
  },
  {
    id: '3',
    type: 'email',
    subject: 'Monthly Volunteer Newsletter - March 2024',
    content: 'Here are the highlights from this month...',
    sender: 'newsletter@volunteerapp.com',
    recipients: ['all-volunteers@list.example.com'],
    timestamp: new Date('2024-03-19T09:00:00'),
    status: 'sent',
  },
  {
    id: '4',
    type: 'sms',
    content: 'Urgent: Need 2 more volunteers for today\'s event',
    sender: 'System',
    recipients: ['+1987654321', '+1234567890'],
    timestamp: new Date('2024-03-21T08:00:00'),
    status: 'sent',
  },
  {
    id: '5',
    type: 'email',
    subject: 'Thank You for Your Service',
    content: 'We appreciate your dedication to our community...',
    sender: 'director@volunteerapp.com',
    recipients: ['volunteer3@example.com'],
    timestamp: new Date('2024-03-18T16:45:00'),
    status: 'sent',
  },
  {
    id: '6',
    type: 'email',
    subject: 'New Training Opportunity Available',
    content: 'Join us for a special training session...',
    sender: 'training@volunteerapp.com',
    recipients: ['group-leaders@list.example.com'],
    timestamp: new Date('2024-03-22T14:00:00'),
    status: 'scheduled',
  },
  {
    id: '7',
    type: 'sms',
    content: 'Weather Alert: Outdoor event relocated indoors',
    sender: 'System',
    recipients: ['+1234567890', '+1987654321', '+1567890123'],
    timestamp: new Date('2024-03-21T07:15:00'),
    status: 'sent',
  }
];

export function Communication() {
  const [viewMode, setViewMode] = useState<ViewMode>('messages');
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const [isAutomationOpen, setIsAutomationOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<MessageType>('email');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Communication</h1>
        <div className="flex items-center gap-3">
          <div className="flex rounded-md shadow-sm">
            <button
              onClick={() => setViewMode('messages')}
              className={`relative inline-flex items-center rounded-l-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-10 ${
                viewMode === 'messages'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Mail className="h-4 w-4 mr-2" />
              Messages
            </button>
            <button
              onClick={() => setViewMode('chat')}
              className={`relative -ml-px inline-flex items-center rounded-r-md px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-10 ${
                viewMode === 'chat'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-900 hover:bg-gray-50'
              }`}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Chat
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsTemplateOpen(true)}
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <Template className="h-4 w-4 mr-2" />
              Templates
            </button>
            <button
              onClick={() => setIsAutomationOpen(true)}
              className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <Clock className="h-4 w-4 mr-2" />
              Automations
            </button>
            <button
              onClick={() => setIsComposeOpen(true)}
              className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Compose
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'messages' ? (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="search"
                placeholder="Search messages..."
                className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as MessageType)}
              className="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
            >
              <option value="email">Email</option>
              <option value="sms">SMS</option>
              <option value="chat">Chat</option>
            </select>
          </div>

          <MessageList messages={sampleMessages} />
        </div>
      ) : (
        <ChatPanel />
      )}

      <ComposeMessageDialog
        open={isComposeOpen}
        onClose={() => setIsComposeOpen(false)}
      />

      <MessageTemplateDialog
        open={isTemplateOpen}
        onClose={() => setIsTemplateOpen(false)}
      />

      <AutomationDialog
        open={isAutomationOpen}
        onClose={() => setIsAutomationOpen(false)}
      />
    </div>
  );
}