import React, { useEffect, useState } from "react";
import Line from "../public/Line.png";
import Image from "next/image";
import axios from "axios";

export default function Stats() {
    const [dataSource, setDataSource] = useState([]);

    const getData = async () => {
        try {
            const report = await axios
                .get("https://chikufarm-app.herokuapp.com/api/report/array")
                .then((res) => {
                    console.log(res.data);
                    setDataSource(res.data);
                });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    console.log(dataSource)

    const totalPakan = () => {
        const total = dataSource.totalFeedStock;
        if (total >= 1000) {
            return `${(total / 1000).toFixed(1)} Ton`;
        } else {
            return `${(total / 1).toFixed(1)} Kg`;
        }
    };

    return (
        <div className="grid grid-cols-4 gap-10 mx-auto my-40 w-4/5">
            <div className="container flex gap-2 ml-10">
                <div className="p-2">
                    <Image src={Line} />
                </div>
                <div className="p-2">
                    <h3 className="text-2xl font-bold text-textColor">
                        {dataSource.currentPopulation}
                    </h3>
                    <p className="text-sm text-textColor">Total Population</p>
                </div>
            </div>
            <div className="container flex gap-2 ml-10">
                <div className="p-2">
                    <Image src={Line} />
                </div>
                <div className="p-2">
                    <h3 className="text-2xl font-bold text-textColor">
                        {totalPakan()}
                    </h3>
                    <p className="text-sm text-textColor">Total Feed</p>
                </div>
            </div>
            <div className="container flex gap-2 ml-10">
                <div className="p-2">
                    <Image src={Line} />
                </div>
                <div className="p-2">
                    <h3 className="text-2xl font-bold text-textColor">{dataSource.totalCoop}</h3>
                    <p className="text-sm text-textColor">Total Coop</p>
                </div>
            </div>
            <div className="container flex gap-2 ml-10">
                <div className="p-2">
                    <Image src={Line} />
                </div>
                <div className="p-2">
                    <h3 className="text-2xl font-bold text-textColor">25</h3>
                    <p className="text-sm text-textColor">Total Farmer</p>
                </div>
            </div>
        </div>
    );
}
