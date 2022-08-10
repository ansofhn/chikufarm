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
        stock: 500,
    },
    {
        date: "07-08-22",
        stock: 550,
    },
    {
        date: "14-08-22",
        stock: 700,
    },
    {
        date: "21-08-22",
        stock: 710,
    },
    {
        date: "28-08-22",
        stock: 900,
    },
    {
        date: "04-09-22",
        stock: 1000,
    },
    {
        date: "11-09-22",
        stock: 1010,
    },
];

export default function Feed() {
    return (
        <div style={{ width: 260, height: 40 }}>
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
                        dataKey="stock"
                        stroke="maroon"
                        fillOpacity={1}
                        fill="url(#color)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
