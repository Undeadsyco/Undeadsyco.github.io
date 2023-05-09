import { ChangeEventHandler } from 'react';

export type repo = {
  id?: number;
  name?: string;
  url?: string;
  html_url?: string;
  description?: string;
  homepage?: string;
  language?: string;
  updated_at?: string;
  topics?: Array<string>;
  appType?: string;
}

export type repos = Array<repo>;

export type projectsPageProps = {
  repos: repos;
}

export type filteredListitem = {
  type: string;
  repos: repos;
}

export type filteredList = Array<filteredListitem>;

export type listContainerProps = {
  list: filteredList;
  filterType: string;
  handleFilterChange: ChangeEventHandler;
}

export type sex = 'M'|'F'|'';
export type platfrom = 'Xbox'|'Switch'|'';
export type tameType = 'wild'|'born'|'';
export type lvls = {
  wild: number;
  tamed: number;
  current: number;
  max: number;
};
export type stats = {
  health: number;
  stamina: number;
  weight: number;
  damage: number;
};
export type tameStats = {
  starting: stats;
  affinity: stats;
  current: stats;
}
export type parents = {
  mother: string;
  father: string;
}
export type tame = {
  name: string;
  platform: platfrom;
  sex: sex;
  lvls: lvls;
  stats: tameStats;
  parents: parents;
} 