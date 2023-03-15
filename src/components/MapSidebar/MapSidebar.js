import 'leaflet/dist/leaflet.css'
import React from "react";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import styles from './MapSidebar.module.css'

const MapSidebar = (props) => {
    const disasters = props.disasters

    return (
        <div className={styles.container}>
            <h1>Sidebar</h1>
        </div>
    )
}

export default MapSidebar;
