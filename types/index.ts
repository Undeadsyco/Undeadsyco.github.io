import { ChangeEventHandler } from 'react';
import { Types } from "mongoose";

export type IDType = (Types.ObjectId | string);

export type optionals<T> = { [P in keyof T]?: T[P] };

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
