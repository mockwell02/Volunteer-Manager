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
  Bell,
  User
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', to: '/', icon: LayoutDashboard },
  { name: 'Volunteers', to: '/volunteers', icon: Users },
  { name: 'Events', to: '/events', icon: Calendar },
  { name: 'Programs', to: '/programs', icon: FolderKanban },
  { name: 'Groups', to: '/groups', icon: UsersRound },
  { name: 'Reports', to: '/reports', icon: BarChart3 },
  { name: 'Communication', to: '/communication', icon: MessageSquare },
];

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Users className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">VolunteerHub</span>
            </div>
            <nav className="flex items-center gap-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${
                        isActive
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`
                    }
                  >
                    <Icon className="h-5 w-5" />
                    {item.name}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button className="rounded-full p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-500">
              <Bell className="h-6 w-6" />
            </button>
            <div className="relative">
              <button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User avatar"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}