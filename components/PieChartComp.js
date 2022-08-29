import axios from "axios";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip bg-cream text-sm font-medium p-2 rounded-md">
                <p className="intro">{`${payload[0].value}`}</p>
            </div>
        );
    }

    return null;
};

export default function PieChartComp() {
    const [dataSource, setDataSource] = useState([]);

    const getData = async () => {
        try {
            const report = await axios
                .get("https://chikufarm-app.herokuapp.com/api/report/array", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "access_token"
                        )}`,
                    },
                })
                .then((res) => {
                    setDataSource(res.data.populationPerBreed);
                });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const COLORS = ["#76323F", "gray", "#DEC9B5"];
    return (
        <PieChart width={150} height={150}>
            <Pie
                data={dataSource}
                innerRadius={40}
                outerRadius={55}
                paddingAngle={5}
                dataKey="population"
            >
                {dataSource.map((entry, index) => (
                    <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                    />
                ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
        </PieChart>
    );
}
