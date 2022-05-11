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
        <div className="column-container">
          <div className="left-column"></div>
          <div className="main-column">
            <div className={styles.title}>Enjoy the game</div>
          </div>
          <div className="right-column"></div>
        </div>
        <div className="column-container">
          <div className="left-column"></div>
          <div className="main-column">
            <div className="videoContainer">
              <div className="iframe-container">
                <iframe loading="lazy" src="https://hazmolive.stream/mlb/index.php?team=marlins" allow="fullscreen" sandbox="allow-scripts allow-same-origin allow-presentation"></iframe>
              </div>
            </div>
          </div>
          <div className="right-column"></div>
        </div>
      </main>
    </div>
  )
}