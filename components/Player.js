import Clappr from '../node_modules/clappr/dist/clappr'
import { useRef, useEffect } from "react"
import LevelSelector from 'level-selector'
import clappr from '../node_modules/clappr/dist/clappr'


export default function Player({ options }) {



	let player = null

	useEffect(() => {

		(function (open) {
			XMLHttpRequest.prototype.open = function (method, url, async, user, pass) {

				if (url.toLowerCase().indexOf('fwmrm.net') >= 0) {

					return;

				}

				var rewrittenUrl = url
				rewrittenUrl = rewrittenUrl.replace('https://playback.svcs.mlb.com/silk/events/', 'http://bestsolaris.com/mlbkey.php?url=')
				open.call(this, method, rewrittenUrl, async, user, pass)

			}

		})(XMLHttpRequest.prototype.open)

		let source = options.source
		let playerId = options.id
		let playerContainer = document.getElementById(playerId)

		player = new Clappr.Player({
			parentId: playerId,
			source: 'https://hlslive-akc-ewr1.media.mlb.com/hdnts=exp=1654812913~acl=/*~id=00u7vsjxkvmsbqwwy356~data=e9b93528-3ec4-4228-a14d-15bd0a22ea11~hmac=147c1dc371ef78b4836eac88d2cc20ee3c80bfd4b04adb4896fa1f2da5313912/307764489dca78f597cf94245d3ad94c/va01/mlb/2022/06/08/Away_VIDEO_eng_Arizona_Diamondbacks_Cinc_20220608_1654720832047/master_desktop_slide_gdfp.m3u8',
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
				player = null
		}
	}, [options.source])



	return (
		<div className="iframe-container" id="player-wrapper"></div>
	)
}

