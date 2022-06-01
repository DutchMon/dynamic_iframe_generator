import React, { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ActiveLink from './ActiveLink'

import tvIcon from '../public/tv-icon.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFutbol, faBaseball, faFootball, faBasketball, faFlagCheckered, faHockeyPuck, faGolfBall, faUserAstronaut, faUserNinja } from '@fortawesome/free-solid-svg-icons'
import { getSession, signIn, signOut, useSession } from 'next-auth/react'
import { useOnClickOutside } from './hooks'


function Logo() {
	return (
		<div className="column" id="mobileLogo">
			<div className="is-centered-mobile">
				<div className="mobile-logo-wrapper">
					<Image
						src={tvIcon}
						alt="webapp logo icon image"
					/>
				</div>
			</div>
		</div>
	)
}

const toggleBurger = (e) => {
	let burgerIcon = document.getElementById('burger');
	let dropMenu = document.getElementById('navMenu');
	burgerIcon.classList.toggle('is-active');
	dropMenu.classList.toggle('is-active');
}

const closeBurger = (e) => {
	let burgerIcon = document.getElementById('burger');
	let dropMenu = document.getElementById('navMenu');
	burgerIcon.classList.remove('is-active');
	dropMenu.classList.remove('is-active')
}

const Header = () => {
	const { data: session } = useSession()
	const node = useRef();
	useOnClickOutside(node, (e) => closeBurger())


	return (
		<>
			<nav className="navbar is-fixed-top is-black is-hidden-touch">
				<div className="navbar-menu">
					<div className="navbar-end">
						<ul className="login-list">
							{session ? (
								<>
									<li className="welcomeSignOut">
										<h3 id="loggedIn">session.user.name</h3>
										<button className="button is-link is-small" onClick={() => signOut()}>Sign Out</button>
									</li>
									<li>
										<Image
											className="roundProfilePic"
											src={session.user.image}
											alt="user profile picture"
											width={50}
											height={50}
											layout='fixed'
										/>
									</li>
								</>
							) : (
									<>
										<li>
											<a href="">
												<img src="/tv-icon.png"style={{height: 60 + 'px'}}/>
											</a>
										</li>
										<li>
											<Link href="/">
												<a>Login</a>
											</Link>
										</li>
									</>
								)}
						</ul>
					</div>
				</div>
			</nav>
			<nav className="navbar is-fixed-top is-black is-hidden-desktop is-flex" id="mobileCenter" ref={node}>
				<Logo></Logo>
				<div className="column is-flex is-justify-content-flex-end">

					<ul className="login-list">
						{session ? (
							<>
								<li>
									<Image
										className="roundProfilePic"
										src={session.user.image}
										alt="user profile picture"
										width={50}
										height={50}
										layout='fixed'
									/>
								</li>
								<li>
									<button className="button is-link is-small" onClick={() => signOut()}>Sign Out</button>
								</li>
							</>
						) : (
								<>
									<li>
										<a href="">
											<span>
												<FontAwesomeIcon icon={faUserAstronaut} className="menu-list" />
											</span>
										</a>
									</li>
									<li>
										<Link href="/login">
											<a>Login</a>
										</Link>
									</li>
								</>
							)}
					</ul>
					<div className="navbar-burger burger" id="burger" onClick={toggleBurger}>
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
					</div>
				</div>
				<div className="navbar-menu is-black is-hidden-desktop" id="navMenu">
					<ul className="menu-list burgerMenu">
						<li className="navItemFirst" id="navSport">
							<ActiveLink activeClassName="is-active" href="/">
								<span className="level">
									<h3 className="is-size-6">Dashboard</h3>
								</span>
							</ActiveLink>
						</li>
						<li id="navSport">
							<ActiveLink activeClassName="is-active" href="/soccer">
								<span className="level" id="sportIconParent">
									<h3 className="is-size-6">Soccer</h3>
									<FontAwesomeIcon icon={faFutbol} className="menu-list" />
								</span>
							</ActiveLink>
						</li>
						<li id="navSport">
							<ActiveLink activeClassName="is-active" href="/mlb">
								<span className="level" id="sportIconParent">
									<h3 className="is-size-6">MLB</h3>
									<FontAwesomeIcon icon={faBaseball} className="menu-list" />
								</span>
							</ActiveLink>
						</li>
						<li id="navSport">
							<ActiveLink activeClassName="is-active" href="/nfl">
								<span className="level" id="sportIconParent">
									<h3 className="is-size-6">NFL</h3>
									<FontAwesomeIcon icon={faFootball} className="menu-list" />
								</span>
							</ActiveLink>
						</li>
						<li id="navSport">
							<ActiveLink activeClassName="is-active" href="/nba">
								<span className="level" id="sportIconParent">
									<h3 className="is-size-6">NBA</h3>
									<FontAwesomeIcon icon={faBasketball} className="menu-list" />
								</span>
							</ActiveLink>
						</li>
						<li id="navSport">
							<ActiveLink activeClassName="is-active" href="/mma">
								<span className="level" id="sportIconParent">
									<h3 className="is-size-6">MMA/Boxing</h3>
									<FontAwesomeIcon icon={faUserNinja} className="menu-list" />
								</span>
							</ActiveLink>
						</li>
						<li id="navSport">
							<ActiveLink activeClassName="is-active" href="/f1">
								<span className="level" id="sportIconParent">
									<h3 className="is-size-6">F1</h3>
									<FontAwesomeIcon icon={faFlagCheckered} className="menu-list" />
								</span>
							</ActiveLink>
						</li>
						<li id="navSport">
							<ActiveLink activeClassName="is-active" href="/nhl">
								<span className="level" id="sportIconParent">
									<h3 className="is-size-6">NHL</h3>
									<FontAwesomeIcon icon={faHockeyPuck} className="menu-list" />
								</span>
							</ActiveLink>
						</li>
						<li id="navSport">
							<ActiveLink activeClassName="is-active" href="/pga">
								<span className="level" id="sportIconParent">
									<h3 className="is-size-6">PGA</h3>
									<FontAwesomeIcon icon={faGolfBall} className="menu-list" />
								</span>
							</ActiveLink>
						</li>
					</ul>
				</div>
			</nav>
		</>
	)
}

export default Header

export async function getServerSideProps(context) {
	return {
		props: {
			session: await getSession(context),
		},
	}
}

/*

								<li>
									 <ActiveLink activeClassName="is-active" href="/reports">
										  <span>
												Reports
												<FontAwesomeIcon icon={faFileInvoice} className="menu-list" />
										  </span>
									 </ActiveLink>
								</li>
								<li>
									 <ActiveLink activeClassName="is-active" href="/cropAnalytics">
										  <span>
												Crops
												<FontAwesomeIcon icon={faChartBar} className="menu-list" />
										  </span>
									 </ActiveLink>
								</li>
								<li>
									 <ActiveLink activeClassName="is-active" href="/inbox">
										  <span>
												Inbox
												<FontAwesomeIcon icon={faInbox} className="menu-list" />
										  </span>
									 </ActiveLink>
								</li>
								<li>
									 <ActiveLink activeClassName="is-active" href="/media">
										  <span>
												Media
												<FontAwesomeIcon icon={faPhotoFilm} className="menu-list" />
										  </span>
									 </ActiveLink>
								</li>
								<li>
									 <ActiveLink activeClassName="is-active" href="/settings">
										  <span>
												Settings
												<FontAwesomeIcon icon={faGears} className="menu-list" />
										  </span>
									 </ActiveLink>
								</li>
*/