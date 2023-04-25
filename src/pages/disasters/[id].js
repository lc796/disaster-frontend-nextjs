import styles from '@/styles/[id].module.css'
import Head from "next/head.js";

export const getStaticPaths = async () => {
    const response = await fetch("http://localhost:8000/api/data/")
    const disasters = await response.json()

    const paths = disasters.map(disaster => {
        return {
            params: { id: disaster.id.toString() }
        }
    })

    return {
        paths: paths,
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    const id = context.params.id
    const response = await fetch("http://localhost:8000/api/data/" + id)
    const disaster = await response.json()

    return {
        props: { disaster: disaster }
    }
}

export default function Disaster({ disaster }) {
    return (
        <>
            <Head>
                <title>{disaster.name}</title>
                <meta name="description" content="Shows latest disasters"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main>
                <div className={styles.wrapper}>
                    <div className={styles.container}>

                        <h2>{disaster.name}</h2>
                        {disaster.country && (
                            <p><b>Country</b>: {disaster.country}</p>
                        )}
                        {disaster.category && (
                            <p><b>Category</b>: {disaster.category}</p>
                        )}
                        {disaster.status && (
                            <p><b>Status</b>: {disaster.status}</p>
                        )}
                        {disaster.api && (
                            <p><b>Sourced from</b>: {disaster.api}</p>
                        )}
                        {disaster.reference && (
                            <p><b>Reference article</b>: <a>{disaster.reference}</a></p>
                        )}
                        <br/>
                        <div
                            dangerouslySetInnerHTML={{__html: disaster.description}}
                        />
                    </div>
                </div>
            </main>
        </>
    )
}
