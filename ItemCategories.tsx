import React from 'react';
import { ItemCategory, ItemCategoryType } from '../types';

interface ItemCategoriesProps {
  categories: ItemCategory[];
  selectedCategory: ItemCategoryType;
  onSelectCategory: (category: ItemCategoryType) => void;
}

const ItemCategories: React.FC<ItemCategoriesProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200
            ${
              selectedCategory === category.id
                ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500'
                : 'bg-gray-800/50 text-gray-400 border-gray-700/50 hover:bg-gray-800'
            }
            border backdrop-blur-sm`}
        >
          <img 
            src={category.icon} 
            alt={category.name}
            className="w-5 h-5"
          />
          <span className="font-medium text-sm whitespace-nowrap">{category.name}</span>
          <span className="ml-auto text-sm opacity-75">
            {category.items.length}
          </span>
        </button>
      ))}
    </div>
  );
};

export default ItemCategories;