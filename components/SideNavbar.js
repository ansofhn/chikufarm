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
                <Disclosure.Button className="absolute inline-flex items-center justify-center p-2 transition duration-200 bg-white rounded-md md:hidden top-10 right-5 peer text-textColor hover:text-cream focus:outline-none group hover:bg-textColor">
                    <GiHamburgerMenu
                        className="block w-6 h-6 md:hidden"
                        area-hidden="true"
                    />
                </Disclosure.Button>
                <div className="fixed top-0 z-20 w-1/2 h-screen p-6 ease-out delay-150 bg-white shadow-sm shadow-shadowColor lg:top-4 lg:bottom-4 lg:left-4 -left-96 lg:w-60 lg:rounded-xl peer-focus:left-0 peer:transition">
                    <div className="flex flex-col items-center justify-start">
                        {/* Logo */}
                        <div className="w-full pb-4 text-base text-center border-b border-gray-100 cursor-pointer">
                            <Image src={Logo} />
                        </div>

                        {/* Sidebar items */}
                        <div className="w-full pb-4 my-4 border-b border-gray-100">
                            <div className="flex items-center justify-start gap-4 p-2 px-5 m-auto mb-2 transition duration-200 rounded-md cursor-pointer hover:bg-textColor group">
                                <MdOutlineDashboard className="text-2xl text-maroon group-hover:text-cream" />
                                <h3 className="text-base font-semibold text-textColor group-hover:text-cream">
                                    Dashboard
                                </h3>
                            </div>
                            <div className="flex items-center justify-start gap-4 p-2 px-5 m-auto mb-2 transition duration-200 rounded-md cursor-pointer hover:bg-textColor group">
                                <TbReportAnalytics className="text-2xl text-maroon group-hover:text-cream" />
                                <h3 className="text-base font-semibold text-textColor group-hover:text-cream">
                                    Report Harian
                                </h3>
                            </div>
                            <div className="flex items-center justify-start gap-4 p-2 px-5 m-auto mb-2 transition duration-200 rounded-md cursor-pointer hover:bg-textColor group">
                                <FaRegUser className="text-2xl text-maroon group-hover:text-cream" />
                                <h3 className="text-base font-semibold text-textColor group-hover:text-cream">
                                    User
                                </h3>
                            </div>
                            <div className="flex items-center justify-start gap-4 p-2 px-5 m-auto mb-2 transition duration-200 rounded-md cursor-pointer hover:bg-textColor group">
                                <RiHome2Line className="text-2xl text-maroon group-hover:text-cream" />
                                <h3 className="text-base font-semibold text-textColor group-hover:text-cream">
                                    Kandang
                                </h3>
                            </div>
                            <div className="flex items-center justify-start gap-4 p-2 px-5 m-auto mb-2 transition duration-200 rounded-md cursor-pointer hover:bg-textColor group">
                                <RiHandCoinLine className="text-2xl text-maroon group-hover:text-cream" />
                                <h3 className="text-base font-semibold text-textColor group-hover:text-cream">
                                    Pakan
                                </h3>
                            </div>
                            <div className="flex items-center justify-start gap-4 p-2 px-5 m-auto mb-2 transition duration-200 rounded-md cursor-pointer hover:bg-textColor group">
                                <FiFeather className="text-2xl text-maroon group-hover:text-cream" />
                                <h3 className="text-base font-semibold text-textColor group-hover:text-cream">
                                    Ternak
                                </h3>
                            </div>
                        </div>

                        {/* setting and more  */}
                        <div className="w-full pb-4 my-4 border-b border-gray-100">
                            <div className="flex items-center justify-start gap-4 p-2 px-5 m-auto mb-2 transition duration-200 rounded-md cursor-pointer hover:bg-textColor group">
                                <MdOutlineSettings className="text-2xl text-maroon group-hover:text-cream" />
                                <h3 className="text-base font-semibold text-textColor group-hover:text-cream">
                                    Settings
                                </h3>
                            </div>
                            <div className="flex items-center justify-start gap-4 p-2 px-5 m-auto mb-2 transition duration-200 rounded-md cursor-pointer hover:bg-textColor group">
                                <MdOutlineMoreHoriz className="text-2xl text-maroon group-hover:text-cream" />
                                <h3 className="text-base font-semibold text-textColor group-hover:text-cream">
                                    More
                                </h3>
                            </div>
                        </div>

                        {/* logout Section */}
                        <div className="w-full pb-4 my-4 border-b border-gray-100">
                            <div className="flex items-center justify-start gap-4 p-2 px-5 m-auto mb-2 transition duration-200 border rounded-md cursor-pointer border-shadowColor hover:bg-textColor group">
                                <HiOutlineLogout className="text-2xl text-maroon group-hover:text-cream" />
                                <h3 className="text-base font-semibold text-textColor group-hover:text-cream">
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
