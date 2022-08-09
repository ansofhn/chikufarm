import React from "react";
import Image from "next/image";
import Banner from "../public/Banner.png";
import Navbar from "./Navbar";
import Button from "./Button";

export default function Hero() {
    return (
        <>
            <Navbar />
            <div className="w-full bg-white">
                <div className="container">
                    <div className="grid items-center justify-center grid-cols-2 mx-5 my-24 bg-white">
                        <div className="px-20 py-20">
                            <h1 className="font-monserrat text-textColor text-4xl font-bold">
                                Manage Your Daily for Best Investment
                            </h1>
                            <p className="mt-4 mb-6 font-monserrat text-textColor text-xl font-light leading-relaxed">
                                start management from small things to be able to
                                produce the best quality and quantity
                            </p>
                            <Button className={"bg-cream text-maroon w-40 hover:bg-maroon hover:text-cream"}>Get Started</Button>
                        </div>
                        <Image src={Banner} />
                    </div>
                </div>
            </div>
        </>
    );
}
