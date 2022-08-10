import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    {
        date: "01-08-22",
        population: 20,
    },
    {
        date: "07-08-22",
        population: 25,
    },
    {
        date: "14-08-22",
        population: 19,
    },
    {
        date: "21-08-22",
        population: 30,
    },
    {
        date: "28-08-22",
        population: 50,
    },
    {
        date: "04-09-22",
        population: 45,
    },
    {
        date: "11-09-22",
        population: 52,
    },
];

export default function ProgressChartComp() {
    return (
        <div style={{ width: "100%", height: 200 }}>
            <ResponsiveContainer>
                <AreaChart
                    data={data}
                    margin={{ top: 0, right: 0, left: -61, bottom: -31 }}
                >
                    <defs>
                        <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                            <stop
                                offset="10%"
                                stopColor="#F9EAE1"
                                stopOpacity={0.8}
                            />
                            <stop
                                offset="100%"
                                stopColor="#F9EAE1"
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="population"
                        stroke="#76323F"
                        fillOpacity={1}
                        fill="url(#color)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
