import React from "react";
import Line from "../public/Line.png";
import Image from "next/image";

export default function Stats() {
    return (
        <div className="grid grid-cols-4 gap-10 mx-auto my-40 w-4/5">
            <div className="container flex gap-2 ml-10">
                <div className="p-2">
                    <Image src={Line} />
                </div>
                <div className="p-2">
                    <h3 className="text-2xl font-bold text-textColor">40</h3>
                    <p className="text-sm text-textColor">Total Population</p>
                </div>
            </div>
            <div className="container flex gap-2 ml-10">
                <div className="p-2">
                    <Image src={Line} />
                </div>
                <div className="p-2">
                    <h3 className="text-2xl font-bold text-textColor">
                        540 ton
                    </h3>
                    <p className="text-sm text-textColor">Total Feed</p>
                </div>
            </div>
            <div className="container flex gap-2 ml-10">
                <div className="p-2">
                    <Image src={Line} />
                </div>
                <div className="p-2">
                    <h3 className="text-2xl font-bold text-textColor">300</h3>
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
