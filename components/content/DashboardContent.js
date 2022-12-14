import React, { useEffect, useState } from "react";
import axios from "axios";
import ProgressChartComp from "../ProgressChartComp";
import PieChartComp from "../PieChartComp";
import { MinusSquareFilled } from "@ant-design/icons";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

export default function DashboardContent() {
    const [dataSource, setDataSource] = useState([]);
    const [dataPedaging, setDataPedaging] = useState([]);
    const [dataPetelur, setDataPetelur] = useState([]);
    const [dataAduan, setDataAduan] = useState([]);
    const [first, setFirst] = useState([]);
    const [last, setLast] = useState([]);

    const router = useRouter();

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
                    if (res.data.weeklyCoopPopulation == 0) {
                        setFirst(0);
                        setLast(0);
                    } else {
                        setFirst(res.data.weeklyCoopPopulation[0].population);
                        setLast(
                            res.data.weeklyCoopPopulation.slice(-1)[0]
                                .population
                        );
                    }
                    setDataPedaging(res.data.populationPerBreed[0]);
                    setDataPetelur(res.data.populationPerBreed[1]);
                    setDataAduan(res.data.populationPerBreed[2]);
                });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const percentBreed = (breed, population) => {
        if (population == 0) {
            return 0;
        } else {
            return ((breed / population) * 100).toFixed(1);
        }
    };

    const totalPakan = () => {
        const total = dataSource.totalFeedStock;
        if (total >= 1000) {
            return `${(total / 1000).toFixed(1)} Ton`;
        } else {
            return `${(total / 1).toFixed(1)} Kg`;
        }
    };

    const progress = () => {
        const all = dataSource.currentPopulation;
        if (all == 0) {
            return 0;
        } else {
            return ((last - first) / all) * 100;
        }
    };

    return (
        <div className="my-4 lg:w-3/4 lg:ml-72 2xl:w-10/12">
            <div className="p-4 text-lg font-bold text-textColor">
                Dashboard / Home
            </div>
            <div className="grid grid-cols-4 gap-5 p-2">
                <div className="w-full p-3 bg-white rounded-lg 2xl:p-4">
                    <div className="text-sm text-textColor">
                        Total Population
                    </div>
                    <div className="text-lg font-bold text-textColor">
                        {dataSource.currentPopulation}
                    </div>
                </div>
                <div className="w-full p-3 bg-white rounded-lg 2xl:p-4">
                    <div className="text-sm text-textColor">Total Coop</div>
                    <div className="text-lg font-bold text-textColor">
                        {dataSource.totalCoop}
                    </div>
                </div>
                <div className="w-full p-3 bg-white rounded-lg 2xl:p-4">
                    <div className="text-sm text-textColor">Total Feed</div>
                    <div className="text-lg font-bold text-textColor">
                        {totalPakan()}
                    </div>
                </div>
                <div className="w-full p-3 bg-white rounded-lg 2xl:p-4">
                    <div className="text-sm text-textColor">Death</div>
                    <div className="text-lg font-bold text-textColor">
                        {dataSource.death}
                    </div>
                </div>
            </div>

            <div className="p-4 font-semibold text-textColor">Statistics</div>

            <div className="grid grid-cols-2 gap-5 p-2">
                <div className="w-full overflow-hidden text-sm bg-white rounded-lg text-textColor">
                    <div className="p-4">Population Progress</div>
                    <div className="px-5 py-2 text-5xl font-bold text-textColor">
                        {`${progress().toFixed(0)} %`}
                    </div>
                    <div className="self-end">
                        <ProgressChartComp />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <div className="w-full p-4 text-sm bg-white rounded-lg text-textColor">
                        Latest Population
                        <div className="mt-2 text-2xl font-bold text-textColor">
                            {dataSource.currentPopulation}
                        </div>
                    </div>
                    <div className="w-full p-4 text-sm bg-white rounded-lg text-textColor">
                        Population Start
                        <div className="mt-2 text-2xl font-bold text-textColor">
                            {dataSource.populationStart}
                        </div>
                    </div>
                    <div className="grid w-full col-span-2 p-2 text-sm bg-white rounded-lg text-textColor 2xl:pr-16 2xl:pl-4 2xl:py-4">
                        <div className="grid w-full grid-cols-2 p-4 text-sm font-semibold rounded-lg text-textColor">
                            LiveStock Category
                            <div className="col-start-1 font-semibold">
                                <PieChartComp />
                            </div>
                            <div className="self-center text-sm font-medium">
                                <div className="flex items-center justify-between mb-1 mr-3">
                                    <div className="flex items-center gap-3">
                                        <MinusSquareFilled className="text-maroon" />
                                        {dataPedaging.breed}
                                    </div>
                                    <span className="ml-2 text-sm font-semibold">
                                        {percentBreed(
                                            dataPedaging.population,
                                            dataSource.currentPopulation
                                        )}
                                        %
                                    </span>
                                </div>
                                <div className="flex items-center justify-between mb-1 mr-3">
                                    <div className="flex items-center gap-3">
                                        <MinusSquareFilled className="text-gray-500" />
                                        {dataPetelur.breed}
                                    </div>

                                    <span className="ml-2 text-sm font-semibold">
                                        {percentBreed(
                                            dataPetelur.population,
                                            dataSource.currentPopulation
                                        )}
                                        %
                                    </span>
                                </div>
                                <div className="flex items-center justify-between mb-1 mr-3">
                                    <div className="flex items-center gap-3">
                                        <MinusSquareFilled className="text-softBrown" />
                                        {dataAduan.breed}
                                    </div>
                                    <span className="ml-2 text-sm font-semibold">
                                        {percentBreed(
                                            dataAduan.population,
                                            dataSource.currentPopulation
                                        )}
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
