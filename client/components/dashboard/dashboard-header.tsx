'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { useTheme } from '@/lib/theme-context';
import { Button } from '@/components/ui/button';
import { Plus, Bell, Moon, Sun } from 'lucide-react';

interface DashboardHeaderProps {
  onCreateNote: () => void;
}

export function DashboardHeader({ onCreateNote }: DashboardHeaderProps) {
  const { user } = useAuthStore();
  const { isDark, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);


  console.log("onCreateNote", onCreateNote);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  if (!mounted) {
    return null;
  }

  return (

    <header className="border-b border-border bg-card sticky top-0 z-10">
      <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">


        <div className="flex flex-col pl-12">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">
            My Notes
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Welcome back, {user?.name || 'User'}!
          </p>
        </div>


        <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">


          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
          >
            <Bell className="w-5 h-5" />
          </Button>


          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-muted-foreground hover:text-foreground"
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>


          <Button
            onClick={onCreateNote}
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm px-3 sm:px-4"
          >
            <Plus className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">New Note</span>
          </Button>

        </div>
      </div>
    </header>
  );
}
