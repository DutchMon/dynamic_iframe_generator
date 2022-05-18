import Clappr from 'clappr'
import { useRef, useEffect } from "react"
import LevelSelector from 'level-selector'

export default function Player({ source }) {

    const videoRef = useRef()

    useEffect(() => {

        const playerElement = document.getElementById('player-wrapper')
        const player = new Clappr.Player({
            source: source,
            mimeType: 'application/x-mpegURL',
            autoPlay: true,
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
                crossorigin: 'use-credentials'
            },
            plugins: [LevelSelector]
        })

        return (player.attachTo(playerElement))
    }, [])



    return (
        <div className="iframe-container" id="player-wrapper"></div>
    )
}
