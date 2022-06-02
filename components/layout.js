import Navbar from './navbar'
import Head from 'next/head'
import Header from './Header'
import PropTypes from 'prop-types'
import Script from 'next/script'

const Layout = ({ children }) => (
	<>
		<Head>
			<title>Watch Stuff</title>
			<meta name="description" content="Easier way to watch stuff" />
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<body>
			<Script
				src='https://app.web3ads.net/main.js'
				strategy="afterInteractive"
				async='true'
				onError={(e) => {
					console.error('Ad Script failed to load')
				}}
			/>
			<div className="dashboard is-full-height">
				<Navbar></Navbar>
				<div className="dashboard-main is-scrollable">
					<Header />
					<div>
						<main>
							<div>{children}</div>
						</main>
					</div>
				</div>
			</div>
		</body>
	</>
)
export default Layout

Layout.propTypes = {
	children: PropTypes.node,
}