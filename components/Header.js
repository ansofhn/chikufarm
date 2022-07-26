import React from "react";
import Image from "next/image";
import Profile from "../public/pp.png";

export default function Header() {
    return (
        <div className="flex justify-end mx-4 my-4 rounded-md text-textColor ml-72">
            <div className="flex gap-2 p-1 bg-white rounded-md w-72">
                <div className="flex items-center mx-2">
                    <Image src={Profile} />
                </div>
                <div className="items-center">
                    <div className="text-xs font-normal">Welcome back,</div>
                    <div className="text-xl font-medium">ansofhn</div>
                </div>
            </div>
        </div>
    );
}
