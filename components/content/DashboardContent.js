import React, { useEffect, useState } from "react";
import ProgressChartComp from "../ProgressChartComp";
import PieChartComp from "../PieChartComp";
import Population from "../Population";
import Death from "../Death";
import Feed from "../Feed";
import axios from "axios";
import { MinusSquareFilled } from "@ant-design/icons";

export default function DashboardContent() {
    const [dataSource, setDataSource] = useState([]);
    const [dataBreed, setDataBreed] = useState([])

    const getData = async () => {
        try {
            const report = await axios
                .get("https://chikufarm-app.herokuapp.com/api/report", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "access_token"
                        )}`,
                    },
                })
                .then((res) => {
                    console.log(res.data);
                    setDataSource(res.data);
                    setDataBreed(res.data.populationPerBreed)
                });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    console.log(dataBreed)
    return (
        <div className="my-4 lg:w-3/4 lg:ml-72">
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
                        {`${dataSource.totalFeedStock} Kg`}
                    </div>
                </div>
                <div className="w-full p-3 bg-white rounded-lg">
                    <div className="text-sm text-textColor">Kematian</div>
                    <div className="text-lg font-bold text-textColor">
                        {dataSource.death}
                    </div>
                </div>
            </div>

            <div className="p-4 text-sm font-semibold text-textColor">
                Statistics
            </div>

            <div className="grid grid-cols-2 gap-5 p-2">
                <div className="w-full overflow-hidden text-sm bg-white rounded-lg text-textColor">
                    <div className="p-4">Progress Populasi</div>
                    <div className="p-5 text-5xl font-bold text-textColor">
                        15 %
                    </div>
                    <div className="self-end">
                        <ProgressChartComp />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <div className="w-full p-4 text-sm bg-white rounded-lg text-textColor">
                        Populasi Terbaru
                        <div className="mt-2 text-2xl font-bold text-textColor">
                            592
                        </div>
                    </div>
                    <div className="w-full p-4 text-sm bg-white rounded-lg text-textColor">
                        Populasi Terakhir
                        <div className="mt-2 text-2xl font-bold text-textColor">
                            580
                        </div>
                    </div>
                    <div className="grid w-full h-56 col-span-2 grid-rows-3 p-3 text-sm bg-white rounded-lg text-textColor">
                        <div className="flex items-center justify-between">
                            <div className="pl-2 pr-4">Populasi</div>
                            <Population />
                            <div className="pr-4">12</div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="pl-2">Kematian</div>
                            <Death />
                            <div className="pr-4">2</div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="pl-2 pr-8">Pakan</div>
                            <Feed />
                            <div className="pr-4">0.5</div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="px-4 pt-4 font-bold text-md text-textColor">
                    Jenis Ternak
                </div>
                <div className="px-4 pb-4 text-sm text-textColor">
                    Menunjukkan jenis ternak yang dimiliki
                </div>
            </div>
            <div className="grid grid-cols-2 gap-5 p-2">
                <div className="grid w-full grid-cols-2 p-4 text-sm font-semibold bg-white rounded-lg text-textColor">
                    Kategori Hewan Ternak
                    <div className="col-start-1 font-semibold">
                        <PieChartComp />
                    </div>
                    <div className="self-center font-medium">
                        {/* {dataSource.populationPerBreed.map((data) => {
                            if (data.breed == "Ayam Pedaging") {
                                return (
                                    <>
                                        <MinusSquareFilled className="text-maroon" />
                                        {data.breed}
                                        <span className="ml-2 text-base">
                                            {(data.population / dataSource.currentPopulation) * 100} %
                                        </span>
                                    </>
                                );
                            }
                        })} */}
                        {/* <div className="mb-1 flex items-center justify-between mr-10">
                            <MinusSquareFilled className="text-maroon" />
                            {dataBreed[0].breed}
                            <span className="ml-2 text-base">
                                {(dataBreed[0].population /
                                    dataSource.currentPopulation) *
                                    100}
                                %
                            </span>
                        </div>
                        <div className="mb-1 flex items-center justify-between mr-10">
                            <MinusSquareFilled className="text-gray-500" />
                            {dataBreed[1].breed}
                            <span className="ml-2 text-base">
                                {(dataBreed[1].population /
                                    dataSource.currentPopulation) *
                                    100}
                                %
                            </span>
                        </div>
                        <div className="mb-1 flex items-center justify-between mr-10">
                            <MinusSquareFilled className="text-softBrown" />
                            {dataBreed[2].breed}
                            <span className="ml-2 text-base">
                                {(dataBreed[2].population /
                                    dataSource.currentPopulation) *
                                    100}
                                %
                            </span>
                        </div> */}
                    </div>
                </div>
                <div className="grid w-full grid-cols-2 p-4 text-sm font-semibold bg-white rounded-lg text-textColor">
                    Persentase Kematian
                    <div className="col-start-1 ml-5 font-medium">
                        <div className="mb-6">
                            Ayam <span className="text-lg ml-14">2.3%</span>
                        </div>
                        <div>
                            Bebek <span className="text-lg ml-14">2.0%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
