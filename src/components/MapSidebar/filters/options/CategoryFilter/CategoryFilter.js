import Select from "react-select";
import React from "react";
import selectStyling from "@/components/MapSidebar/filters/options/selectStyling.js";

const CategoryFilter = (props) => {
    const categories = [
        {value: "COLD_WAVE", label: "Cold Wave"},
        {value: "COMPLEX_EMERGENCY", label: "Complex Emergency"},
        {value: "DROUGHT", label: "Drought"},
        {value: "DUST_HAZE", label: "Dust Haze"},
        {value: "EARTHQUAKE", label: "Earthquake"},
        {value: "EPIDEMIC", label: "Epidemic"},
        {value: "EXTRA_TROPICAL_CYCLONE", label: "Extra Tropical Cyclone"},
        {value: "FIRE", label: "Fire"},
        {value: "FLOOD", label: "Flood"},
        {value: "HEAT_WAVE", label: "Heat Wave"},
        {value: "INSECT_INFESTATION", label: "Insect Infestation"},
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

    const filterByCategory = (category) => {
        props.setTypesToFilter(category)
    }

    return (
        <>
            <h3>Filter by category</h3>
            <Select
                defaultValue={null}
                onChange={filterByCategory}
                options={categories}
                isMulti
                unstyled
                styles={selectStyling}
            />
        </>
    )
}

export default CategoryFilter