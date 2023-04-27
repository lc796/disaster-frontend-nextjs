import {ResponsiveBar} from "@nivo/bar";
import styles from '@/styles/ChartStyle.module.css'
import {useMemo} from "react"; // Styles shared amongst charts

const DecadeBar = (props) => {
    const getData = () => {
        const disasters = props.disasters
        const categories = props.categories

        const data = []

        const decades = [
            {label: '1980\'s', lowerLimit: new Date(1980, 1, 1), upperLimit: new Date(1989, 12, 31)},
            {label: '1990\'s', lowerLimit: new Date(1990, 1, 1), upperLimit: new Date(1999, 12, 31)},
            {label: '2000\'s', lowerLimit: new Date(2000, 1, 1), upperLimit: new Date(2009, 12, 31)},
            {label: '2010\'s', lowerLimit: new Date(2010, 1, 1), upperLimit: new Date(2019, 12, 31)},
            {label: '2020\'s', lowerLimit: new Date(2020, 1, 1), upperLimit: new Date(2029, 12, 31)},
        ]

        for (const decade of decades) {
            const entry = {
                "decade": decade.label,
                "total disasters": 0,
                "total disastersColor": "hsl(237,47%,53%)",
                "disasters": []
            }
            for (const disaster of disasters) {
                // Only use disasters sourced from ReliefWeb since we know they must have a date attribute
                if (disaster.api.toLowerCase() !== "reliefweb") {
                    continue
                }
                const date = new Date(disaster.date)
                if (date >= decade.lowerLimit && date <= decade.upperLimit) {
                    entry["total disasters"] += 1
                    entry.disasters.push(disaster)
                }
            }
            data.push(entry)
        }

        return data
    }

    const data = useMemo(getData, [props.disasters])

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
            <h3 className={styles.title}>Bar graph showing number of disasters per decade</h3>
            <ResponsiveBar
                data={data}
                keys={['total disasters']}
                indexBy="decade"
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
                    legend: 'Decade',
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

export default DecadeBar;