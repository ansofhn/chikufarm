import React from "react";
import Line from "../public/Line.png";
import Image from "next/image";

export default function Stats() {
    return (
        <div className="grid grid-cols-4 mx-auto gap-10 w-4/5">
            <div className="container flex gap-2">
                <div className="p-2">
                    <Image src={Line} />
                </div>
                <div className="p-2">
                    <h3 className=" text-3xl text-textColor font-bold">40</h3>
                    <p className="text-sm text-textColor">Total Populasi</p>
                </div>
            </div>
            <div className="container flex gap-2">
                <div className="p-2">
                    <Image src={Line} />
                </div>
                <div className="p-2">
                    <h3 className=" text-3xl text-textColor font-bold">540 ton</h3>
                    <p className="text-sm text-textColor">Total Pakan</p>
                </div>
            </div>
            <div className="container flex gap-2">
                <div className="p-2">
                    <Image src={Line} />
                </div>
                <div className="p-2">
                    <h3 className=" text-3xl text-textColor font-bold">300</h3>
                    <p className="text-sm text-textColor">Total Kandang</p>
                </div>
            </div>
            <div className="container flex gap-2">
                <div className="p-2">
                    <Image src={Line} />
                </div>
                <div className="p-2">
                    <h3 className=" text-3xl text-textColor font-bold">25</h3>
                    <p className="text-sm text-textColor">Total Farmer</p>
                </div>
            </div>
        </div>
    );
}