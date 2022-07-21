import React from "react";
import { MdExpandMore } from "react-icons/md";

export default function Content() {
    return (
        <div className="my-4 lg:w-3/4 lg:ml-72">
            <div className="p-4 text-lg font-bold text-textColor">
                Dashboard / Home
            </div>
            <div className="grid grid-cols-4 gap-5 p-2 ">
                <div className="w-full p-3 bg-white rounded-xl">
                    <div className="text-sm text-textColor">Total Populasi</div>
                    <div className="text-lg font-bold text-textColor">592</div>
                </div>
                <div className="w-full p-3 bg-white rounded-xl">
                    <div className="text-sm text-textColor">Total Kandang</div>
                    <div className="text-lg font-bold text-textColor">29</div>
                </div>
                <div className="w-full p-3 bg-white rounded-xl">
                    <div className="text-sm text-textColor">Total Pakan</div>
                    <div className="text-lg font-bold text-textColor">
                        3.5 ton
                    </div>
                </div>
                <div className="w-full p-3 bg-white rounded-xl">
                    <div className="text-sm text-textColor">Kematian</div>
                    <div className="text-lg font-bold text-textColor">9</div>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="p-4 text-sm text-textColor">Statistics</div>
                <div className="flex items-center justify-center gap-1 p-4 text-sm text-textColor">
                    This Month
                    <MdExpandMore />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-5 p-2 ">
                <div className="w-full p-3 text-sm bg-white h-60 rounded-xl text-textColor">
                    Progress Populasi
                    <div className="text-4xl font-bold text-textColor">
                        15 %
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <div className="w-full p-3 text-sm bg-white text-textColor rounded-xl">
                        Populasi Terbaru
                        <div className="text-xl font-bold text-textColor">
                            592
                        </div>
                    </div>
                    <div className="w-full p-3 text-sm bg-white text-textColor rounded-xl">
                        Populasi Terakhir
                        <div className="text-xl font-bold text-textColor">
                            580
                        </div>
                    </div>
                    <div className="grid w-full col-span-2 grid-rows-3 p-3 text-sm bg-white text-textColor rounded-xl">
                        <div className="flex items-center justify-between">
                            <div>Populasi</div>
                            <div className="pr-4">12</div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>Kematian</div>
                            <div className="pr-4">2</div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>Pakan</div>
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
            <div className="grid grid-cols-2 gap-5 p-2 ">
                <div className="w-full h-32 p-3 text-sm bg-white text-textColor rounded-xl">
                    Kategori Hewan Ternak
                </div>
                <div className="w-full h-32 p-3 text-sm bg-white text-textColor rounded-xl">
                    Persentase Kematian
                </div>
            </div>
        </div>
    );
}
