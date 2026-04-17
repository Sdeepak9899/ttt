'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { useState } from 'react';

interface NotesFilterProps {
  onSearchChange: (query: string) => void;
  onFilterChange: (filter: 'all' | 'favorites' | 'archived') => void;
  activeFilter: 'all' | 'favorites' | 'archived';
}

export function NotesFilter({
  onSearchChange,
  onFilterChange,
  activeFilter,
}: NotesFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange(query);
  };

  const filters = [
    { id: 'all', label: 'All Notes' },
    { id: 'favorites', label: 'Favorites' },
    { id: 'archived', label: 'Archived' },
  ] as const;

  return (
    <div className="space-y-4 mb-8">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search notes by title or content..."
          value={searchQuery}
          onChange={handleSearch}
          className="pl-10"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map(({ id, label }) => (
          <Button
            key={id}
            onClick={() => onFilterChange(id)}
            variant={activeFilter === id ? 'default' : 'outline'}
            size="sm"
            className={
              activeFilter === id
                ? 'bg-primary text-primary-foreground hover:bg-primary hover:text-white cursor-pointer'
                : 'bg-primary text-white hover:bg-primary hover:text-white cursor-pointer'
            }
          >
            <Filter className="w-4 h-4 mr-2" />
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}
