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
                <h3 className="p-5 mb-10 font-monserrat font-bold text-white text-3xl text-center">
                    Services That Connect You
                </h3>
                <div className="grid w-4/5 grid-cols-3 gap-5 mx-auto">
                    <div className="w-full p-5 bg-white rounded-lg">
                        <Image src={MobileApp} />
                        <div className="mt-10 mb-3 text-xl text-left font-bold text-textColor">
                            Mobile Application
                        </div>
                        <p className="mb-10 text-sm text-left text-textColor">
                            Proident tempor laboris adipisicing occaecat
                            cupidatat dolor officia.Aliquip Lorem minim veniam
                            culpa dolore enim aliquip.
                        </p>
                        <Link href={"#"}>
                            <a className="flex items-center gap-2 text-sm hover:text-maroon font-medium text-maroon">
                                See more
                                <MdNavigateNext />
                            </a>
                        </Link>
                    </div>
                    <div className="w-full p-5 bg-white rounded-lg">
                        <Image src={WebApp} />
                        <div className="mt-10 mb-3 text-xl text-left font-bold text-textColor">
                            Web Application
                        </div>
                        <p className="mb-10 text-sm font-normal text-left text-textColor">
                            Proident tempor laboris adipisicing occaecat
                            cupidatat dolor officia.Aliquip Lorem minim veniam
                            culpa dolore enim aliquip.
                        </p>
                        <Link href={"#"}>
                            <a className="flex items-center gap-2 font-medium hover:text-maroon text-sm text-maroon">
                                See more
                                <MdNavigateNext />
                            </a>
                        </Link>
                    </div>
                    <div className="w-full p-5 bg-white rounded-lg">
                        <Image src={WebApp} />
                        <div className="mt-10 mb-3 text-xl text-left font-bold text-textColor">
                            E-Commerce
                        </div>
                        <p className="mb-10 text-sm font-normal text-left text-textColor">
                            Proident tempor laboris adipisicing occaecat
                            cupidatat dolor officia.Aliquip Lorem minim veniam
                            culpa dolore enim aliquip.
                        </p>
                        <Link href={"#"}>
                            <a className="flex items-center gap-2 text-sm font-medium hover:text-maroon text-maroon">
                                See more
                                <MdNavigateNext />
                            </a>
                        </Link>
                    </div>
                </div>
                <div className="flex items-center justify-center p-5 mt-10">
                    <Link href={"#"}>
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
