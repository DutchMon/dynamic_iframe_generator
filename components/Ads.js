import { useEffect } from 'react'

const Ads = () => {
	useEffect(() => {
	  try {
		 (window.main = window.main || []).push({})
	  } catch (err) {
		 console.log(err)
	  }
	}, [])

	return (
		<div className="_0cbf1c3d417e250a" data-zone="47314943b3cf42f8bc5737e36452dad0" style={{ width: 234 + 'px', height: 60 + 'px', display: 'inline-block', margin: 0 + 'auto'}}></div>
	)
 }

 export default Ads