import React from 'react';
import { format } from 'date-fns';
import { Mail, MessageSquare, Clock, Check } from 'lucide-react';

interface Message {
  id: string;
  type: 'email' | 'sms' | 'chat';
  subject?: string;
  content: string;
  sender: string;
  recipients: string[];
  timestamp: Date;
  status: 'sent' | 'scheduled' | 'draft';
}

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {message.type === 'email' ? (
                <Mail className="h-5 w-5 text-gray-400" />
              ) : (
                <MessageSquare className="h-5 w-5 text-gray-400" />
              )}
              <div>
                <h4 className="font-medium text-gray-900">
                  {message.subject || message.content.slice(0, 50) + '...'}
                </h4>
                <p className="text-sm text-gray-500">
                  To: {message.recipients.join(', ')}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {message.status === 'scheduled' ? (
                <Clock className="h-4 w-4 text-blue-500" />
              ) : message.status === 'sent' ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : null}
              <span className="text-sm text-gray-500">
                {format(message.timestamp, 'MMM d, h:mm a')}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}