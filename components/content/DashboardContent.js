import React, { useEffect, useState } from "react";
import ProgressChartComp from "../ProgressChartComp";
import PieChartComp from "../PieChartComp";
import axios from "axios";
import { MinusSquareFilled } from "@ant-design/icons";

export default function DashboardContent() {
    const [dataSource, setDataSource] = useState([]);
    const [dataPedaging, setDataPedaging] = useState([]);
    const [dataPetelur, setDataPetelur] = useState([]);
    const [dataAduan, setDataAduan] = useState([]);
    const [first, setFirst] = useState([]);
    const [last, setLast] = useState([]);

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
                    setDataSource(res.data);
                    setFirst(res.data.weeklyCoopPopulation[0].population);
                    setLast(
                        res.data.weeklyCoopPopulation.slice(-1)[0].population
                    );
                    setDataPedaging(res.data.populationPerBreed[0]);
                    setDataPetelur(res.data.populationPerBreed[1]);
                    setDataAduan(res.data.populationPerBreed[2]);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const totalPakan = () => {
        if (dataSource.totalFeedStock >= 1000) {
            return `${(dataSource.totalFeedStock / 1000).toFixed(1)} Ton`;
        } else {
            return `${dataSource.totalFeedStock} Kg`;
        }
    };

    const progress = () => {
        const all = dataSource.currentPopulation;
        return ((last - first) / all) * 100;
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="my-4 lg:w-3/4 lg:ml-72" priority>
            <div className="p-4 text-lg font-bold text-textColor">
                Dashboard / Home
            </div>
            <div className="grid grid-cols-4 gap-5 p-2">
                <div className="w-full p-3 bg-white rounded-lg">
                    <div className="text-sm text-textColor">Total Populasi</div>
                    <div className="text-lg font-bold text-textColor">
                        {dataSource.currentPopulation}
                    </div>
                </div>
                <div className="w-full p-3 bg-white rounded-lg">
                    <div className="text-sm text-textColor">Total Kandang</div>
                    <div className="text-lg font-bold text-textColor">
                        {dataSource.totalCoop}
                    </div>
                </div>
                <div className="w-full p-3 bg-white rounded-lg">
                    <div className="text-sm text-textColor">Total Pakan</div>
                    <div className="text-lg font-bold text-textColor">
                        {totalPakan()}
                    </div>
                </div>
                <div className="w-full p-3 bg-white rounded-lg">
                    <div className="text-sm text-textColor">Kematian</div>
                    <div className="text-lg font-bold text-textColor">
                        {dataSource.death}
                    </div>
                </div>
            </div>

            <div className="p-4 font-semibold text-textColor">Statistics</div>

            <div className="grid grid-cols-2 gap-5 p-2">
                <div className="w-full overflow-hidden text-sm bg-white rounded-lg text-textColor">
                    <div className="p-4">Progress Populasi</div>
                    <div className="px-5 py-2 text-5xl font-bold text-textColor">
                        {`${progress().toFixed(0)} %`}
                    </div>
                    <div className="self-end">
                        <ProgressChartComp />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <div className="w-full p-4 text-sm bg-white rounded-lg text-textColor">
                        Populasi Terbaru
                        <div className="mt-2 text-2xl font-bold text-textColor">
                            {dataSource.currentPopulation}
                        </div>
                    </div>
                    <div className="w-full p-4 text-sm bg-white rounded-lg text-textColor">
                        Populasi Awal
                        <div className="mt-2 text-2xl font-bold text-textColor">
                            {dataSource.populationStart}
                        </div>
                    </div>
                    <div className="grid w-full h-56 col-span-2 p-2 text-sm bg-white rounded-lg text-textColor">
                        <div className="grid w-full grid-cols-2 p-4 text-sm font-semibold bg-white rounded-lg text-textColor">
                            Kategori Hewan Ternak
                            <div className="col-start-1 font-semibold">
                                <PieChartComp />
                            </div>
                            <div className="self-center font-medium text-sm">
                                <div className="mb-1 flex items-center justify-between mr-3">
                                    <MinusSquareFilled className="text-maroon" />
                                    {dataPedaging.breed}
                                    <span className="ml-2 text-sm font-semibold">
                                        {(
                                            (dataPedaging.population /
                                                dataSource.currentPopulation) *
                                            100
                                        ).toFixed(1)}
                                        %
                                    </span>
                                </div>
                                <div className="mb-1 flex items-center justify-between mr-3">
                                    <MinusSquareFilled className="text-gray-500" />
                                    {dataPetelur.breed}
                                    <span className="ml-2 text-sm font-semibold">
                                        {(
                                            (dataPetelur.population /
                                                dataSource.currentPopulation) *
                                            100
                                        ).toFixed(1)}
                                        %
                                    </span>
                                </div>
                                <div className="mb-1 flex items-center justify-between mr-3">
                                    <MinusSquareFilled className="text-softBrown" />
                                    {dataAduan.breed}
                                    <span className="ml-2 text-sm font-semibold">
                                        {(
                                            (dataAduan.population /
                                                dataSource.currentPopulation) *
                                            100
                                        ).toFixed(1)}
                                        %
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
