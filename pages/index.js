import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import dynamic from "next/dynamic"
import Dropdown from '../components/Dropdown'

const Player = dynamic(import("../components/Player"), { ssr: false})




function Home({ data }) {

  //console.log(typeof data)

  return (
    <div className={styles.container}>
      <Head>
        <title>Watch Stuff</title>
        <meta name="description" content="Easier way to watch stuff" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className="column-container">
          <div className="left-column content-center">
            <Dropdown></Dropdown>
          </div>
          <div className="main-column">
            <div className={styles.title}>Enjoy the game</div>
          </div>
          <div className="right-column"></div>
        </div>
        <div className="column-container">
          <div className="left-column"></div>
          <div className="main-column">
            <div className="videoContainer">
              <Player source={data} />
            </div>
          </div>
          <div className="right-column"></div>
        </div>
      </main>
    </div>
  )
}

 export async function getServerSideProps() {
  const res = await fetch('https://www.givemevibes.com/diamondbacks-royals/')
  //console.log(res.url)
  const streamURL = res.url

  return {
    props: { data: streamURL  }
  }
}

export default Home