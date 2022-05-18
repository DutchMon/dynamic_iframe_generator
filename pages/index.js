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
              <Player source='https://hlslive-akc-ewr1.media.mlb.com/hdnts=exp=1652989278~acl=/*~id=00u7wswqeh2rj4unp356~data=e64c34b9-8596-4a82-8fd6-43f19d7d1a0b~hmac=0569dac1f68d7561182234dbf036fb125536f741dd9fa0444514dce51f6b12a1/99bda64d5725ac50018301f7dd5269ba/va01/mlb/2022/05/18/Away_VIDEO_eng_Arizona_Diamondbacks_Los__20220518_1652897425098/192K/192_complete_gdfp.m3u8'/>
            </div>
          </div>
          <div className="right-column"></div>
        </div>
      </main>
    </div>
  )
}
