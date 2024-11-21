import { Item, ItemCategory, ITEM_CATEGORIES } from '../types';

const CATEGORY_NAMES: Record<string, string> = {
  [ITEM_CATEGORIES.ATTACK_DAMAGE]: 'Attack Damage',
  [ITEM_CATEGORIES.ABILITY_POWER]: 'Ability Power',
  [ITEM_CATEGORIES.ARMOR]: 'Armor',
  [ITEM_CATEGORIES.MAGIC_RESIST]: 'Magic Resist',
  [ITEM_CATEGORIES.HEALTH]: 'Health',
  [ITEM_CATEGORIES.MANA]: 'Mana',
  [ITEM_CATEGORIES.ATTACK_SPEED]: 'Attack Speed',
  [ITEM_CATEGORIES.LIFE_STEAL]: 'Life Steal'
};

const STAT_ICONS: Record<string, string> = {
  'Attack Damage': 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/statmodsadaptiveforceicon.png',
  'Ability Power': 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/statmodsadaptiveforceicon.png',
  'Armor': 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/statmodsarmoricon.png',
  'Magic Resist': 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/statmodsmagicresicon.png',
  'Health': 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/statmodshealthscalingicon.png',
  'Mana': 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/statmodsmanaicon.png',
  'Attack Speed': 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/statmodsattackspeedicon.png',
  'Life Steal': 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-images/statmods/statmodsadaptiveforceicon.png'
};

export function getStatIcon(stat: string): string {
  return STAT_ICONS[stat] || '';
}

export function categorizeItems(items: Item[]): ItemCategory[] {
  const categories = Object.values(ITEM_CATEGORIES).map(id => ({
    id,
    name: CATEGORY_NAMES[id],
    icon: STAT_ICONS[CATEGORY_NAMES[id]],
    items: [],
  }));

  // Sort items by price (most expensive first)
  const sortedItems = [...items].sort((a, b) => b.price - a.price);

  sortedItems.forEach(item => {
    Object.entries(item.stats).forEach(([stat, value]) => {
      let category;
      
      switch(stat.toLowerCase()) {
        case 'attack damage':
          category = ITEM_CATEGORIES.ATTACK_DAMAGE;
          break;
        case 'ability power':
          category = ITEM_CATEGORIES.ABILITY_POWER;
          break;
        case 'armor':
          category = ITEM_CATEGORIES.ARMOR;
          break;
        case 'magic resist':
          category = ITEM_CATEGORIES.MAGIC_RESIST;
          break;
        case 'health':
          category = ITEM_CATEGORIES.HEALTH;
          break;
        case 'mana':
          category = ITEM_CATEGORIES.MANA;
          break;
        case 'attack speed':
          category = ITEM_CATEGORIES.ATTACK_SPEED;
          break;
        case 'life steal':
          category = ITEM_CATEGORIES.LIFE_STEAL;
          break;
      }

      if (category) {
        const categoryIndex = categories.findIndex(c => c.id === category);
        if (categoryIndex !== -1 && !categories[categoryIndex].items.includes(item)) {
          categories[categoryIndex].items.push(item);
        }
      }
    });
  });

  return categories.filter(category => category.items.length > 0);
}

export function formatGold(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}