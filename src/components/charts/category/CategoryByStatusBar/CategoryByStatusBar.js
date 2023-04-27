import {ResponsiveBar} from "@nivo/bar";
import styles from '@/styles/ChartStyle.module.css'
import {useMemo} from "react"; // Styles shared amongst charts

const CategoryByStatusBar = (props) => {
    const getData = () => {
        const disasters = props.disasters
        const categories = props.categories

        const data = []

        for (const category of categories) {
            const entry = {
                "category": category.label,
                "past": 0,
                "pastColor": "hsl(0,8%,59%)",
                "ongoing": 0,
                "ongoingColor": "hsl(0,89%,51%)",
                "total": 0
            }
            for (const disaster of disasters) {
                if (disaster.category === category.value) {
                    if (disaster.status === "ongoing") {
                        entry.ongoing += 1
                    }
                    else {
                        entry.past += 1
                    }
                    entry.total += 1
                }
            }

            data.push(entry)
        }
        const descendingData = data.sort((a, b) => Number(b.total) - Number(a.total))
        const categoriesWithDisasters = []
        for (const entry of descendingData) {
            if (entry.total > 0) {
                categoriesWithDisasters.push(entry)
            }
        }

        return categoriesWithDisasters
    }

    /*
    For each category of disaster, we want an object, with "category" equal to the category, and active/past with the number of active/past disasters
     */
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
            <h3 className={styles.title}>Bar graph showing number of active and past disasters by category</h3>
            <ResponsiveBar
                data={data}
                keys={[
                    'past',
                    'ongoing'
                ]}
                indexBy="category"
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

export default CategoryByStatusBar;