// components/SearchBar.tsx
'use client';

import { useState, FormEvent, ChangeEvent, useCallback } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  initialValue?: string;
  onSearch: (query: string) => void;
  className?: string;
}

export default function SearchBar({
  placeholder = 'Insert Type',
  initialValue = '',
  onSearch,
  className = '',
}: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      onSearch(query.trim());
    },
    [onSearch, query]
  );

  const clear = useCallback(() => {
    setQuery('');
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center w-full sm:w-[300px] max-w-xl overflow-hidden rounded-sm border border-gray-300 bg-white shadow-sm focus-within:ring-0 focus-within:ring-gray-300 ${className}`}
      aria-label="Search form"
    >
      <div className="flex items-center px-3 flex-1 min-w-0">
        <Search className="w-5 h-5 text-gray-400 flex-shrink-0" aria-hidden="true" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          aria-label="Search input"
          className="ml-2 flex-1 bg-transparent outline-none placeholder:text-gray-400 text-gray-800 text-sm sm:text-base"
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={clear}
            className="ml-2 flex-shrink-0"
          >
            <X className="w-4 h-4 text-gray-500 hover:text-gray-700" />
          </button>
        )}
      </div>

      <button
        type="submit"
        className="ml-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-r-sm flex-shrink-0 text-sm sm:text-base"
        aria-label="Search"
      >
        Search
      </button>
    </form>
  );
}
