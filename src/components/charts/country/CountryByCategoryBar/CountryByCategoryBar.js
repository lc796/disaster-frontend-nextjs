import {ResponsiveBar} from "@nivo/bar";
import styles from '@/styles/ChartStyle.module.css'
import {useMemo} from "react";
import countryList from "react-select-country-list"; // Styles shared amongst charts

const CountryByCategoryBar = (props) => {
    const countries = useMemo(() => countryList().getData(), [])

    const getData = () => {
        const disasters = props.disasters
        const categories = props.categories

        const data = []

        for (const country of countries) {
            const entry = {
                "country": country.label,
                "total": 0,
                "SEA_LAKE_ICEColor": "#90c7bc",
                "OTHERColor": "#dab3a3",
                "MAN_MADEColor": "#b553ce",
                "MUDSLIDEColor": "#a2603a",
                "LANDSLIDEColor": "#6b7e45",
                "INSECT_INFESTATIONColor": "#f3f056",
                "HEAT_WAVEColor": "#da6c6c",
                "FLOODColor": "#628bbd",
                "FIREColor": "#c04713",
                "EXTRA_TROPICAL_CYCLONEColor": "#478d12",
                "EPIDEMICColor": "#b3de14",
                "EARTHQUAKEColor": "#563ab6",
                "DUST_HAZEColor": "#983b3b",
                "DROUGHTColor": "#8a8a8a",
                "COMPLEX_EMERGENCYColor": "#ffffff",
                "COLD_WAVEColor": "#1e3ead",
                "TROPICAL_CYCLONEColor": "#47a172",
                "VOLCANOColor": "#e7513d",
                "WILDFIREColor": "#e76118",
                "TSUNAMIColor": "#b0e37e",
                "SEVERE_STORMColor": "#eed44f",
                "SNOWColor": "#fff",
            }
            for (const disaster of disasters) {
                if (disaster.country === country.label) {
                    if(entry[disaster.category] === undefined) {
                        entry[disaster.category] = 1
                    } else {
                        entry[disaster.category] += 1
                    }
                    entry.total += 1
                }
            }
            data.push(entry)
        }
        console.log(data)

        const descendingData = data.sort((a, b) => Number(b.total) - Number(a.total))
        return descendingData.slice(0, 10)
    }

    const data = useMemo(getData, [props.disasters])

    const getKeys = () => {
        const categories = []
        for (const category of props.categories) {
            categories.push(category.value)
        }
        return categories
    }

    const theme = {
        textColor: "#fff",
        tooltip: {
            container: {
                background: "#000"
            }
        }
    }

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Bar graph showing number of disasters of each type from the ten most historically disaster-prone countries</h3>
            <ResponsiveBar
                data={data}
                keys={getKeys()}
                indexBy="country"
                margin={{top: 50, right: 130, bottom: 50, left: 60}}
                padding={0.3}
                valueScale={{type: 'linear'}}
                indexScale={{type: 'band', round: true}}
                theme={theme}
                colors={({id, data}) => data[`${id}Color`]}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Category',
                    legendPosition: 'middle',
                    legendOffset: 40
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Total Number of Disasters',
                    legendPosition: 'middle',
                    legendOffset: -50
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            1.6
                        ]
                    ]
                }}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
                role="application"
                ariaLabel="Disasters by category"
                barAriaLabel={function (e) {
                    return e.id + ": " + e.formattedValue + " in country: " + e.indexValue
                }}
            />
        </div>
    )
}

export default CountryByCategoryBar;