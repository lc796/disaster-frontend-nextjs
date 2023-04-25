import Select from "react-select";
import React, {useMemo} from "react";
import countryList from "react-select-country-list";
import selectStyling from "@/components/MapSidebar/filters/options/selectStyling.js";

const CountryFilter = (props) => {

    const countries = useMemo(() => countryList().getData(), [])

    const filterByCountry = (countries) => {
        props.setCountriesToFilter(countries)
    }

    return (
        <>
            <h3>Filter by country</h3>
            <Select
                defaultValue={null}
                onChange={filterByCountry}
                options={countries}
                isMulti
                unstyled
                styles={selectStyling}
            />
        </>
    )
}

export default CountryFilter