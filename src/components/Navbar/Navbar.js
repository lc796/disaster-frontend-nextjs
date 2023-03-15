import 'leaflet/dist/leaflet.css'
import React from "react";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import styles from './Navbar.module.css'
import Link from "next/link.js";

const Navbar = () => {
    const adminLink = "http://localhost:8080/admin"

    return (
        <nav className={styles.container}>
            <ul className={styles.links}>
                <li className={styles.link}>
                    <Link href="/">Map</Link>
                    <Link href="/stats">Stats</Link>
                    <Link href="/about">About</Link>
                    <a href={adminLink}>Admin</a>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;
