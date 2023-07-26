import type { GetStaticPaths, GetStaticPathsContext, GetStaticPathsResult, GetStaticProps, GetStaticPropsContext, GetStaticPropsResult, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'

export default function Tame(props: InferGetStaticPropsType<typeof getStaticProps>) {
  
}

export const getStaticPaths: GetStaticPaths = async (context: GetStaticPathsContext): Promise<GetStaticPathsResult> => {
  const db = process.env.DATABASE, tamesCollection = process.env.TAMES_COLLECTION;

  return ({
    paths: [],
    fallback: false,
  });
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext): Promise<GetStaticPropsResult<any>> => {
  const db = process.env.DATABASE, tamesCollection = process.env.TAMES_COLLECTION;
  if (!db) return ({
    redirect: {
      destination: '/ark',
      permanent: false,
    }
  })
  return ({
    props: {},
  })
}