import React from "react";
import { Disclosure } from "@headlessui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import Image from "next/image";
import Logo from "../public/Title.png";
// import icons from react-icons
import {
    MdOutlineDashboard,
    MdOutlineSettings,
    MdOutlineMoreHoriz,
} from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { RiHome2Line, RiHandCoinLine } from "react-icons/ri";
import { FiFeather } from "react-icons/fi";
import { HiOutlineLogout } from "react-icons/hi";

export default function SideNavbar() {
    return (
        <div>
            <Disclosure as="nav">
                <Disclosure.Button className="absolute md:hidden top-4 right-4 inline-flex items-center peer justify-center transition duration-200 rounded-md p-2 text-textColor bg-white hover:text-cream focus:outline-none group hover:bg-textColor">
                    <GiHamburgerMenu
                        className="block md:hidden h-6 w-6"
                        area-hidden="true"
                    />
                </Disclosure.Button>
                <div className="p-6 w-1/2 h-screen bg-white z-20 fixed top-0 lg:top-4 lg:bottom-4 lg:left-4 -left-96 lg:w-60 lg:rounded-xl peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
                    <div className="flex flex-col justify-start items-center">
                        {/* Logo */}
                        <div className="text-base text-center cursor-pointer border-b border-gray-100 pb-4 w-full">
                            <Image src={Logo} />
                        </div>

                        {/* Sidebar items */}
                        <div className="my-4 w-full border-b border-gray-100 pb-4">
                            <div className="flex mb-2 justify-start items-center gap-4 px-5 hover:bg-textColor p-2 rounded-md group transition duration-200 cursor-pointer m-auto">
                                <MdOutlineDashboard className="text-2xl text-maroon group-hover:text-cream" />
                                <h3 className="text-base text-textColor group-hover:text-cream font-semibold">
                                    Dashboard
                                </h3>
                            </div>
                            <div className="flex mb-2 justify-start items-center gap-4 px-5 hover:bg-textColor p-2 rounded-md group transition duration-200 cursor-pointer m-auto">
                                <TbReportAnalytics className="text-2xl text-maroon group-hover:text-cream" />
                                <h3 className="text-base text-textColor group-hover:text-cream font-semibold">
                                    Report Harian
                                </h3>
                            </div>
                            <div className="flex mb-2 justify-start items-center gap-4 px-5 hover:bg-textColor p-2 rounded-md group transition duration-200 cursor-pointer m-auto">
                                <FaRegUser className="text-2xl text-maroon group-hover:text-cream" />
                                <h3 className="text-base text-textColor group-hover:text-cream font-semibold">
                                    User
                                </h3>
                            </div>
                            <div className="flex mb-2 justify-start items-center gap-4 px-5 hover:bg-textColor p-2 rounded-md group transition duration-200 cursor-pointer m-auto">
                                <RiHome2Line className="text-2xl text-maroon group-hover:text-cream" />
                                <h3 className="text-base text-textColor group-hover:text-cream font-semibold">
                                    Kandang
                                </h3>
                            </div>
                            <div className="flex mb-2 justify-start items-center gap-4 px-5 hover:bg-textColor p-2 rounded-md group transition duration-200 cursor-pointer m-auto">
                                <RiHandCoinLine className="text-2xl text-maroon group-hover:text-cream" />
                                <h3 className="text-base text-textColor group-hover:text-cream font-semibold">
                                    Pakan
                                </h3>
                            </div>
                            <div className="flex mb-2 justify-start items-center gap-4 px-5 hover:bg-textColor p-2 rounded-md group transition duration-200 cursor-pointer m-auto">
                                <FiFeather className="text-2xl text-maroon group-hover:text-cream" />
                                <h3 className="text-base text-textColor group-hover:text-cream font-semibold">
                                    Ternak
                                </h3>
                            </div>
                        </div>

                        {/* setting and more  */}
                        <div className="my-4 w-full border-b border-gray-100 pb-4">
                            <div className="flex mb-2 justify-start items-center gap-4 px-5 hover:bg-textColor p-2 rounded-md group transition duration-200 cursor-pointer m-auto">
                                <MdOutlineSettings className="text-2xl text-maroon group-hover:text-cream" />
                                <h3 className="text-base text-textColor group-hover:text-cream font-semibold">
                                    Settings
                                </h3>
                            </div>
                            <div className="flex mb-2 justify-start items-center gap-4 px-5 hover:bg-textColor p-2 rounded-md group transition duration-200 cursor-pointer m-auto">
                                <MdOutlineMoreHoriz className="text-2xl text-maroon group-hover:text-cream" />
                                <h3 className="text-base text-textColor group-hover:text-cream font-semibold">
                                    More
                                </h3>
                            </div>
                        </div>

                        {/* logout Section */}
                        <div className="my-4 w-full border-b border-gray-100 pb-4">
                            <div className="flex mb-2 justify-start border border-shadowColor items-center gap-4 px-5 hover:bg-textColor p-2 rounded-md group transition duration-200 cursor-pointer m-auto">
                                <HiOutlineLogout className="text-2xl text-maroon group-hover:text-cream" />
                                <h3 className="text-base text-textColor group-hover:text-cream font-semibold">
                                    Logout
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </Disclosure>
        </div>
    );
}
