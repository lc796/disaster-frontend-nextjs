import Script from 'next/script'
import React from "react";

export default function LeafletScript() {
    return (
        <>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
                  integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
                  crossOrigin=""/>
            {/* eslint-disable-next-line @next/next/no-sync-scripts */}
            <Script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"/>

        </>
    )
}