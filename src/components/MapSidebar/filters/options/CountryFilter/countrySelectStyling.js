const countryStyles = {
    control: (styles) => {
        return {
            ...styles,
            color: "#C95858",
            backgroundColor: "#1C1B1A",
            border: "none",
            fontSize: "0.85em",
            padding: "0.4em"
        }
    },
    menu: (styles) => {
        return {
            ...styles,
            color: "#C95858",
            backgroundColor: "#1C1B1A",
            padding: "0.4em"
        }
    },
    option: (styles, { isDisabled, isFocused, isSelected }) => {
        const color = "#fff";
        const hoverColor = "#C95858";
        return {
            ...styles,
            backgroundColor: isDisabled
                ? undefined
                : isSelected
                    ? color
                    : isFocused
                        ? hoverColor
                        : undefined,
            color: isDisabled
                ? hoverColor
                : isSelected
                    ? "black"
                    : color,
            cursor: isDisabled ? 'not-allowed' : 'default',
            ':active': {
                ...styles[':active'],
                backgroundColor: !isDisabled
                    ? isSelected
                        ? color
                        : hoverColor
                    : undefined,
            },
            padding: "0.2em"
        };
    },
    clearIndicator: (styles) => {
        return {
            ...styles,
            padding: "0 1em",
            ":hover": {
                backgroundColor: "#C95858",
                color: "#fff"
            }
        }
    },
    dropdownIndicator: (styles) => {
        return {
            ...styles,
            padding: "0 1em",
            ":hover": {
                backgroundColor: "#C95858",
                color: "#fff"
            }
        }
    },
    indicatorSeparator: (styles) => {
        return {
            ...styles,
            color: "#fff"
        }
    },
    valueContainer: (styles) => {
        return {
            ...styles,
        }
    },
    multiValue: (styles) => {
        return {
            ...styles,
            backgroundColor: "#262523",
            "hover": {
                backgroundColor: "white",
                color: "white"
            },
            margin: "0.4em"
        }
    },
    multiValueLabel: (styles) => {
        return {
            ...styles,
            color: "#fff",
            padding: "0.3em"
        }
    },
    multiValueRemove: (styles) => {
        return {
            ...styles,
            color: "#C95858",
            ":hover": {
                backgroundColor: "red",
                color: "white",
                textDecoration: "line-through"
            }
        }
    }
}

export default countryStyles