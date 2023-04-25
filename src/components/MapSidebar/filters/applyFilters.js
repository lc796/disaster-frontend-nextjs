const applyFilters = (disasters, setFilteredDisasters, countriesToFilter, typesToFilter, activeDisastersOnlyFilter, selectedView) => {
    let filteredDisastersByCountry = []
    if (countriesToFilter !== null && countriesToFilter.length > 0) {
        for (const disaster of disasters) {
            for (const country of countriesToFilter) {
                if (disaster.country === country.label) {
                    filteredDisastersByCountry.push(disaster)
                }
            }
        }
    } else {
        filteredDisastersByCountry = [...disasters]
    }

    let filteredDisastersByType = []
    if (typesToFilter !== null && typesToFilter.length > 0) {
        for (const disaster of disasters) {
            for (const type of typesToFilter) {
                if (disaster.category === type.value) {
                    filteredDisastersByType.push(disaster)
                }
            }
        }
    } else {
        filteredDisastersByType = [...disasters]
    }

    let filteredDisastersByIsActiveOnly = []
    if (activeDisastersOnlyFilter) {
        for (const disaster of disasters) {
            if (disaster.status === "ongoing") {
                filteredDisastersByIsActiveOnly.push(disaster)
            }
        }
    } else {
        filteredDisastersByIsActiveOnly = [...disasters]
    }

    // Find the intersection of these three lists
    const combinedFilteredDisasters = filteredDisastersByIsActiveOnly
        .filter(data => filteredDisastersByCountry.includes(data))
        .filter(data => filteredDisastersByType.includes(data))

    const disastersFilteredByCurrentView = []
    console.log(selectedView)
    for (const disaster of combinedFilteredDisasters) {
        if (selectedView.toLowerCase() === "choropleth" && disaster.api.toLowerCase() !== "eonet") {
            disastersFilteredByCurrentView.push(disaster)
        }
        else if (selectedView.toLowerCase() === "marker" && disaster.api.toLowerCase() !== "reliefweb") {
            disastersFilteredByCurrentView.push(disaster)
        }
    }

    setFilteredDisasters(disastersFilteredByCurrentView)
}

export default applyFilters