import React from 'react';
import { X } from 'lucide-react';
import { Item } from '../types';
import { formatGold } from '../utils';

interface ItemModalProps {
  item: Item | null;
  onClose: () => void;
}

const ItemModal: React.FC<ItemModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 rounded-xl max-w-md w-full relative overflow-hidden">
        <div className="absolute top-2 right-2">
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 rounded-lg"
            />
            <div>
              <h3 className="text-xl font-bold text-yellow-500">{item.name}</h3>
              <p className="text-yellow-400 font-medium">
                {formatGold(item.price)} Gold
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {Object.entries(item.stats).length > 0 && (
              <div className="bg-gray-800/50 rounded-lg p-3">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Stats</h4>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(item.stats).map(([stat, value]) => (
                    <div key={stat} className="flex justify-between text-sm">
                      <span className="text-gray-400">{stat}</span>
                      <span className="text-yellow-500">+{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-400">Description</h4>
              <p className="text-sm text-gray-300 leading-relaxed"
                 dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;