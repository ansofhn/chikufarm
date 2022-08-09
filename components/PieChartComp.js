import React, { PureComponent } from "react";
import { PieChart, Pie, Cell } from "recharts";

const data = [
    { name: "Group A", value: 67 },
    { name: "Group B", value: 25 },
];
const COLORS = ["maroon", "gray"];

export default class PieChartComp extends PureComponent {
    render() {
        return (
            <PieChart width={150} height={150} onMouseEnter={this.onPieEnter}>
                <Pie
                    data={data}
                    cx={70}
                    cy={70}
                    innerRadius={40}
                    outerRadius={60}
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
}
