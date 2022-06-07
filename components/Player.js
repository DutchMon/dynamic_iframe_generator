import Clappr from '../node_modules/clappr/dist/clappr'
import { useRef, useEffect } from "react"
import LevelSelector from 'level-selector'
import clappr from '../node_modules/clappr/dist/clappr'


export default function Player({ options }) {

	let player = null

	useEffect(() => {

		let source = options.source
		let playerId = options.id
		let playerContainer = document.getElementById(playerId)

		player = new Clappr.Player({
			parentId: playerId,
			source: source,
			mimeType: 'application/x-mpegURL',
			mediacontrol: { seekbar: "#0053EF", buttons: "#D61616" },
			autoPlay: false,
			height: '100%',
			width: '100%',
			playInline: true,
			crossOrigin: true,
			flushLiveURLCache: false,
			disableVideoTagContextMenu: true,
			hlsjsConfig: {
				xhrSetup: function (xhr, url) {
					xhr.withCredentials = false;
				}
			},
			playbackConfig: {
				crossorigin: ''
			},
			plugins: [LevelSelector],

			levelSelectorConfig: {

				labelCallback: function (playbackLevel, customLabel) {

					return Math.round(playbackLevel.level.bitrate / 1000) + ' kbps';

				}

			},
		})

		player.attachTo(playerContainer)

		return () => {
			player.destroy(),
			player=null
		}
	}, [options.source])



	return (
		<div className="iframe-container" id="player-wrapper"></div>
	)
}

