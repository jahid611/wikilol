import React from 'react';
import { Filter } from 'lucide-react';

interface CategoryFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'Attack', label: 'Attack' },
  { value: 'Magic', label: 'Magic' },
  { value: 'Defense', label: 'Defense' },
  { value: 'Support', label: 'Support' },
];

const CategoryFilter: React.FC<CategoryFilterProps> = ({ value, onChange }) => {
  return (
    <div className="relative w-full md:w-48">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Filter className="h-5 w-5 text-yellow-500/70" />
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl
                 text-gray-100 appearance-none cursor-pointer focus:outline-none 
                 focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent transition-all duration-200"
      >
        {categories.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
        <div className="w-4 h-4 border-t-2 border-r-2 border-yellow-500/70 transform rotate-45 translate-y-[-2px]"></div>
      </div>
    </div>
  );
};

export default CategoryFilter;