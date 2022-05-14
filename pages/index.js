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
                <iframe loading="lazy" src="https://cdn.lanzo.quest/iosYeni.php?url=https://hlslive-akc-ewr1.media.mlb.com/hdnts=exp=1652577317~acl=/*~id=00u7phpyzrhk079kt356~data=bc28062d-e957-49f3-b6b2-81dcbbf70e0f~hmac=a2e9e480f5329fb647929cc919ad6ca428230c68fecc32cec590d6beb620a359/58f72d7122a94894c420acace368426a/va01/mlb/2022/05/14/National_VIDEO_spa_Chicago_Cubs_Arizona_Diam_20220514_1652485227025/master_desktop_complete_gdfp.m3u8" allow="fullscreen" ></iframe>
              </div>
            </div>
          </div>
          <div className="right-column"></div>
        </div>
      </main>
    </div>
  )
}
