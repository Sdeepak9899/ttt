'use client';

import { Card } from '@/components/ui/card';
import { FileText, Star, Archive } from 'lucide-react';

interface DashboardStatsProps {
  totalNotes: number;
  favorites: number;
  archived: number;
}

export function DashboardStats({ totalNotes, favorites, archived }: DashboardStatsProps) {
  const stats = [
    {
      icon: FileText,
      label: 'Total Notes',
      value: totalNotes,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-500/10',
    },
    {
      icon: Star,
      label: 'Favorites',
      value: favorites,
      color: 'text-amber-500',
      bgColor: 'bg-amber-50 dark:bg-amber-500/10',
    },
    {
      icon: Archive,
      label: 'Archived',
      value: archived,
      color: 'text-gray-500',
      bgColor: 'bg-gray-50 dark:bg-gray-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {stats.map(({ icon: Icon, label, value, color, bgColor }, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{label}</p>
              <p className="text-3xl font-bold text-foreground mt-2">{value}</p>
            </div>
            <div className={`p-3 rounded-lg ${bgColor}`}>
              <Icon className={`w-6 h-6 ${color}`} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
