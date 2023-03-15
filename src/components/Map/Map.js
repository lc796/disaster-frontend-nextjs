import {GeoJSON, MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import React from "react";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import useSWR from "swr";
import styles from './Map.module.css'

const countryFetcher = (url) => fetch(url).then((response) => response.json());

const Map = (props) => {
    const disasters = props.disasters

    const renderListOfDisasters = (disasters) => {
        return disasters.map(disaster => {

            return (
                <div key={disaster.id}>
                    <Marker position={[disaster.latitudinal, disaster.longitudinal]}>
                        <Popup>
                            {disaster.name}
                        </Popup>
                    </Marker>
                </div>
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

        return {totalDisasterCount, countryDisasterCounts}
    }

    const mapPolygonColorToProportion=(proportion => {
        return proportion > 0.8 ? '#a50f15' :
            proportion > 0.6 ? '#de2d26' :
                proportion > 0.4 ? '#fb6a4a' :
                    proportion > 0.2 ? '#fc9272' :
                        '#fee5d9';
    })

    const { totalDisasterCount, countryDisasterCounts } = countDisasters(disasters);

    const getCountryStyle = (feature => {
        const country = feature.properties.ADMIN;
        const proportion = (countryDisasterCounts[country] / totalDisasterCount) * 100;

        return ({
            fillColor: mapPolygonColorToProportion(proportion),
            weight: 1,
            opacity: 0.2,
            color: 'white',
            dashArray: '2',
            fillOpacity: 0.2
        });
    });

    return (
        <>
            <MapContainer center={[51.505, -0.09]} zoom={3} scrollWheelZoom={true} className={styles.map}>
                <TileLayer
                    attribution="© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
                    url="https://api.mapbox.com/styles/v1/lukecollishaw796/clf77aic800aw01qkgtexqyny/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibHVrZWNvbGxpc2hhdzc5NiIsImEiOiJjbGY3Nzl0MWYxdGhoM3hyMGZrb2UycDZvIn0.IRtqpRM9MBhp9peAlzPMrg"
                    minZoom={3}
                    maxZoom={12}
                />
                {countries && disasters && (
                    <GeoJSON data={countries} style={getCountryStyle} />
                )}
                { renderListOfDisasters(props.plottableDisasters) }
            </MapContainer>
        </>
    )
}

export default Map
