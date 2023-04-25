import styles from '@/styles/About.module.css'
import Head from "next/head.js";

export default function About() {
    return (
        <>
            <Head>
                <title>About</title>
                <meta name="description" content="Shows latest disasters"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <h1>About</h1>
                    <h3>Where is the data sourced from?</h3>
                    <p>
                        This data was sourced from both the ReliefWeb and NASA EONET APIs. From the list of disasters in the map sidebar, you can view more details about a particular disaster, including the reference provided by the API provider, such as a reference used by EONET or ReliefWeb.
                    </p>
                    <br/><br />
                    <h3>How accurate is the data? <span>(Legal Disclaimer)</span></h3>
                    <p>
                        As stated above, the application sources disaster data from two different APIs rather than sourcing it ourselves. This means that you should make an assessment about the trustworthiness of ReliefWeb and EONET. That being said, we believe they are an excellent resource, and hope that their inclusion in this project is valuable. With that all in mind, while we try to ensure that we use accurate data for reported disasters, we take no responsibility for assuring accuracy of the information. Please take any information on your own accord, and we recommend checking the references for yourself.
                    </p>
                    <br /><br/>
                    <h3>How often is the data refreshed?</h3>
                    <p>The short answer is that the <b>data is refreshed once every 24 hours</b>.</p><br/>
                    <p>The longer answer is that, due to the performance overhead of fetching data from the server to render the application client-side, it would be more performant to fetch data at build time, and then provide a static copy of the client upon request for a set duration. After this duration has passed, the first received request will cause the static files to be regenerated. This technique, called Incremental Static Regeneration (ISR) enables fast and snappy performance, at the slight cost of first loading time and with the understanding that data may be stale for a short period of time.</p>
                    <br />
                    <br /><br />
                    <h3>Why are the filters different for the choropleth and marker views?</h3>
                    <p>We source data from EONET to render the marker view, and we source data from ReliefWeb to render the choropleth view. Due to differences in the datasets, some attributes are provided in one data set but not the other, and vice versa. The inclusion of certain attributes (like country) enables a filter option for that particular view. For more technical details, please check our open-source <a href="https://github.com/lc796/disaster-frontend-nextjs">GitHub repository</a>. Note that this issue also impacts the way names are formatted on the sidebar disaster list, if they have a country attribute, etc.</p>
                </div>
            </div>
        </>
    )
}