import Link from "next/link";
import type { repo } from "../../types";

const ProjectListItem = ({ name, html_url, language, appType }: repo) => (
  <div>
    <h5 className="text-xl underline">{name}</h5>
    <p>{`Language: ${language}`}</p>
    <p>{`Application Type: ${appType}`}</p>
    <div className="mt-3">
      <Link href={html_url!}>View Repo</Link>
      <br />
      <Link href={`/projects/${name}`}>View Details</Link>
    </div>
  </div>
);

export default ProjectListItem;
