declare namespace Projects {
  type repo = {
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

  type repos = Array<repo>;

  type projectsPageProps = {
    repos: repos;
  }

  type filteredListitem = {
    type: string;
    repos: repos;
  }

  type filteredList = Array<filteredListitem>;

  type listContainerProps = {
    list: filteredList;
    filterType: string;
    handleFilterChange: ChangeEventHandler;
  }
}