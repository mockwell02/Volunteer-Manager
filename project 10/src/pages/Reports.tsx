import React, { useState } from 'react';
import { Download, Filter, Calendar, Users, Clock, X } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { format, subMonths, startOfMonth, endOfMonth } from 'date-fns';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const volunteerHoursData = [
  { month: 'Jan', hours: 450 },
  { month: 'Feb', hours: 520 },
  { month: 'Mar', hours: 480 },
  { month: 'Apr', hours: 600 },
  { month: 'May', hours: 550 },
  { month: 'Jun', hours: 630 },
];

const eventAttendanceData = [
  { name: 'Completed', value: 85 },
  { name: 'No-Show', value: 10 },
  { name: 'Canceled', value: 5 },
];

const retentionData = [
  { month: 'Jan', active: 120, inactive: 20 },
  { month: 'Feb', active: 125, inactive: 22 },
  { month: 'Mar', active: 130, inactive: 25 },
  { month: 'Apr', active: 128, inactive: 28 },
  { month: 'May', active: 135, inactive: 30 },
  { month: 'Jun', active: 140, inactive: 25 },
];

interface ReportFilters {
  dateRange: {
    start: Date;
    end: Date;
  };
  program?: string;
  group?: string;
}

export function Reports() {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<ReportFilters>({
    dateRange: {
      start: startOfMonth(subMonths(new Date(), 6)),
      end: endOfMonth(new Date()),
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
          <button className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-gray-700">Report Filters</h2>
            <button
              onClick={() => setShowFilters(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                value={format(filters.dateRange.start, 'yyyy-MM-dd')}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    dateRange: {
                      ...filters.dateRange,
                      start: new Date(e.target.value),
                    },
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                value={format(filters.dateRange.end, 'yyyy-MM-dd')}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    dateRange: {
                      ...filters.dateRange,
                      end: new Date(e.target.value),
                    },
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Program
              </label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                <option value="">All Programs</option>
                <option value="food-bank">Food Bank</option>
                <option value="education">Education</option>
                <option value="healthcare">Healthcare</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Group
              </label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                <option value="">All Groups</option>
                <option value="drivers">Drivers</option>
                <option value="coordinators">Coordinators</option>
                <option value="tutors">Tutors</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Volunteer Hours Chart */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">Volunteer Hours</h2>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-500">Last 6 months</span>
            </div>
          </div>
          <div className="h-80">
            <BarChart
              width={500}
              height={300}
              data={volunteerHoursData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="hours" fill="#3B82F6" />
            </BarChart>
          </div>
        </div>

        {/* Event Attendance Chart */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">Event Attendance</h2>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-500">Current month</span>
            </div>
          </div>
          <div className="h-80 flex items-center justify-center">
            <PieChart width={400} height={300}>
              <Pie
                data={eventAttendanceData}
                cx={200}
                cy={150}
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label
              >
                {eventAttendanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>

        {/* Volunteer Retention Chart */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">Volunteer Retention</h2>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-500">Active vs Inactive</span>
            </div>
          </div>
          <div className="h-80">
            <LineChart
              width={1000}
              height={300}
              data={retentionData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="active"
                stroke="#3B82F6"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="inactive"
                stroke="#EF4444"
                strokeWidth={2}
              />
            </LineChart>
          </div>
        </div>
      </div>

      {/* Custom Report Builder */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">
          Custom Report Builder
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Report Type
              </label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                <option value="hours">Volunteer Hours</option>
                <option value="attendance">Event Attendance</option>
                <option value="demographics">Demographics</option>
                <option value="skills">Skills Distribution</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Group By
              </label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                <option value="volunteer">Volunteer</option>
                <option value="program">Program</option>
                <option value="group">Group</option>
                <option value="date">Date</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Format
              </label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                <option value="table">Table</option>
                <option value="chart">Chart</option>
                <option value="both">Both</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}