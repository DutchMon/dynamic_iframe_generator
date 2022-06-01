import Navbar from './navbar'
import Head from 'next/head'
import Header from './Header'
import PropTypes from 'prop-types'

const Layout = ({ children }) => (
    <>
        <Head>
            <title>Watch Stuff</title>
            <meta name="description" content="Easier way to watch stuff" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
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
    </>
)
export default Layout

Layout.propTypes = {
    children: PropTypes.node,
}