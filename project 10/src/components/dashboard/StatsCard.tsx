import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
}

export function StatsCard({ title, value, icon: Icon, trend }: StatsCardProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-100">
      <div className="flex items-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <Icon className="h-6 w-6" />
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          {trend && (
            <p className="mt-1 text-sm">
              <span className={trend.value >= 0 ? 'text-green-600' : 'text-red-600'}>
                {trend.value >= 0 ? (
                  <ArrowUpRight className="inline h-4 w-4" />
                ) : (
                  <ArrowDownRight className="inline h-4 w-4" />
                )}
                {trend.value >= 0 ? '+' : ''}{trend.value}%
              </span>
              <span className="ml-2 text-gray-500">{trend.label}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}