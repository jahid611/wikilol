import React from 'react';
import { Champion } from '../api/champions';
import { Shield, Sword, Wand, CircleDot } from 'lucide-react';

interface ChampionTooltipProps {
  champion: Champion;
  position: { x: number; y: number };
}

const ChampionTooltip: React.FC<ChampionTooltipProps> = ({ champion, position }) => {
  const statBars = (value: number) => {
    return (
      <div className="flex gap-0.5">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={`h-1 w-2 rounded-sm ${
              i < value 
                ? 'bg-yellow-500' 
                : 'bg-gray-700'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      className="fixed w-80 bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700/50 z-50 p-4"
      style={{
        left: `${position.x + 10}px`,
        top: `${position.y + 10}px`,
        transform: 'translateZ(0)',
        willChange: 'transform'
      }}
    >
      <div className="flex gap-3 mb-3">
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/${champion.image.full}`}
          alt={champion.name}
          className="w-16 h-16 rounded-lg border border-gray-700/50"
        />
        <div>
          <h3 className="text-lg font-bold text-yellow-500">{champion.name}</h3>
          <p className="text-sm text-gray-400 italic">{champion.title}</p>
          <div className="flex gap-1 mt-1">
            {champion.tags.map(tag => (
              <span 
                key={tag}
                className="text-xs px-1.5 py-0.5 rounded bg-yellow-500/10 text-yellow-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2">
          <Sword className="w-4 h-4 text-red-400" />
          <span className="text-xs text-gray-400 w-16">Attack</span>
          {statBars(champion.info.attack)}
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-green-400" />
          <span className="text-xs text-gray-400 w-16">Defense</span>
          {statBars(champion.info.defense)}
        </div>
        <div className="flex items-center gap-2">
          <Wand className="w-4 h-4 text-blue-400" />
          <span className="text-xs text-gray-400 w-16">Magic</span>
          {statBars(champion.info.magic)}
        </div>
        <div className="flex items-center gap-2">
          <CircleDot className="w-4 h-4 text-purple-400" />
          <span className="text-xs text-gray-400 w-16">Difficulty</span>
          {statBars(champion.info.difficulty)}
        </div>
      </div>

      <p className="text-sm text-gray-300 leading-relaxed">
        {champion.blurb}
      </p>
    </div>
  );
};

export default ChampionTooltip;