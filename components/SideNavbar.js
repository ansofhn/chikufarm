import React from "react";
import { Disclosure } from "@headlessui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import Image from "next/image";
import Logo from "../public/Title.png";
// import icons from react-icons
import { MdOutlineDashboard } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { RiHome2Line, RiHandCoinLine } from "react-icons/ri";
import { FiFeather } from "react-icons/fi";
import { HiOutlineLogout } from "react-icons/hi";
import Link from "next/link";

export default function SideNavbar() {
    return (
        <div>
            <Disclosure as="nav">
                <Disclosure.Button className="absolute inline-flex items-center justify-center p-2.5 transition duration-200 bg-white rounded-md md:hidden top-11 right-7 peer text-textColor hover:text-cream focus:outline-none group hover:bg-textColor">
                    <GiHamburgerMenu
                        className="block w-6 h-6 md:hidden"
                        area-hidden="true"
                    />
                </Disclosure.Button>
                <div className="fixed top-0 z-20 w-1/2 h-full p-6 ease-out delay-150 bg-white lg:top-4 lg:bottom-4 lg:left-4 -left-96 lg:w-60 lg:rounded-xl peer-focus:left-0 peer:transition">
                    <div className="flex flex-col items-center justify-start">
                        {/* Logo */}
                        <div className="w-full pb-4 text-base text-center border-b border-gray-100 cursor-pointer">
                            <Image src={Logo} />
                        </div>

                        {/* Sidebar items */}
                        <div className="w-full pb-4 my-4 border-b border-gray-100">
                            <Link href={"/dashboard"}>
                                <div className="flex items-center justify-start gap-4 p-2 px-5 mb-2 transition duration-200 rounded-md cursor-pointer focus:bg-cream hover:bg-cream group">
                                    <MdOutlineDashboard className="text-2xl text-maroon group-hover:text-maroon" />
                                    <h3 className=" text-sm font-semibold text-textColor group-hover:text-maroon">
                                        Dashboard
                                    </h3>
                                </div>
                            </Link>
                            <Link href={"/dashboard/report"}>
                                <div className="flex items-center justify-start gap-4 p-2 px-5 mb-2 transition duration-200 rounded-md cursor-pointer focus:bg-cream hover:bg-cream group">
                                    <TbReportAnalytics className="text-2xl text-maroon group-hover:text-maroon" />
                                    <h3 className="text-sm font-semibold text-textColor group-hover:text-maroon">
                                        Report Harian
                                    </h3>
                                </div>
                            </Link>
                            <Link href={"/dashboard/user"}>
                                <div className="flex items-center justify-start gap-4 p-2 px-5 mb-2 transition duration-200 rounded-md cursor-pointer focus:bg-cream hover:bg-cream group">
                                    <FaRegUser className="text-2xl text-maroon group-hover:text-maroon" />
                                    <h3 className="text-sm font-semibold text-textColor group-hover:text-maroon">
                                        User
                                    </h3>
                                </div>
                            </Link>
                            <Link href={"/dashboard/kandang"}>
                                <div className="flex items-center justify-start gap-4 p-2 px-5 mb-2 transition duration-200 rounded-md cursor-pointer focus:bg-cream hover:bg-cream group">
                                    <RiHome2Line className="text-2xl text-maroon group-hover:text-maroon" />
                                    <h3 className="text-sm font-semibold text-textColor group-hover:text-maroon">
                                        Kandang
                                    </h3>
                                </div>
                            </Link>
                            <Link href={"/dashboard/pakan"}>
                                <div className="flex items-center justify-start gap-4 p-2 px-5 mb-2 transition duration-200 rounded-md cursor-pointer focus:bg-cream hover:bg-cream group">
                                    <RiHandCoinLine className="text-2xl text-maroon group-hover:text-maroon" />
                                    <h3 className="text-sm font-semibold text-textColor group-hover:text-maroon">
                                        Pakan
                                    </h3>
                                </div>
                            </Link>
                            <Link href={"/dashboard/ternak"}>
                                <div className="flex items-center justify-start gap-4 p-2 px-5 mb-2 transition duration-200 rounded-md cursor-pointer focus:bg-cream hover:bg-cream group">
                                    <FiFeather className="text-2xl text-maroon group-hover:text-maroon" />
                                    <h3 className="text-sm font-semibold text-textColor group-hover:text-maroon">
                                        Ternak
                                    </h3>
                                </div>
                            </Link>
                        </div>

                        {/* logout Section */}
                        <div className="w-full pb-4 my-20 border-gray-100">
                            <Link href={"/"}>
                                <div className="flex items-center justify-start gap-4 p-2 px-5 mb-2 transition duration-200 border rounded-md cursor-pointer border-shadowColor hover:bg-cream group">
                                    <HiOutlineLogout className="text-2xl text-maroon group-hover:text-maroon" />
                                    <h3 className="text-sm font-semibold text-textColor group-hover:text-maroon">
                                        Logout
                                    </h3>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </Disclosure>
        </div>
    );
}
