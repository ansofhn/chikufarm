import React from "react";
import Input from "./Input";
import Link from "next/link";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
    return (
        <>
            <footer className="text-gray-100 text-start lg:text-left bg-textColor">
                <div className="pt-20 mr-24 text-center pb-14 md:text-left">
                    <div className="grid grid-cols-2 gap-20">
                        <div className="p-2 mx-auto text-sm text-center">
                            <p className="mb-2">Copyright @ 2022</p>
                            <p>All rights reserved</p>
                            <div className="grid grid-cols-3 gap-2 mt-5">
                                <Link href={"https://instagram.com/ansofhn"}>
                                    <a className="p-2.5 text-base text-white hover:text-white bg-gray-500 rounded-full">
                                        <FaInstagram />
                                    </a>
                                </Link>
                                <Link href={"https://twitter.com/ansofhn"}>
                                    <a className="p-2.5 text-base text-white hover:text-white bg-gray-500 rounded-full">
                                        <FaTwitter />
                                    </a>
                                </Link>
                                <Link
                                    href={
                                        "https://www.youtube.com/channel/UC81oGjTKWlhIMI4XbJcNzgA"
                                    }
                                >
                                    <a className="p-2.5 text-base text-white hover:text-white bg-gray-500 rounded-full">
                                        <FaYoutube />
                                    </a>
                                </Link>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-5">
                            <div>
                                <h3 className="mb-4 font-sans text-base font-medium text-gray-100">
                                    Company
                                </h3>
                                <p className="mb-2 font-sans text-sm">About Us</p>
                                <p className="mb-2 font-sans text-sm">Contact Us</p>
                            </div>
                            <div>
                                <h3 className="mb-4 font-sans text-base font-medium text-gray-100">
                                    Support
                                </h3>
                                <p className="mb-2 font-sans text-sm">Privacy police</p>
                                <p className="mb-2 font-sans text-sm">Status</p>
                            </div>
                            <div>
                                <h3 className="mb-4 font-sans text-base font-medium text-gray-100">
                                    Stay up to date
                                </h3>
                                <Input
                                    className={
                                        "rounded-lg bg-gray-500 focus:ring-0 w-full transition duration-300 border-none placeholder:text-gray-100 placeholder:text-xs focus:border-none text-gray-100 text-xs p-2"
                                    }
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Your email address"
                                ></Input>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
