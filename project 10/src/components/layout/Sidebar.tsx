import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Calendar,
  FolderKanban,
  UsersRound,
  BarChart3,
  MessageSquare,
  Settings,
  LogOut,
} from 'lucide-react';
import { cn } from '../../lib/utils';

const navigation = [
  { name: 'Dashboard', to: '/', icon: LayoutDashboard },
  { name: 'Volunteers', to: '/volunteers', icon: Users },
  { name: 'Events', to: '/events', icon: Calendar },
  { name: 'Programs', to: '/programs', icon: FolderKanban },
  { name: 'Groups', to: '/groups', icon: UsersRound },
  { name: 'Reports', to: '/reports', icon: BarChart3 },
  { name: 'Communication', to: '/communication', icon: MessageSquare },
  { name: 'Settings', to: '/settings', icon: Settings },
];

export function Sidebar() {
  return (
    <div className="flex h-full w-64 flex-col bg-gray-900">
      <div className="flex h-16 items-center gap-2 px-6">
        <Users className="h-8 w-8 text-blue-500" />
        <span className="text-xl font-bold text-white">VolunteerHub</span>
      </div>
      
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'group flex items-center px-4 py-2 text-sm font-medium rounded-md',
                  isActive
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                )
              }
            >
              <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-gray-700 p-4">
        <button className="flex w-full items-center px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md">
          <LogOut className="mr-3 h-5 w-5" />
          Sign out
        </button>
      </div>
    </div>
  );
}