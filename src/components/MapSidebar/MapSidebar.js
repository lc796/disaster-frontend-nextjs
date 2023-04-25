import 'leaflet/dist/leaflet.css'
import React, {useEffect} from "react";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import styles from './MapSidebar.module.css';
import FilterContainer from "@/components/MapSidebar/filters/FilterContainer/index.js";
import applyFilters from "@/components/MapSidebar/filters/applyFilters.js";
import Link from "next/link.js";


const MapSidebar = (props) => {
    // When we change view, we want to restore filter options to default
    useEffect(() => {
        props.setActiveDisastersOnlyFilter(false)
        props.setCountriesToFilter([])
        applyFilters(
            props.disasters,
            props.setFilteredDisasters,
            props.countriesToFilter,
            props.typesToFilter,
            props.activeDisastersOnlyFilter,
            props.selectedView
        )
    }, [props.selectedView])

    const listDisasters = (disasters) => {
        return disasters.map(disaster => {
            // Conditionally render depending on what data is available about the particular disaster
            // (Since EONET does not store country data)
            return (
                <li key={disaster.id}>
                    <Link href={"/disasters/" + disaster.id} key={disaster.id}>
                        {disaster.name}
                    </Link>
                    <br/>
                    {disaster.country && (
                        <span className={styles.listItemSmallText}>{disaster.country} - </span>
                    )}
                    {disaster.category && (
                        <span className={styles.listItemSmallText}>{disaster.category}</span>
                    )}
                    <br/><br/>
                </li>
            )
        })
    }

    /* Returns active class name if option one matches option two */
    const isActive = (a, b) => {
        if (a === b) {
            return styles.active
        }
        return ""
    }

    return (
        <div className={styles.container}>
            <div className={styles.views}>
                <button
                    onClick={() => {
                        props.setSelectedView("choropleth")
                        props.setCountriesToFilter([])
                    }}
                    className={isActive(props.selectedView, "choropleth")}>
                    <h2 className={isActive(props.selectedView, "choropleth")}>Choropleth</h2>
                </button>
                <button
                    onClick={() => {
                        props.setSelectedView("marker")
                    }}
                    className={isActive(props.selectedView, "marker")}>
                    <h2 className={isActive(props.selectedView, "marker")}>Marker</h2>
                </button>
            </div>

            <FilterContainer
                disasters={props.disasters}
                filteredDisasters={props.filteredDisasters}
                setFilteredDisasters={props.setFilteredDisasters}
                selectedView={props.selectedView}
                countriesToFilter={props.countriesToFilter}
                setCountriesToFilter={props.setCountriesToFilter}
                typesToFilter={props.typesToFilter}
                setTypesToFilter={props.setTypesToFilter}
                activeDisastersOnlyFilter={props.activeDisastersOnlyFilter}
                setActiveDisastersOnlyFilter={props.setActiveDisastersOnlyFilter}
            />

                <div className={styles.list}>
                    <h2>Showing <b>{props.filteredDisasters.length}</b> Disasters</h2>
                    <ul>
                        {listDisasters(props.filteredDisasters)}
                    </ul>
                </div>
        </div>
    )
}

export default MapSidebar;
