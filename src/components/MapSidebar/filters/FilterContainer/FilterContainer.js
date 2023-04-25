import React, {useEffect} from "react";
import styles from "./FilterContainer.module.css";
import CountryFilter from "@/components/MapSidebar/filters/options/CountryFilter/index.js";
import MiscOptionsFilter from "@/components/MapSidebar/filters/options/MiscOptionsFilter/index.js";
import applyFilters from "@/components/MapSidebar/filters/applyFilters.js";
import CategoryFilter from "@/components/MapSidebar/filters/options/CategoryFilter/index.js";

/*
This component should manage internal state of its own filter options (like country, category)
and pass state up to parent components that want a filtered list of disasters
 */
const FilterContainer = (props) => {
    // Apply our new filters if one of our filter options changes
    useEffect(() => {
        applyFilters(
            props.disasters,
            props.setFilteredDisasters,
            props.countriesToFilter,
            props.typesToFilter,
            props.activeDisastersOnlyFilter,
            props.selectedView
        )
    }, [props.countriesToFilter, props.typesToFilter, props.activeDisastersOnlyFilter])

    /* Returns active class name if option one matches option two */
    const isActive = (a, b) => {
        if (a === b) {
            return styles.active
        }
        return ""
    }

    return (
        <div className={styles.filter}>
            {isActive(props.selectedView, "choropleth") === styles.active &&(
                <div className={styles.filterOption}>
                    <CountryFilter
                        setFilteredDisasters={props.setFilteredDisasters}
                        disasters={props.disasters}
                        countriesToFilter={props.countriesToFilter}
                        setCountriesToFilter={props.setCountriesToFilter}
                    />
                </div>
            )}

            <div className={styles.filterOption}>
                <CategoryFilter setTypesToFilter={props.setTypesToFilter}/>
            </div>

            {isActive(props.selectedView, "choropleth") === styles.active &&(
                <div className={styles.filterOption}>
                    <MiscOptionsFilter
                        filteredDisasters={props.filteredDisasters}
                        setFilteredDisasters={props.setFilteredDisasters}
                        disasters={props.disasters}
                        setActiveDisastersOnlyFilter={props.setActiveDisastersOnlyFilter}
                    />
                </div>
            )}
        </div>
    )
}

export default FilterContainer;