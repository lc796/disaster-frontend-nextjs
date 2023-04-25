import styles from "@/styles/404.module.css";
import Head from "next/head";

export default function FourOhFour() {
    return (
        <>
            <Head>
                <title>Error 404</title>
                <meta name="description" content="Shows latest disasters"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <h1>Error 404 - Page Not Found!</h1>
                    <p>The route you are trying to access does not seem to exist.</p>
                    <p><a href={"/"}>Click to return home.</a></p>
                </div>
            </div>
        </>
    )
}