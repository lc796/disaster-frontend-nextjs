import React from "react";
import styles from './Key.module.css'
import Image from 'next/image'

const Key = (props) => {
    return (
            <div className={styles.container}>
                <h3>Key ({props.selectedView})</h3>
                {props.selectedView === "marker" && (
                    <ul>
                        <li><Image src="/markers/green.png" width={20} height={20} alt={"Severe Storm Marker"}/> Severe Storm</li>
                        <li><Image src="/markers/blue.png" width={20} height={20} alt={"Severe Storm Marker"}/> Sea Lake Ice</li>
                        <li><Image src="/markers/red.png" width={20} height={20} alt={"Severe Storm Marker"}/> Wildfire</li>
                    </ul>
                )}
                {props.selectedView === "choropleth" && (
                    <ul>
                        <li><span className={styles.fifty}>∎</span> &gt;50 disasters</li>
                        <li><span className={styles.fourty}>∎</span> &gt;40 disasters</li>
                        <li><span className={styles.thirty}>∎</span> &gt;30 disasters</li>
                        <li><span className={styles.twenty}>∎</span> &gt;20 disasters</li>
                        <li><span className={styles.ten}>∎</span> &gt;10 disasters</li>
                        <li><span className={styles.lessThanTen}>∎</span> &lt;10 disasters</li>
                        <li><span className={styles.zero}>∎</span> No disasters</li>

                    </ul>
                )}
            </div>
    )
}

export default Key