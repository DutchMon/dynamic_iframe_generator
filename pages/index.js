import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Watch Stuff</title>
        <meta name="description" content="Easier way to watch stuff" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.title}></div>
        <div className="iframe-container videoContainer">
          <iframe loading="lazy" src="https://xestreams.com/livetv/tv11.php"  allow="fullscreen" sandbox="allow-scripts allow-same-origin allow-presentation"></iframe>
        </div>
      </main>
    </div>
  )
}
