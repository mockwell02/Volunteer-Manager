import React from 'react';
import { 
  Users, 
  Calendar, 
  Clock, 
  Award,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Plus,
  FileText,
  Mail
} from 'lucide-react';
import { StatsCard } from '../components/dashboard/StatsCard';
import { format, subDays } from 'date-fns';

const recentActivities = [
  {
    id: '1',
    type: 'event',
    title: 'Food Drive',
    description: '6 volunteers signed up',
    timestamp: subDays(new Date(), 1),
  },
  {
    id: '2',
    type: 'volunteer',
    title: 'Sarah Johnson',
    description: 'Completed background check',
    timestamp: subDays(new Date(), 2),
  },
  {
    id: '3',
    type: 'program',
    title: 'Youth Mentoring',
    description: 'New program created',
    timestamp: subDays(new Date(), 3),
  },
];

const upcomingEvents = [
  {
    id: '1',
    title: 'Community Garden Clean-up',
    date: new Date('2024-03-25T09:00:00'),
    volunteers: 8,
    program: 'Environment',
  },
  {
    id: '2',
    title: 'Food Bank Distribution',
    date: new Date('2024-03-26T10:00:00'),
    volunteers: 12,
    program: 'Food Bank',
  },
  {
    id: '3',
    title: 'Senior Center Visit',
    date: new Date('2024-03-27T14:00:00'),
    volunteers: 5,
    program: 'Healthcare',
  },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back! Here's what's happening with your volunteer programs.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-100 hover:bg-gray-50">
            <FileText className="h-4 w-4 mr-2" />
            View Reports
          </button>
          <button className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
            <Plus className="h-4 w-4 mr-2" />
            New Event
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Volunteers"
          value="1,234"
          icon={Users}
          trend={{ value: 12, label: 'vs last month' }}
        />
        <StatsCard
          title="Upcoming Events"
          value="23"
          icon={Calendar}
          trend={{ value: 5, label: 'vs last month' }}
        />
        <StatsCard
          title="Hours This Month"
          value="2,845"
          icon={Clock}
          trend={{ value: -3, label: 'vs last month' }}
        />
        <StatsCard
          title="Active Programs"
          value="8"
          icon={Award}
          trend={{ value: 2, label: 'vs last month' }}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="rounded-lg border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-4 py-5 sm:px-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Recent Activity
            </h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="flow-root">
              <ul role="list" className="-mb-8">
                {recentActivities.map((activity, activityIdx) => (
                  <li key={activity.id}>
                    <div className="relative pb-8">
                      {activityIdx !== recentActivities.length - 1 ? (
                        <span
                          className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-100"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                            activity.type === 'event'
                              ? 'bg-blue-50 text-blue-600'
                              : activity.type === 'volunteer'
                              ? 'bg-green-50 text-green-600'
                              : 'bg-purple-50 text-purple-600'
                          }`}>
                            {activity.type === 'event' ? (
                              <Calendar className="h-4 w-4" />
                            ) : activity.type === 'volunteer' ? (
                              <Users className="h-4 w-4" />
                            ) : (
                              <Award className="h-4 w-4" />
                            )}
                          </span>
                        </div>
                        <div className="flex min-w-0 flex-1 justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-900">{activity.title}</p>
                            <p className="text-sm text-gray-500">{activity.description}</p>
                          </div>
                          <div className="whitespace-nowrap text-right text-sm text-gray-500">
                            {format(activity.timestamp, 'MMM d')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="rounded-lg border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-4 py-5 sm:px-6">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Upcoming Events
            </h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="flow-root">
              <ul role="list" className="divide-y divide-gray-100">
                {upcomingEvents.map((event) => (
                  <li key={event.id} className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {event.title}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600">
                            {event.program}
                          </span>
                          <span className="inline-flex items-center text-xs text-gray-500">
                            <Users className="mr-1 h-4 w-4" />
                            {event.volunteers} volunteers
                          </span>
                        </div>
                      </div>
                      <div className="ml-6 flex-shrink-0">
                        <div className="text-sm text-gray-500">
                          {format(event.date, 'MMM d, h:mm a')}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}