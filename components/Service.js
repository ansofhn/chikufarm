import React from "react";
import Image from "next/image";
import Link from "next/link";
import MobileApp from "../public/mobile.png";
import WebApp from "../public/website.png";
import { MdNavigateNext } from "react-icons/md";
import Button from "./Button";

export default function Service() {
    return (
        <div className="my-20">
            <div className="p-10 bg-maroon">
                <h3 className="p-5 mb-10 text-3xl font-bold text-center text-white font-monserrat">
                    Services That Connect You
                </h3>
                <div className="grid w-4/5 grid-cols-3 gap-5 mx-auto 2xl:gap-0">
                    <div className="w-full p-5 bg-white rounded-lg 2xl:w-9/12 2xl:mx-auto">
                        <Image src={MobileApp} />
                        <div className="mt-10 mb-3 text-xl font-bold text-left text-textColor">
                            Mobile Application
                        </div>
                        <p className="mb-10 text-sm text-left text-textColor">
                            Application software run on a mobile phone. Mobile
                            applications often serve to furnish clients with
                            comparable administrations.
                        </p>
                        <Link href={"https://chikufarm.vercel.app"}>
                            <a className="flex items-center gap-2 text-sm font-medium hover:text-maroon text-maroon">
                                See more
                                <MdNavigateNext />
                            </a>
                        </Link>
                    </div>
                    <div className="w-full p-5 bg-white rounded-lg 2xl:w-9/12 2xl:mx-auto">
                        <Image src={WebApp} />
                        <div className="mt-10 mb-3 text-xl font-bold text-left text-textColor">
                            Web Application
                        </div>
                        <p className="mb-10 text-sm font-normal text-left text-textColor">
                            Software applications that carry on correspondingly
                            to native mobile applications and work on mobile
                            devices.
                        </p>
                        <Link href={"https://chikufarm.vercel.app"}>
                            <a className="flex items-center gap-2 text-sm font-medium hover:text-maroon text-maroon">
                                See more
                                <MdNavigateNext />
                            </a>
                        </Link>
                    </div>
                    <div className="w-full p-5 bg-white rounded-lg 2xl:w-9/12 2xl:mx-auto">
                        <Image src={WebApp} />
                        <div className="mt-10 mb-3 text-xl font-bold text-left text-textColor">
                            E-Commerce
                        </div>
                        <p className="mb-10 text-sm font-normal text-left text-textColor 2xl:mb-14">
                            This involves the transaction of goods and services,
                            the transfer of funds and the exchange of data.
                        </p>
                        <Link href={"https://chikufarm.vercel.app"}>
                            <a className="flex items-center gap-2 text-sm font-medium hover:text-maroon text-maroon">
                                See more
                                <MdNavigateNext />
                            </a>
                        </Link>
                    </div>
                </div>
                <div className="flex items-center justify-center p-5 mt-10">
                    <Link href={"https://chikufarm.vercel.app"}>
                        <Button
                            className={
                                "transition duration-300 flex items-center gap-2 text-semibold text-sm border border-cream px-4 py-2 bg-maroon text-cream"
                            }
                        >
                            Explore all
                            <MdNavigateNext />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
