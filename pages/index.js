import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import dynamic from "next/dynamic"
import Dropdown from '../components/Dropdown'
import { useEffect, useState } from 'react'
import { now } from 'moment-timezone'

const Player = dynamic(import("../components/Player"), { ssr: false })

const moment = require('moment-timezone')


function Home({ scheduled, finished, upcoming, inProgress }) {

	const awayTeams = []
	const homeTeams = []
	const [data, setData] = useState(null)
	const [isLoading, setLoading] = useState(false)
	const streamUrls = []

		scheduled[0].forEach((e, index) => {
			awayTeams[index] = scheduled[0][index].teams.away
			homeTeams[index] = scheduled[0][index].teams.home
			const time1 = moment.tz("America/Phoenix").format("hh:mm A").slice(0, 5)
			const time2 = scheduled[0][index].gameTime.slice(0, 5)
			const [hours1, minutes1] = time1.split(':')
			const [hours2, minutes2] = time2.split(':')
			const date1 = new Date(2022, 0, 1, +hours1, +minutes1)
			const date2 = new Date(2022, 0, 1, +hours2, +minutes2)
			const timeDif = ((date1.getTime() - date2.getTime()) / 1000) / (60 * 60)
			const roundedTime = Math.abs(Math.round(timeDif))
			if (roundedTime <= 1) {
				streamUrls[index] = 'https://www.givemevibes.com/boot/pass.php?id='+ scheduled[0][index].teams.home.split(' ').pop();
				//console.log("stream url " + index, streamUrls[index])
			}
		})

		fetch(streamUrls[8])
		.then((res) => res.text())
		.then((data) => {
			setData(data)
		})
	//const streamURL = res.url

	//console.log(typeof data)

	function makeTableRow(scheduledObj, i) {
		let gameTime = scheduledObj.gameTime
		let away = scheduledObj.teams.away
		let home = scheduledObj.teams.home
		return (
			<tr key={i}>
				<td>{home}</td>
				<td>vs.</td>
				<td>{away}</td>
				<td>{gameTime}</td>
			</tr>
		)
	}



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
					{scheduled[0].length === 0 ? (
						<div className="left-column">
							<h2>No scheduled games for today</h2>
						</div>
					) : (
							<div className="left-column justify-center">
								<h2>Scheduled Games</h2>
								<table className="table-auto">
									<thead>
										<tr>
											<th>Home</th>
											<th></th>
											<th>Away</th>
											<th>Time</th>
										</tr>
									</thead>
									<tbody>
										{scheduled[0].map(makeTableRow)}
									</tbody>
								</table>
							</div>
						)}
					<div className="main-column">
						<div className="videoContainer">
							<Player source="" />
						</div>
					</div>
					<div className="right-column"></div>
				</div>
			</main>
		</div>
	)
}

export async function getServerSideProps() {

	let dev = process.env.NODE_ENV !== 'production'
	let { DEV_URL, PROD_URL } = process.env

	const mlbRes = await fetch(`${dev ? DEV_URL : PROD_URL}/api/mlb`)
	let mlbData = await mlbRes.json()

	//console.log("--Hello--", mlbData['scheduled'])



	return {
		props: {
			//data: streamURL,
			scheduled: mlbData['scheduled'],
			finished: mlbData['finished'],
			upcoming: mlbData['upcoming'],
			inProgress: mlbData['inProgress']
		}
	}
}

export default Home