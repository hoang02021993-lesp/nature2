/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Test() {
  return (
    <div className={styles.container}>
      <Head>
        <title>The Whales used to walk on land, Egyptian researchers identify new fossils</title>
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Whales used to walk on land, Egyptian researchers identify new fossils" />
        <meta property="og:url" content="" />
        <meta property="og:site_name" content="" />
        <meta property="article:section" content="Animal" />
        <meta property="og:image" content="/uploads/test.jpeg" />
      </Head>

      <div className="">
        <h1>Whales used to walk on land, Egyptian researchers identify new fossils</h1>
        <p>Whales weren’t always just aquatic animals, as newly identified fossils have revealed that whales once had legs and walked on land.</p>
        <img src="/uploads/test.jpeg" alt="whales" />
      </div>
    </div>
  )
}
