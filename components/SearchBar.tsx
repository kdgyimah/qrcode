'use client';

import { useState, useCallback, FormEvent, ChangeEvent, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  initialValue?: string;
  suggestions?: string[];
  onSearch: (query: string) => void;
  className?: string;
}

export default function SearchBar({
  placeholder = 'Insert Type',
  initialValue = '',
  suggestions = [],
  onSearch,
  className = '',
}: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      onSearch(query.trim());
      setOpen(false);
    },
    [onSearch, query]
  );

  const clear = useCallback(() => {
    setQuery('');
    setOpen(false);
    onSearch('');
  }, [onSearch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    onSearch(val);
    setOpen(Boolean(val.trim()) && suggestions.length > 0);
  };

  const handleSelect = (s: string) => {
    setQuery(s);
    onSearch(s);
    setOpen(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        handleSelect(suggestions[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div ref={wrapperRef} className={`relative w-full sm:w-[300px] max-w-xl ${className}`}>
      <form
        onSubmit={handleSubmit}
        className="flex items-center w-full overflow-hidden rounded-sm border border-gray-300 bg-white shadow-sm focus-within:ring-0 focus-within:ring-gray-300"
        aria-label="Search form"
      >
        <div className="flex items-center px-3 flex-1 min-w-0">
          <Search className="w-5 h-5 text-gray-400 flex-shrink-0" aria-hidden="true" />
          <input
            type="text"
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            aria-label="Search input"
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-gray-400 text-gray-800 text-sm sm:text-base"
            onFocus={() => setOpen(Boolean(query.trim()) && suggestions.length > 0)}
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

      {/* Suggestions dropdown */}
      {open && suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 mt-1 z-50 bg-white border rounded-md max-h-48 overflow-y-auto shadow-md">
          {suggestions.map((s, i) => (
            <li
              key={i}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(s);
              }}
              onMouseEnter={() => setActiveIndex(i)}
              className={`px-3 py-2 cursor-pointer ${
                activeIndex === i ? 'bg-gray-100' : ''
              }`}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
