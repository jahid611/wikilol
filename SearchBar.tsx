import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="relative flex-1">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-yellow-500/70" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search items..."
        className="w-full pl-10 pr-4 py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl
                 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 
                 focus:ring-yellow-500/50 focus:border-transparent transition-all duration-200"
      />
    </div>
  );
};

export default SearchBar;