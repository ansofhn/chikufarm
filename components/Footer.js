import React from "react";
import Input from "./Input";
import Link from "next/link";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
    return (
        <div>
            <footer className="text-start lg:text-left bg-textColor text-white">
                <div className="mx-14 py-14 text-center md:text-left">
                    <div className="grid grid-cols-2 gap-20">
                        <div className="mx-auto text-center text-sm p-2">
                            <h3>Copyright @ 2022</h3>
                            <p>All rights reserved</p>
                            <div className="mt-5 grid grid-cols-3 gap-2">
                                <Link href={"https://instagram.com/ansofhn"}>
                                    <a className="p-2 text-base text-white bg-gray-500 rounded-full">
                                        <FaInstagram />
                                    </a>
                                </Link>
                                <Link href={"https://twitter.com/ansofhn"}>
                                    <a className="p-2 text-base text-white bg-gray-500 rounded-full">
                                        <FaTwitter />
                                    </a>
                                </Link>
                                <Link
                                    href={
                                        "https://www.youtube.com/channel/UC81oGjTKWlhIMI4XbJcNzgA"
                                    }
                                >
                                    <a className="p-2 text-base text-white bg-gray-500 rounded-full">
                                        <FaYoutube />
                                    </a>
                                </Link>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-5">
                            <div>
                                <h3 className="text-lg font-sans font-medium mb-4">
                                    Company
                                </h3>
                                <p className="text-sm mb-2">About Us</p>
                                <p className="text-sm mb-2">Contact Us</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-sans font-medium mb-4">
                                    Support
                                </h3>
                                <p className="text-sm mb-2">Privacy police</p>
                                <p className="text-sm mb-2">Status</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-sans font-medium mb-4">
                                    Stay up to date
                                </h3>
                                <Input
                                    className={
                                        "rounded-lg bg-gray-500 focus:ring-0 w-full transition duration-300 border-none placeholder:text-white focus:border-none text-white text-sm p-2"
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
        </div>
    );
}
