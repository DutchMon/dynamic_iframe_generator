import styles from '../styles/Home.module.css'
import dynamic from "next/dynamic"
import Dropdown from '../components/Dropdown'
import { server } from '../config'
import Layout from '../components/layout'

const Player = dynamic(import("../components/Player"), { ssr: false })

const moment = require('moment-timezone')


function Home({ gameURLs, scheduled, finished, upcoming, inProgress }) {

	//console.log("URLSSSSSSSSS ------ ", gameURLs)
	let gameURL = gameURLs[0]

	gameURLs.forEach((e, i) => {
		if (gameURLs[i].includes('Diamondbacks')) {
			gameURL = gameURLs[i]
			console.log("Yessss Dbacks")
		} else {
			console.log("No Dbacks")
		}
	})



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
		<Layout>
			<div className="column-container">
				<div className="left-column content-center">
					<Dropdown></Dropdown>
				</div>
				<div className="main-column">
					<div className={styles.title}>Enjoy the game</div>
					<button className="bg-blueGray-500 text-white active:bg-blueGray-600 font-bold uppercase text-base px-8 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
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
		</Layout>
	)
}

export async function getStaticProps() {
	const scheduledGamesArray = []
	const inProgressGamesArray = []
	const finishedGamesArray = []
	const awayTeams = []
	const homeTeams = []
	const streamUrls = []
	const scheduledUrls = []
	const inProgressUrls = []
	const finishedUrls = []
	const promises = []


	let dev = process.env.NODE_ENV !== 'production'
	let { DEV_URL, PROD_URL } = process.env

	const mlbRes = await fetch(`${server}/api/mlb`)
	let mlbData = await mlbRes.json()

	//console.log("--Hello--", mlbData['inProgress'])

	mlbData['scheduled'][0].forEach((e, i) => {
		scheduledGamesArray[i] = mlbData['scheduled'][0][i]
	})
	mlbData['inProgress'][0].forEach((e, i) => {
		inProgressGamesArray[i] = mlbData['inProgress'][0][i]
	})
	mlbData['finished'][0].forEach((e, i) => {
		finishedGamesArray[i] = mlbData['finished'][0][i]
	})

	/*------Don't need to use time for this honestly... the stream just wont exist if its not created yet

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
			console.log("date1: ", date1.getTime())
			console.log("date2: ", date2.getTime())
			if (roundedTime <= 1) {
				scheduledUrls.push('https://www.givemevibes.com/boot/pass.php?id=' + scheduledGamesArray[index].teams.away.split(' ').pop())
				scheduledUrls.push('https://www.givemevibes.com/boot/pass.php?id=' + scheduledGamesArray[index].teams.home.split(' ').pop())
				//console.log("Scheduled stream url " + index, scheduledUrls[index])
			}
		})
		*/
	if (scheduledGamesArray.length >= 1) {
		scheduledGamesArray.forEach((e, index) => {
			awayTeams[index] = scheduledGamesArray[index].teams.away
			homeTeams[index] = scheduledGamesArray[index].teams.home
			scheduledUrls.push('https://www.givemevibes.com/boot/pass.php?id=' + scheduledGamesArray[index].teams.away.split(' ').pop())
			scheduledUrls.push('https://www.givemevibes.com/boot/pass.php?id=' + scheduledGamesArray[index].teams.home.split(' ').pop())
			//console.log("inProgress stream url " + index, inProgressUrls[index])
		})
	}
	if (inProgressGamesArray.length >= 1) {
		inProgressGamesArray.forEach((e, index) => {
			awayTeams[index] = inProgressGamesArray[index].teams.away
			homeTeams[index] = inProgressGamesArray[index].teams.home
			inProgressUrls.push('https://www.givemevibes.com/boot/pass.php?id=' + inProgressGamesArray[index].teams.away.split(' ').pop())
			inProgressUrls.push('https://www.givemevibes.com/boot/pass.php?id=' + inProgressGamesArray[index].teams.home.split(' ').pop())
			//console.log("inProgress stream url " + index, inProgressUrls[index])
		})
	}
	/*
	if (finishedGamesArray.length >= 1) {
		finishedGamesArray.forEach((e, index) => {
			awayTeams[index] = finishedGamesArray[index].teams.away
			homeTeams[index] = finishedGamesArray[index].teams.home
			finishedUrls.push('https://www.givemevibes.com/boot/pass.php?id=' + finishedGamesArray[index].teams.away.split(' ').pop())
			finishedUrls.push('https://www.givemevibes.com/boot/pass.php?id=' + finishedGamesArray[index].teams.home.split(' ').pop())
			//console.log("inProgress stream url " + index, inProgressUrls[index])
		})
	}
	*/

	inProgressUrls.forEach((e, i) => {
		streamUrls.push(inProgressUrls[i])
	})
	scheduledUrls.forEach((e, i) => {
		streamUrls.push(scheduledUrls[i])
	})


	const getStreams = async (url) => {
		const res = await fetch(url)
		if (res.status == 200) {
			return res.url
		} else {
			return null
		}
	}
	streamUrls.forEach((e, i) => {
		promises[i] = getStreams(streamUrls[i])
		//console.log("testing", streamUrls[i])
	})

	const results = await Promise.all(promises)
	const filtered = results.filter(n => n)
	function removeDuplicates(array) {
		return array.filter((item, i) =>
			array.indexOf(item) === i)
	}
	const allURLs = removeDuplicates(filtered)

	//console.log("results hereeeeeee : ", allURLs)



	return {
		props: {
			gameURLs: allURLs,
			scheduled: mlbData['scheduled'],
			finished: mlbData['finished'],
			upcoming: mlbData['upcoming'],
			inProgress: mlbData['inProgress']
		}
	}
}

export default Home