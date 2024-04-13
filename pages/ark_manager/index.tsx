import { GetServerSideProps, GetServerSidePropsResult, Redirect } from 'next';
import { redirect } from 'next/navigation';

type redirectTo = { redirect: Redirect; }

type notFound = { notFound: true; }

type props = {

}

export const getServerSideProps: GetServerSideProps<props> = async (context) => {
  return {
    props: {}
  }
}

export default function ArkManager(props: GetServerSidePropsResult<props>) {
  if ((props as notFound).notFound) return redirect('/404');
  if ((props as redirectTo).redirect) return redirect((props as redirectTo).redirect.destination);

  return (
    <div>
      <h1>Ark Manager</h1>
      <p>
        This is the Ark Manager page.
      </p>
    </div>
  )
}