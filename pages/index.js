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
              <Player source='https://hlslive-akc-ewr1.media.mlb.com/hdnts=exp=1653064037~acl=/*~id=00u7xxaigvuyqprvr356~data=20c5df3a-3bf6-410c-bba0-4e4d83b3405f~hmac=2d73a7f65c810d3dfb373487a39d19e84a263ef69f03a05f8088e5b15a67c672/8224edc1c778bade3bc801f308eb0c95/va01/mlb/2022/05/19/Home_VIDEO_eng_New_York_Yankees_Baltimor_20220519_1652970938046/master_desktop_complete_gdfp.m3u8'/>
            </div>
          </div>
          <div className="right-column"></div>
        </div>
      </main>
    </div>
  )
}
