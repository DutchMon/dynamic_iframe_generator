import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import dynamic from "next/dynamic"

const Player = dynamic(import("../components/Player"), { ssr: false})




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
              <Player source='https://www.givemevibes.com/boot/pass.php?id=diamondbacks'/>
            </div>
          </div>
          <div className="right-column"></div>
        </div>
      </main>
    </div>
  )
}
