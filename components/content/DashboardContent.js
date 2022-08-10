import React from "react";
import ProgressChartComp from "../ProgressChartComp";
import PieChartComp from "../PieChartComp";
import Population from "../Population";
import Death from "../Death";
import Feed from "../Feed";

export default function DashboardContent() {
    return (
        <div className="my-4 lg:w-3/4 lg:ml-72">
            <div className="p-4 text-lg font-bold text-textColor">
                Dashboard / Home
            </div>
            <div className="grid grid-cols-4 gap-5 p-2">
                <div className="p-3 w-full bg-white rounded-lg">
                    <div className="text-sm text-textColor">Total Populasi</div>
                    <div className="text-lg font-bold text-textColor">592</div>
                </div>
                <div className="p-3 w-full bg-white rounded-lg">
                    <div className="text-sm text-textColor">Total Kandang</div>
                    <div className="text-lg font-bold text-textColor">29</div>
                </div>
                <div className="p-3 w-full bg-white rounded-lg">
                    <div className="text-sm text-textColor">Total Pakan</div>
                    <div className="text-lg font-bold text-textColor">
                        3.5 ton
                    </div>
                </div>
                <div className="p-3 w-full bg-white rounded-lg">
                    <div className="text-sm text-textColor">Kematian</div>
                    <div className="text-lg font-bold text-textColor">9</div>
                </div>
            </div>

            <div className="p-4 text-sm font-semibold text-textColor">Statistics</div>

            <div className="grid grid-cols-2 gap-5 p-2">
                <div className="overflow-hidden w-full text-sm bg-white rounded-lg text-textColor">
                    <div className="p-4">Progress Populasi</div>
                    <div className="p-5 text-5xl font-bold text-textColor">
                        15 %
                    </div>
                    <div className="self-end">
                        <ProgressChartComp />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <div className="p-4 w-full text-sm bg-white rounded-lg text-textColor">
                        Populasi Terbaru
                        <div className="text-2xl mt-2 font-bold text-textColor">
                            592
                        </div>
                    </div>
                    <div className="p-4 w-full text-sm bg-white rounded-lg text-textColor">
                        Populasi Terakhir
                        <div className="text-2xl mt-2 font-bold text-textColor">
                            580
                        </div>
                    </div>
                    <div className="grid col-span-2 grid-rows-3 p-3 w-full h-56 text-sm bg-white rounded-lg text-textColor">
                        <div className="flex justify-between items-center">
                            <div>Populasi</div>
                            <Population />
                            <div className="pr-4">12</div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>Kematian</div>
                            <Death/>
                            <div className="pr-4">2</div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>Pakan</div>
                            <Feed/>
                            <div className="pr-4">0.5</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="px-4 pt-4 font-bold text-md text-textColor">
                    Jenis Ternak
                </div>
                <div className="px-4 pb-4 text-sm text-textColor">
                    Menunjukkan jenis ternak yang dimiliki
                </div>
            </div>
            <div className="grid grid-cols-2 gap-5 p-2">
                <div className="grid grid-cols-2 p-4 w-full text-sm font-semibold bg-white rounded-lg text-textColor">
                    Kategori Hewan Ternak
                    <div className="col-start-1 font-semibold">
                        <PieChartComp />
                    </div>
                    <div className="self-center font-medium">
                        <div className="mb-6">
                            Ayam <span></span>
                        </div>
                        <div>
                            Bebek <span></span>
                        </div>
                    </div>
                </div>

                <div className="p-4 w-full text-sm font-semibold bg-white rounded-lg text-textColor">
                    Persentase Kematian
                </div>
            </div>
        </div>
    );
}
