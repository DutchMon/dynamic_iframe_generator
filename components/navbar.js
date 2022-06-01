/*      ./components/Navbar.js      */

import Image from 'next/image'
import ActiveLink from './ActiveLink'

/*      Sports Icon image files     */



import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFutbol, faBaseball, faFootball, faBasketball, faFlagCheckered, faHockeyPuck, faGolfBall, faUserNinja } from '@fortawesome/free-solid-svg-icons'


export default function Navbar() {
    return (
        <div className="dashboard-panel is-small is-hidden-mobile">
            <div className="dashboard-panel-content">
                <aside className="menu">
                    <ul className="menu-list">
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
                </aside>
            </div>
        </div>
    )
}

/*

                        <li id="navWeapon">
                            <ActiveLink activeClassName="is-active" href="">
                                <span className="level" id="weaponIconParent">
                                    <h3 className="is-size-6">Soccer</h3>
                                    <Image
                                        src=''
                                        priority={true}
                                        alt="weaponIcon"
                                        className="weaponIcon"
                                    />
                                </span>
									 </ActiveLink>
								</li>
                        <li>
                            <ActiveLink activeClassName="is-active" href="/reports">
                                <span>
                                    <FontAwesomeIcon icon={faFileInvoice} className="menu-list" />
                                    Reports
                                </span>
                            </ActiveLink>
                        </li>
                        <li>
                            <ActiveLink activeClassName="is-active" href="/cropAnalytics">
                                <span>
                                    <FontAwesomeIcon icon={faChartBar} className="menu-list" />
                                    Crops
                                </span>
                            </ActiveLink>
                        </li>
                        <li>
                            <ActiveLink activeClassName="is-active" href="/inbox">
                                <span>
                                    <FontAwesomeIcon icon={faInbox} className="menu-list" />
                                    Inbox
                                </span>
                            </ActiveLink>
                        </li>
                        <li>
                            <ActiveLink activeClassName="is-active" href="/media">
                                <span>
                                    <FontAwesomeIcon icon={faPhotoFilm} className="menu-list" />
                                    Media
                                </span>
                            </ActiveLink>
                        </li>
                        <li>
                            <ActiveLink activeClassName="is-active" href="/settings">
                                <span>
                                    <FontAwesomeIcon icon={faGears} className="menu-list" />
                                    Settings
                                </span>
                            </ActiveLink>
                        </li>

*/