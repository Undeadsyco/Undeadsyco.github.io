import type { listContainerProps } from '../types/index';

import ProjectTypeListItem from './ProjectsTypeListItem';

const listContainer = ({ list, filterType, handleFilterChange }: listContainerProps) => (
  <div>
    <h3>Sort By</h3>
    <select value={filterType} onChange={handleFilterChange}>
      <option value="projectTypes">Project Type</option>
      <option value="applicationTypes">Application Type</option>
      <option value="developmentTypes">Development Type</option>
      <option value="techTypes">Tech</option>
    </select>
    <ul className='project-type-list'>
      {list.map(({ type, repos }) => (
        <li key={type} className='my-8'>
          <ProjectTypeListItem type={type} repos={repos} />
        </li>
      ))}
    </ul>
  </div>
);

export default listContainer;