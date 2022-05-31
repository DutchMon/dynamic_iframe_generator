import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import dynamic from "next/dynamic"
import Dropdown from '../components/Dropdown'
import { useEffect, useState } from 'react'
import { server } from '../config'
import { resolveHref } from 'next/dist/shared/lib/router/router'

const Player = dynamic(import("../components/Player"), { ssr: false })

const moment = require('moment-timezone')


function Home({ gameURLs, scheduled, finished, upcoming, inProgress }) {

	console.log("URLSSSSSSSSS ------ ", gameURLs)
	const gameURL = gameURLs

	const awayTeams = []
	const homeTeams = []
	const streamUrls = []

	const updateStreams = async () => {

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
				streamUrls[index] = 'https://www.givemevibes.com/boot/pass.php?id=' + scheduled[0][index].teams.away.split(' ').pop();
				//console.log("stream url " + index, streamUrls[index])
			}
		})
		/*
		const res = await fetch(streamUrls[0], {
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		})
		const gameURL = await res.json()

		console.log("Did this work???", gameURL)
		*/

		//console.log("URL ==== ", res)

		//const data = res.text()

	}


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
						<button className="bg-blueGray-500 text-white active:bg-blueGray-600 font-bold uppercase text-base px-8 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={updateStreams}>
							Get Streams
						</button>
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
							<Player source={gameURL} />
						</div>
					</div>
					<div className="right-column"></div>
				</div>
			</main>
		</div>
	)
}

export async function getServerSideProps() {
	const scheduledGamesArray = []
	const inProgressGamesArray = []
	const awayTeams = []
	const homeTeams = []
	const scheduledUrls = []
	const inProgressUrls = []


	let dev = process.env.NODE_ENV !== 'production'
	let { DEV_URL, PROD_URL } = process.env

	const mlbRes = await fetch(`${dev ? DEV_URL : PROD_URL}/api/mlb`)
	let mlbData = await mlbRes.json()

	//console.log("--Hello--", mlbData['inProgress'])

	mlbData['scheduled'][0].forEach((e, i) => {
		scheduledGamesArray[i] = mlbData['scheduled'][0][i]
	})
	mlbData['inProgress'][0].forEach((e, i) => {
		inProgressGamesArray[i] = mlbData['inProgress'][0][i]
	})


	scheduledGamesArray.forEach((e, index) => {
		awayTeams[index] = scheduledGamesArray[index].teams.away
		homeTeams[index] = scheduledGamesArray[index].teams.home
		const time1 = moment.tz("America/Phoenix").format("hh:mm A").slice(0, 5)
		const time2 = scheduledGamesArray[index].gameTime.slice(0, 5)
		const [hours1, minutes1] = time1.split(':')
		const [hours2, minutes2] = time2.split(':')
		const date1 = new Date(2022, 0, 1, +hours1, +minutes1)
		const date2 = new Date(2022, 0, 1, +hours2, +minutes2)
		const timeDif = ((date1.getTime() - date2.getTime()) / 1000) / (60 * 60)
		const roundedTime = Math.abs(Math.round(timeDif))
		if (roundedTime <= 1) {
			scheduledUrls[index] = 'https://www.givemevibes.com/boot/pass.php?id=' + scheduledGamesArray[index].teams.away.split(' ').pop();
			console.log("Scheduled stream url " + index, scheduledUrls[index])
		}
	})
	if (inProgressGamesArray.length >= 1) {
		inProgressGamesArray.forEach((e, index) => {
			awayTeams[index] = inProgressGamesArray[index].teams.away
			homeTeams[index] = inProgressGamesArray[index].teams.home
			inProgressUrls[index] = 'https://www.givemevibes.com/boot/pass.php?id=' + inProgressGamesArray[index].teams.away.split(' ').pop();
			console.log("inProgress stream url " + index, inProgressUrls[index])
		})
	}

	const res = await fetch(inProgressUrls[0])
	const gameURL = await res.url

	//console.log("scheduled",gameURL)


	return {
		props: {
			gameURLs: gameURL,
			scheduled: mlbData['scheduled'],
			finished: mlbData['finished'],
			upcoming: mlbData['upcoming'],
			inProgress: mlbData['inProgress']
		}
	}
}

export default Home