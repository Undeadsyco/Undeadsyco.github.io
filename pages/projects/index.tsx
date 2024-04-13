import type { GetStaticProps, GetStaticPropsContext, GetStaticPropsResult } from "next";

import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { ListContainer, ProjectsHeader } from "../../components";

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext): Promise<GetStaticPropsResult<Projects.projectsPageProps>> => {
  const req = await fetch('https://api.github.com/users/undeadsyco/repos');
  const res = await req.json();

  const repos = Array.from(res).map((repo: any): Projects.repo => {
    const { id, name, url, html_url, description, homepage, language, updated_at, topics } = repo;
    let appType:string;
    if(topics.includes('game')) appType = 'game';
    else if(topics.includes('mobile-app')) appType = 'mobile-app';
    else if(topics.includes('desktop-app')) appType = 'desktop-app';
    else appType = 'website';

    return ({
      id,
      name,
      url,
      html_url,
      description,
      homepage,
      language,
      updated_at,
      topics,
      appType,
    });
  });

  return ({
    props: {
      repos: repos ?? []
    }
  })
}

export default function Projects({ repos }: Projects.projectsPageProps) {
  const [filterType, setFilterType] = useState<string>('projectTypes');
  const filterTypes = {
    projectTypes: ['school-project', 'personal-project', 'tutorial-project', 'capstone-project'],
    applicationTypes: ['game', 'website', 'server', 'mobile-app', 'desktop-app'],
    developmentTypes: [
      'game-development', 'fullstack-development', 'front-end-development',
      'backend-development', 'blockchain-development', 'mobile-development', 'desktop-development',
    ],
    techTypes: ['react', 'redux', 'axios', 'styled-components', 'express', 'phaser'],
  }

  let list: Projects.filteredList;

  switch (filterType) {
    case 'projectTypes':
      list = filterTypes.projectTypes.map(type => ({ type, repos: repos.filter((repo) => repo.topics?.includes(type)) }));
      break;
    case 'applicationTypes':
      list = filterTypes.applicationTypes.map(type => ({ type, repos: repos.filter((repo) => repo.topics?.includes(type)) }));
      break;
    case 'developmentTypes':
      list = filterTypes.developmentTypes.map(type => ({ type, repos: repos.filter((repo) => repo.topics?.includes(type)) }));
      break;
    case 'techTypes':
      list = filterTypes.techTypes.map(type => ({ type, repos: repos.filter((repo) => repo.topics?.includes(type)) }));
      break;
    default:
      list = filterTypes.projectTypes.map(type => ({ type, repos: repos.filter((repo) => repo.topics?.includes(type)) }));
      break;
  }

  const handleFilterChange: ChangeEventHandler = (e: ChangeEvent<HTMLSelectElement>) => { setFilterType(e.target.value) }

  return (
    <div className="projects-page">
      <ProjectsHeader />
      <ListContainer filterType={filterType} handleFilterChange={handleFilterChange} list={list} />
    </div>
  )
}