import Clappr from '../node_modules/clappr/dist/clappr'
import { useRef, useEffect } from "react"
import LevelSelector from 'level-selector'

export default function Player({ source }) {

/*
    (function (open) {

        XMLHttpRequest.prototype.open = function (method, url, async, user, pass) {

            if (url.toLowerCase().indexOf('fwmrm.net') >= 0) {

                return

            }

            var rewrittenUrl = url;
            rewrittenUrl = rewrittenUrl.replace('https://playback.svcs.mlb.com/silk/events/','https://cdn.hyunas.icu/keys/mlb1/orioles1.php?');
            open.setRequestHeader('')
            open.call(this, method, rewrittenUrl, async, user, pass)

        }

    })(XMLHttpRequest.prototype.open)

*/
    useEffect(() => {

        const playerElement = document.getElementById('player-wrapper')
        const player = new Clappr.Player({
            source: source,
            mimeType: 'application/x-mpegURL',
            mediacontrol: {seekbar: "#0053EF", buttons: "#D61616"},
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

        return (player.attachTo(playerElement))
    }, [])



    return (
        <div className="iframe-container" id="player-wrapper"></div>
    )
}
