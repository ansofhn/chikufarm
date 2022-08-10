import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const data = [
    { name: "Ayam", value: 67 },
    { name: "Bebek", value: 25 },
];
const COLORS = ["#76323F", "gray"];

export default function PieChartComp() {
    return (
        <PieChart width={150} height={150}>
            <Pie
                data={data}
                cx={70}
                cy={70}
                innerRadius={40}
                outerRadius={55}
                paddingAngle={5}
                dataKey="value"
            >
                {data.map((entry, index) => (
                    <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                    />
                ))}
            </Pie>
        </PieChart>
    );
}
