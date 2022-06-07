import Layout from '../components/layout'
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import dynamic from "next/dynamic"
import { server } from '../config'


//const Player = dynamic(import("../components/Player"), { ssr: false })
const Player = dynamic(() =>
	import('../components/Player'),
	{ ssr: false }
)

const moment = require('moment-timezone')




const Home = ({ gameURLs, scheduled, finished, upcoming, inProgress }) => {

	const VideoPlayer = ({ playerKey, source }) => {

		let options = {}
		let playerId = 'player-wrapper'

		options = {
			source: source,
			id: playerId,
			key: playerKey
		}

		return (
			<div className="is-centered">
				<div className="videoContainer">
					<Player options={options} />
				</div>
			</div>
		)
	}

	let urlObject = {}
	let gameURL = ''

	gameURLs.forEach((e, i) => {
		for (const event in scheduled[0]) {
			if (gameURLs[i].includes(scheduled[0][event].teams.away.split(' ').pop()) || gameURLs[i].includes(scheduled[0][event].teams.home.split(' ').pop())) {
				gameURL = gameURLs[i]
				urlObject[scheduled[0][event]._id] = {
					url: gameURLs[i]
				}
			}
		}
	})

	const [source, setSource] = useState(gameURL)
	const [newStream, setNewStream] = useState(false)


	const [playerKey, setPlayerKey] = useState(0)
	const buildVideoPlayer = useMemo(() => VideoPlayer({ playerKey, source }), [source])



	const loadNewStream = (x) => {
		let gamePk = x.target.id
		let source = ''
		if (urlObject[gamePk] != undefined) {
			source = urlObject[gamePk]['url']
		}

		setSource(source = { source })
		if (!newStream) {
			setNewStream(true)
			buildVideoPlayer
			setPlayerKey(playerKey => playerKey + 1)
		} else if (newStream) {
			setNewStream(false)
			console.log(source)
		}
	}


	const [rowOpen, setRowOpen] = useState('')

	const toggleSubMenu = useCallback((e) => {

		let parentId = e.target.parentNode.id
		let subRowId = parentId + "Sub"
		//let newStream = urlObject[parentId]
		//console.log("fire when row clicked ", urlObject[parentId])

		let subRow = document.getElementById(subRowId)
		let toggleRow = subRow.classList.toggle('hidden')

		if (!toggleRow) {

			setRowOpen(subRowId)


		} else if (toggleRow) {
			//Toggle row to be hidden
			toggleRow
			setRowOpen('')
		}
		else {
			subRow = document.getElementById(rowOpen)
			subRow.classList.toggle('hidden')

			setRowOpen(subRowId)
		}
	}, [])


	function makeTableRow(scheduledObj, i) {
		let gameTime = scheduledObj.gameTime
		let away = scheduledObj.teams.away
		let home = scheduledObj.teams.home
		let eventId = scheduledObj._id

		return (
			<>
				<tr id={eventId} key={i} onClick={toggleSubMenu}>
					<td data-label="Name">{home} vs. {away}</td>
					<td data-label="Sport">MLB</td>
					<td data-label="Time">{gameTime}</td>
				</tr>
				<tr className="detail hidden" id={eventId + 'Sub'} key={i + 'Sub'}>
					<td>Load new stream?</td>
					<td className="level-right">
						<button className="button is-dark" id={eventId} onClick={loadNewStream}>Load Stream</button>
					</td>
					<td></td>
				</tr>
			</>
		)
	}


	return (
		<Layout>
			<div className="column opacityLayer">
				<div className="container">
					<section className="hero is-small">
						<div className="hero-body">
							<h1 className="title is-size-2 is-uppercase mobileTextCenter" >Watch Live Sports!</h1>
						</div>
					</section>
					<section className="hero">
						{buildVideoPlayer}
					</section>
				</div>
				<div className="container">
					<hr className="is-hidden-mobile"></hr>
					{scheduled[0].length === 0 ? (
						<>
							<section>
								<div className="hero is-centered">
									<div className="hero-body">
										<div className="level is-hidden-mobile">
											<div className="level-left">
												<p className="title is-size-2 is-spaced">No Scheduled Events</p>
											</div>
											<div className="level-right">
												<button className="button is-dark" href="">Button</button>
											</div>
										</div>
									</div>
								</div>
							</section>
							<hr className="is-hidden-mobile"></hr>
						</>
					) : (
							<section>
								<div className="hero is-centered">
									<div className="hero-body">
										<div className="level is-hidden-mobile">
											<div className="level-left">
												<p className="title is-size-2 is-spaced">Top Events</p>
											</div>
											<div className="level-right">
												<a className="button is-dark" href="">Button</a>
											</div>
										</div>
									</div>
								</div>
								<hr className="is-hidden-mobile"></hr>
								<section>
									<div className="b-table has-pagination box" id="boxTable">
										<div className="table-wrapper">
											<table className="table is-fullwidth is-striped is-hoverable is-fullwidth">
												<thead>
													<tr>
														<th>
															<abbr title="Name">Event</abbr>
														</th>
														<th>
															<abbr title="Sport">Sport</abbr>
														</th>
														<th>
															<abbr title="Time">Start Time</abbr>
														</th>
													</tr>
												</thead>
												<tbody>
													{scheduled[0].map(makeTableRow)}
												</tbody>
											</table>
										</div>
									</div>
								</section>
							</section>
						)}
				</div>
			</div>
		</Layout>
	)
}

export async function getServerSideProps() {
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



