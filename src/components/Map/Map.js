import {GeoJSON, MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import React from "react";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import useSWR from "swr";
import styles from './Map.module.css'
import Key from "@/components/Map/Key/index.js";
import {Icon} from "leaflet/src/layer/index.js";

const countryFetcher = (url) => fetch(url).then((response) => response.json());

const Map = (props) => {
    const disasters = props.filteredDisasters

    const plottableDisasters = []
    for (const disaster of disasters) {
        if (disaster.latitudinal != null && disaster.longitudinal != null) {
            plottableDisasters.push(disaster)
        }
    }

    const greenMarker = new Icon({iconUrl: "/markers/green.png", iconSize: [32, 32]})
    const redMarker = new Icon({iconUrl: "/markers/red.png", iconSize: [32, 32]})
    const blueMarker = new Icon({iconUrl: "/markers/blue.png", iconSize: [32, 32]})
    const getMarkerIcon = (type) => {
        type = type.toLowerCase()
        if (type === "wildfire") return redMarker
        if (type === "sea_lake_ice") return blueMarker
        if (type === "severe_storm") return greenMarker
    }

    const renderListOfDisasters = (disasters) => {
        return disasters.map(disaster => {
            return (
                <Marker key={disaster.id}
                        position={[disaster.latitudinal, disaster.longitudinal]}
                        icon={getMarkerIcon(disaster.category)}
                >
                    <Popup>
                        {disaster.name}
                    </Popup>
                </Marker>
            )
        })
    }

    const { data: countryData, error } = useSWR('/api/countries', countryFetcher);
    if (error) return <div>Error</div>;
    if (!countryData) return <span/>;

    const countries = JSON.parse(countryData).features.map((country) => {
        return country;
    });

    const countDisasters = (disasters) => {
        const countryDisasterCounts = {};
        let totalDisasterCount = 0


        for (const country of countries) {
            countryDisasterCounts[country.properties.ADMIN] = 0
        }

        for (const disaster of disasters) {
            if (disaster.api === "EONET") continue;
            totalDisasterCount += 1;
            const country = disaster.country;
            const currentCount = countryDisasterCounts[country];
            if (typeof currentCount === 'undefined') {
                countryDisasterCounts[country] = 1;
                continue;
            }
            countryDisasterCounts[country] = currentCount + 1;
        }

        return countryDisasterCounts
    }

    const mapPolygonColorToProportion=(proportion => {
        return proportion > 50 ? '#80070c' :
            proportion > 40 ? '#ad1b14' :
                proportion > 30 ? '#d73c21' :
                    proportion > 20 ? '#d9643f' :
                        proportion > 10 ? '#d06f54' :
                            proportion > 0 ? '#cca191' :
                                '#fee5d9';
    })

    const countryDisasterCounts = countDisasters(disasters);

    const getCountryStyle = (feature => {
        const country = feature.properties.ADMIN;
        // const proportion = (countryDisasterCounts[country] / totalDisasterCount) * 100;
        const count = countryDisasterCounts[country]

        return ({
            fillColor: mapPolygonColorToProportion(count),
            weight: 1,
            opacity: 0.2,
            color: 'white',
            dashArray: '2',
            fillOpacity: 0.2
        });
    });

    return (
        <>
            <Key selectedView={props.selectedView}/>
            <MapContainer center={[51.505, -0.09]} zoom={3} scrollWheelZoom={true} className={styles.map}>
                <TileLayer
                    attribution="© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
                    url="https://api.mapbox.com/styles/v1/lukecollishaw796/clf77aic800aw01qkgtexqyny/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibHVrZWNvbGxpc2hhdzc5NiIsImEiOiJjbGY3Nzl0MWYxdGhoM3hyMGZrb2UycDZvIn0.IRtqpRM9MBhp9peAlzPMrg"
                    minZoom={3}
                    maxZoom={12}
                />
                {props.selectedView === "choropleth" && countries && disasters && (
                    <GeoJSON data={countries} style={getCountryStyle} />
                )}
                {props.selectedView === "marker" && renderListOfDisasters(plottableDisasters) }
            </MapContainer>
        </>
    )
}

export default Map
