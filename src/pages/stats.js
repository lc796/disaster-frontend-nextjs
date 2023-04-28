import Head from "next/head.js";
import styles from '@/styles/Stats.module.css'
import React from "react";
import dynamic from "next/dynamic.js";
import DecadeBar from "@/components/charts/decade/DecadeBar/index.js";
import CountryByCategoryBar from "@/components/charts/country/CountryByCategoryBar/index.js";
import CountryByStatusBar from "@/components/charts/country/CountryByStatusBar/index.js";

export default function Stats({disasters}) {
    const CategoryByStatusBar = React.useMemo(() => dynamic(
        () => import('../components/charts/category/CategoryByStatusBar'),
        {
            ssr: false
        }
    ), [disasters])

    const categories = [
        {value: "COLD_WAVE", label: "Cold Wave"},
        {value: "COMPLEX_EMERGENCY", label: "Complex Emergency"},
        {value: "DROUGHT", label: "Drought"},
        {value: "DUST_HAZE", label: "Dust Haze"},
        {value: "EARTHQUAKE", label: "Earthquake"},
        {value: "EPIDEMIC", label: "Epidemic"},
        {value: "EXTRA_TROPICAL_CYCLONE", label: "ETC"},
        {value: "FIRE", label: "Fire"},
        {value: "FLOOD", label: "Flood"},
        {value: "HEAT_WAVE", label: "Heat Wave"},
        {value: "INSECT_INFESTATION", label: "Insect"},
        {value: "LANDSLIDE", label: "Landslide"},
        {value: "MUDSLIDE", label: "Mudslide"},
        {value: "MAN_MADE", label: "Man Made"},
        {value: "OTHER", label: "Other"},
        {value: "SEA_LAKE_ICE", label: "Sea Lake Ice"},
        {value: "SEVERE_STORM", label: "Severe Storm"},
        {value: "SNOW", label: "Snow"},
        {value: "TROPICAL_CYCLONE", label: "Tropical Cyclone"},
        {value: "TSUNAMI", label: "Tsunami"},
        {value: "VOLCANO", label: "Volcano"},
        {value: "WATER_COLOR", label: "Water Color"},
        {value: "WILDFIRE", label: "Wildfire"}
    ]

    return (
        <>
            <Head>
                <title>Stats</title>
                <meta name="description" content="Shows latest disasters"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={styles.wrapper}>
                <CategoryByStatusBar disasters={disasters} categories={categories}/>
                <DecadeBar disasters={disasters} categories={categories}/>
                <CountryByCategoryBar disasters={disasters} categories={categories}/>
                <CountryByStatusBar disasters={disasters} categories={categories}/>
            </main>
        </>
    )
}

export async function getStaticProps() {
    const response = await fetch('http://16.16.96.183:8000/api/data/')
    const disasters = await response.json()

    return {
        props: {
            disasters,
        },
        revalidate: 60 * 60 * 24 // 24 hours
    }
}