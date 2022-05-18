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
              <Player source='https://video-weaver.phx01.hls.ttvnw.net/v1/playlist/CpUFSMyh4yX2FoGnwfr13PMUlNZUJgWbsTQf8BbNU4Zy9mYl8jSqmEY2gugoDLC2Rh_w3YqIWu5QRiIT1UUmPBnTQv6MlARw5mq2An9gHB-RlMX8UgYH2CFIAtZQiKDofiuOb1MFE7QuWidaMNM4LrmuyIzxtk0ZP00JOf5BI32QQi9ZqT4FCOpSukxDvsF0DE3aPRH57GFRa28S4G0DCT-bw-THG-sCb7kkB9QxdlGa4W0D6laJb7WG4uHuGL6wwoPBZYAYlfBU0r51HFT21p2Y8yVMPBMQvkyiK7eSqmaBaVNyp_99ojCAoADsd-kzbGREYtJeLmExD-AdHjnqp7bN94OezfyiVeFj2DGTl2qAuKETHZq8rZRGilYvaGSP_q_SRSt54kkVgV7uucGSwbEYTiprEDQ86zi9L9gz7-i7GPxprOeVnE1u1UaiPnUIOQ2MQeAQK8llSqWewqr7I8p18TBd43gVZG1PZ1-H6Apz-k2u2HZoHqjn579SliWv5Lu1nDpMsTTWOR0MBz-A5wi14aQfAnBwntzpu5OA62E2EB9bkNoZGj5t89CkDzTAYqsfO4bG_pR62iAAKnbRsy5ZoEn-kSpfW7u30kBVAUymJwLtIQfljE9NJvcX6rlqAayv_05r-I_zH7RR3PlpcYg7onTPYKcAOaLpPnEF49AnkQFiGKL02N_ozyfNUX9A2UiLMJHZZxg70fTASv_jPklPoeLgtVsTGMEj8NVnKKbKGOmKnrD02kxS91NY5V45MAp3FK0pV_sQPzhaAedj6y2hlrY_SxXTFKpOSvElYrjdm9QP079QDjegi1uLQM8SAEXlgR8_PWPXHOd_4NN0VnhQQzFQ4pSIa5YJ69HsOqK31V3jx7_EYhoMSScmQkV4calX1D6SIAEqCXVzLWVhc3QtMjDdAw.m3u8'/>
            </div>
          </div>
          <div className="right-column"></div>
        </div>
      </main>
    </div>
  )
}
