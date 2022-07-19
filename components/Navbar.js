import React from "react";
import Image from "next/image";
import Logo from "../public/logo-navbar.png";
import Link from "next/link";
import Button from "./Button";
import Banner from "../public/Banner.png";

export default function Navbar() {
    return (
        <div className="bg-white">
            <div className="py-3 border-b border-gray-100">
                <div className="container">
                    <nav className="flex items-center justify-between">
                        <div className="flex items-center py-2 gap-x-2">
                            <Image src={Logo} />
                        </div>
                        <div className="flex items-center gap-x-2">
                            <nav className="flex space-x-4 sm:justify-center">
                                {[
                                    ["Home", "/dashboard"],
                                    ["About", "/about"],
                                    ["Contact", "/contact"],
                                ].map(([title, url]) => (
                                    <a
                                        href={url}
                                        className="px-3 py-2 font-medium rounded-lg text-textColor"
                                    >
                                        {title}
                                    </a>
                                ))}
                            </nav>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <Link href={"/login"}>
                                <Button
                                    className={
                                        "transition duration-300 text-semibold px-4 py-2 bg-cream text-maroon"
                                    }
                                >
                                    Login
                                </Button>
                            </Link>
                            <Link href={"/register"}>
                                <Button
                                    className={
                                        "transition duration-300 text-semibold px-4 py-2 bg-maroon text-cream"
                                    }
                                >
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    </nav>
                </div>
            </div>
            <div className="container">
                <div className="grid items-center justify-center grid-cols-2">
                    <div className="px-20 py-20 text-textColor">
                        <h1 className="text-4xl font-bold">
                            Manage Your Daily for Best Investment
                        </h1>
                        <p className="mt-4 mb-6 text-xl font-light leading-relaxed">
                            start management from small things to be able to
                            produce the best quality and quantity
                        </p>
                    </div>

                    <div>
                        <Image src={Banner} />
                    </div>
                </div>
            </div>
        </div>
    );
}
