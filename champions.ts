import axios from 'axios';

const DDRAGON_VERSION = '14.23.1';
const DDRAGON_BASE_URL = `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}`;

export interface Champion {
  id: string;
  key: string;
  name: string;
  title: string;
  roles: string[];
  info: {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
  };
  blurb: string;
  image: {
    full: string;
  };
  tags: string[];
}

let championsCache: Record<string, Champion> = {};

export async function getChampionById(championId: number): Promise<Champion | null> {
  if (Object.keys(championsCache).length === 0) {
    try {
      const response = await axios.get(`${DDRAGON_BASE_URL}/data/en_US/champion.json`);
      const champions = response.data.data;
      
      // Create a lookup by championId
      Object.values(champions).forEach((champion: any) => {
        championsCache[champion.key] = champion;
      });
    } catch (error) {
      console.error('Failed to fetch champions:', error);
      return null;
    }
  }

  return championsCache[championId.toString()] || null;
}

export function getChampionIconUrl(championId: number): string {
  return `${DDRAGON_BASE_URL}/img/champion/${championId}.png`;
}

export function getRoleIcon(role: string): string {
  return `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/role-icon-${role.toLowerCase()}.png`;
}