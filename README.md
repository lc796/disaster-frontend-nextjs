# Disaster Display Frontend
## [View the live site](https://disaster.lukecs.dev)

## Introduction
Project built using Next.JS, bootstrapped with create-next-app. This consumes the [API provided by the backend](https://github.com/lc796/disaster_display_backend) to incrementally regenerate static pages. This makes the application much faster than simply using React, and allows us to render a large number of disasters at once.

The map component uses the Leaflet library, tile layers from OpenStreetMaps, and the React-Leaflet package. The sidebar and filtering system uses the React-Select and React-Select-Countries packages. The stats page renders bar charts to display a variety of information about disasters using Nivo.rocks and various packages.

## Technology used
- Next.js (built on React)
- Leaflet
- OpenStreetMaps
- React-Select and React-Select-Country
- Nivo.rocks

Deployed using Netlify.