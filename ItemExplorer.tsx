import React, { useState } from 'react';
import { useItems } from '../hooks/useItems';
import ItemGrid from './ItemGrid';
import SearchBar from './SearchBar';
import ItemCategories from './ItemCategories';
import { ItemCategoryType, ITEM_CATEGORIES } from '../types';
import { categorizeItems } from '../utils/items';

const ItemExplorer: React.FC = () => {
  const { items, loading, error } = useItems();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ItemCategoryType>(ITEM_CATEGORIES.ATTACK_DAMAGE);

  const itemCategories = categorizeItems(items);
  const filteredItems = itemCategories.find(cat => cat.id === selectedCategory)?.items || [];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <div className="bg-red-500/10 backdrop-blur-sm rounded-lg p-4 mb-4">
          <p className="text-red-500 font-medium">Failed to load items</p>
          <p className="text-gray-400 text-sm mt-1">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>
      <ItemCategories 
        categories={itemCategories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <ItemGrid items={filteredItems} />
    </div>
  );
};

export default ItemExplorer;