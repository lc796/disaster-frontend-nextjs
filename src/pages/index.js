import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import dynamic from "next/dynamic.js";
import React from "react";
import { useState } from "react";

export default function Home({disasters}) {
    const [selectedView, setSelectedView] = useState("choropleth");
    const [countriesToFilter, setCountriesToFilter] = useState([]);
    const [typesToFilter, setTypesToFilter] = useState([]);
    const [activeDisastersOnlyFilter, setActiveDisastersOnlyFilter] = useState(false);
    const [filteredDisasters, setFilteredDisasters] = useState(disasters);

    const Map = React.useMemo(() => dynamic(
        () => import('../components/Map'),
        {
            ssr: false
        }
    ), [disasters])

    const MapSidebar = React.useMemo(() => dynamic(
        () => import('../components/MapSidebar'),
        {
            ssr: false
        }
    ), [disasters])

    return (
        <>
            <Head>
                <title>Disaster Display</title>
                <meta name="description" content="Shows latest disasters"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                <section className={styles.sidebar}>
                    <MapSidebar
                        disasters={disasters}
                        setSelectedView={setSelectedView}
                        selectedView={selectedView}
                        setFilteredDisasters={setFilteredDisasters}
                        filteredDisasters={filteredDisasters}
                        countriesToFilter={countriesToFilter}
                        setCountriesToFilter={setCountriesToFilter}
                        typesToFilter={typesToFilter}
                        setTypesToFilter={setTypesToFilter}
                        activeDisastersOnlyFilter={activeDisastersOnlyFilter}
                        setActiveDisastersOnlyFilter={setActiveDisastersOnlyFilter}
                    />
                </section>
                <section className={styles.map}>
                    <Map
                        disasters={disasters}
                        selectedView={selectedView}
                        filteredDisasters={filteredDisasters}
                    />
                </section>
            </main>
        </>
    )
}

export async function getStaticProps() {
    const response = await fetch('http://127.0.0.1:8000/api/data/')
    const disasters = await response.json()

    return {
        props: {
            disasters,
        },
        revalidate: 60 * 60 * 24 // 24 hours
    }
}