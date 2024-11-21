import React from 'react';

interface RankIconProps {
  tier: string;
  size?: 'sm' | 'md' | 'lg';
}

const RankIcon: React.FC<RankIconProps> = ({ tier, size = 'md' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const rankImages: Record<string, string> = {
    IRON: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/iron.png',
    BRONZE: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/bronze.png',
    SILVER: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/silver.png',
    GOLD: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/gold.png',
    PLATINUM: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/platinum.png',
    DIAMOND: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/diamond.png',
    MASTER: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/master.png',
    GRANDMASTER: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/grandmaster.png',
    CHALLENGER: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/challenger.png'
  };

  return (
    <img
      src={rankImages[tier]}
      alt={tier}
      className={`${sizes[size]} object-contain`}
    />
  );
};

export default RankIcon;