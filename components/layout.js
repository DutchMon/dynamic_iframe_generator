import Head from 'next/head'
import styles from '../styles/Home.module.css'
import PropTypes from 'prop-types'

const Layout = ({ children }) => (
    <>
        <Head>
            <title>Watch Stuff</title>
            <meta name="description" content="Easier way to watch stuff" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className={styles.container}>
            <main className={styles.main}>
                <div>{children}</div>
            </main>
        </div>
    </>
)
export default Layout

Layout.propTypes = {
    children: PropTypes.node,
}