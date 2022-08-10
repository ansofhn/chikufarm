import React from "react";
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
        death: 1,
    },
    {
        date: "07-08-22",
        death: 1,
    },
    {
        date: "14-08-22",
        death: 2,
    },
    {
        date: "21-08-22",
        death: 1,
    },
    {
        date: "28-08-22",
        death: 1,
    },
    {
        date: "04-09-22",
        death: 1,
    },
    {
        date: "11-09-22",
        death: 2,
    },
];

export default function Death() {
    return (
        <div style={{ width: 260, height: 30 }}>
            <ResponsiveContainer>
                <AreaChart
                    data={data}
                    margin={{ top: 1, right: 0, left: -61, bottom: -31 }}
                >
                    <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="10%"
                            stopColor="#76323F"
                            stopOpacity={0.8}
                        />
                        <stop
                            offset="90%"
                            stopColor="#76323F"
                            stopOpacity={0}
                        />
                    </linearGradient>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="death"
                        stroke="maroon"
                        fillOpacity={1}
                        fill="url(#color)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
