import type {
  GetStaticPaths, GetStaticPathsContext, GetStaticPathsResult,
  GetStaticProps, GetStaticPropsContext, GetStaticPropsResult,
} from "next";
import { ParsedUrlQuery } from "querystring";
import type { repo } from "../../types";

interface Params extends ParsedUrlQuery {
  url: string;
}

export const getStaticPaths: GetStaticPaths = async (ctx: GetStaticPathsContext): Promise<GetStaticPathsResult> => {
  const req = await fetch('https://api.github.com/users/undeadsyco/repos');
  const res = await req.json();

  const paths = res.map(({ name }: { name: string }) => (
    { params: { projectName: name } }
  ))

  return ({
    paths,
    fallback: false,
  })
}

type props = {
  repo?: repo,
}

export const getStaticProps: GetStaticProps = async (ctx: GetStaticPropsContext): Promise<GetStaticPropsResult<props>> => {
  const { projectName } = ctx.params as Params;

  const req = await fetch(`https://api.github.com/repos/Undeadsyco/${projectName}`);
  const res = await req.json();

  const repo = {
    id: res.id,
    name: res.name,
    html_url: res.html_url,
    url: res.url,
    description: res.description,
    homepage: res.homepage,
    language: res.language,
    updated_at: res.updated_at,
    topics: res.topics,
  }

  return ({
    props: { repo },
  });
}

export default function Project({ repo }: props) {

  return (
    <div>
      <h1>{repo!.name}</h1>
    </div>
  );
}
