import 'leaflet/dist/leaflet.css'
import React from "react";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import styles from './Navbar.module.css'
import Link from "next/link.js";

const Navbar = () => {
    return (
        <nav className={styles.container}>
            <ul className={styles.links}>
                <li>
                    <div className={styles.link}>
                        <Link href="/">Map</Link>
                    </div>
                </li>
                <li>
                    <div className={styles.link}>
                        <Link href="/stats">Stats</Link>
                    </div>
                </li>
                <li>
                    <div className={styles.link}>
                        <Link href="/about">About</Link>
                    </div>
                </li>
                <li>
                    <div className={styles.link}>
                        <a href="localhost:8000/admin">Admin</a>
                    </div>
                </li>

            </ul>
        </nav>
    )
}

export default Navbar;
