import React from "react";

const MiscOptionsFilter = (props) => {

    const filterByStatus = (event) => {
        const toggle = event.target.checked
        props.setActiveDisastersOnlyFilter(toggle)
    }

    return (
        <>
            <h3>Active disasters only</h3>
            <input type="checkbox" onInput={(toggle) => {filterByStatus(toggle)}}></input>
        </>
    )
}

export default MiscOptionsFilter