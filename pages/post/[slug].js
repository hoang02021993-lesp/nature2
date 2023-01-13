/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import { links } from '../../lib/links';

export default function Post({ data }) {
  const router = useRouter();
  useEffect(() => {
    // console.log(data);
    // if(router.query.fbclid) {
      window.location.href = data.endpoint;
    // }
  }, []);

  return (
    <>
      <Head>
        <title>{data?.title}</title>
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={data?.title} />
        <meta property="og:description" content={data?.description ?? '...'} />
        <meta property="og:url" content="" />
        <meta property="og:site_name" content="" />
        <meta property="og:image" content={data?.image} />
      </Head>
      <div>
        <p>{data?.title}</p>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const slug = context.params.slug;
  const data = await links.getBySlug(slug);
  if(!data) {
    return {
      redirect: '/',
      props: {}
    };
  }
  // Pass data to the page via props
  return { props: { data: JSON.parse(JSON.stringify(data)) } }
}
