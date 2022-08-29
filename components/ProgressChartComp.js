import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-cream text-sm font-medium rounded-md p-2">
          <p className="label">{`${label.substring(0,10)}`}</p>
          <p className="intro">{`Population : ${payload[0].value}`}</p>
        </div>
      );
    }
  
    return null;
  };

export default function ProgressChartComp() {
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
                    setDataSource(res.data.weeklyCoopPopulation);
                });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div style={{ width: "100%", height: 200 }}>
            <ResponsiveContainer>
                <AreaChart
                    data={dataSource}
                    margin={{ top: 4, right: 0, left: -61, bottom: -31 }}
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
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />}  />
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
