import type { filteredListitem } from "../../types";
import ProjectListItem from "./ProjectsListItem";

const ProjectTypeListItem = ({ type, repos }: filteredListitem) => (
  <div className='project-type-list-item'>
    <div>
      <h4 className='text-2xl'>{type}</h4>
      
    </div>
    <ul className='project-list'>
      {repos.map(({ id, name, html_url, language, topics, appType }) => (
        <li key={id} className="project-list-item">
          <ProjectListItem name={name} html_url={html_url} language={language} topics={topics} appType={appType} />
        </li>
      ))}
    </ul>
  </div>
);

export default ProjectTypeListItem;