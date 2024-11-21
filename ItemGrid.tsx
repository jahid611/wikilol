import React, { useState } from 'react';
import { Item } from '../types';
import ItemTooltip from './ItemTooltip';

interface ItemGridProps {
  items: Item[];
}

const ItemGrid: React.FC<ItemGridProps> = ({ items }) => {
  const [hoveredItem, setHoveredItem] = useState<Item | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div 
      className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-14 xl:grid-cols-16 gap-1.5"
      onMouseMove={handleMouseMove}
    >
      {items.map((item) => (
        <div
          key={item.id}
          className="relative group"
          onMouseEnter={() => setHoveredItem(item)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <div className="bg-gray-900/40 backdrop-blur-sm rounded-md p-1 transform transition-all duration-150 
                        hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/10 
                        border border-gray-700/30 hover:border-yellow-500/50">
            <div className="relative aspect-square">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover rounded"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      ))}
      {hoveredItem && (
        <ItemTooltip
          item={hoveredItem}
          position={mousePosition}
        />
      )}
    </div>
  );
};

export default ItemGrid;