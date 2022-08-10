import React, { useEffect, useState } from "react";
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
import { Button } from "antd";
import { useRouter } from "next/router";
import axios from "axios";
import jwt_decode from "jwt-decode";

export default function SideNavbar() {
    const [role, setRole] = useState("");
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        router.push("/");
    };

    const CheckToken = () => {
        try {
            if (localStorage.getItem("access_token") !== null) {
                return jwt_decode(localStorage.getItem("access_token"));
            }
        } catch (error) {
            console.log(error);
        }
    };

    CheckToken();
    const getData = async () => {
        const decoded = CheckToken();
        try {
            const response = await axios
                .get(
                    `https://chikufarm-app.herokuapp.com/api/users/${decoded.sub}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "access_token"
                            )}`,
                        },
                    }
                )
                .then((res) => {
                    setRole(res.data.data.role.roleName);
                });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    if (role === "guest") {
        return (
            <>
                <Disclosure as="nav">
                    <Disclosure.Button className="inline-flex absolute right-7 top-11 justify-center items-center p-2.5 bg-white rounded-md transition duration-200 md:hidden peer text-textColor hover:text-cream focus:outline-none group hover:bg-textColor">
                        <GiHamburgerMenu
                            className="block w-6 h-6 md:hidden"
                            area-hidden="true"
                        />
                    </Disclosure.Button>
                    <div className="fixed top-0 -left-96 z-20 p-6 w-1/2 bg-white ease-out delay-150 -h-96 lg:top-4 lg:bottom-4 lg:left-4 lg:w-60 lg:rounded-xl peer-focus:left-0 peer:transition">
                        <div className="flex flex-col justify-start items-center">
                            {/* Logo */}
                            <div className="pb-4 w-full text-base text-center border-b border-gray-100 cursor-pointer">
                                <Image src={Logo} />
                            </div>

                            {/* Sidebar items */}
                            <div className="pb-4 my-4 w-full border-gray-100">
                                <Link href={"/dashboard"}>
                                    <div className="flex gap-4 justify-start items-center p-2 px-5 mb-2 rounded-md transition duration-200 cursor-pointer focus:bg-cream hover:bg-cream group">
                                        <MdOutlineDashboard className="text-2xl text-maroon group-hover:text-maroon" />
                                        <h3 className="text-sm font-semibold text-textColor group-hover:text-maroon">
                                            Dashboard
                                        </h3>
                                    </div>
                                </Link>
                                <Link href={"/dashboard/report"}>
                                    <div className="flex gap-4 justify-start items-center p-2 px-5 mb-2 rounded-md transition duration-200 cursor-pointer focus:bg-cream hover:bg-cream group">
                                        <TbReportAnalytics className="text-2xl text-maroon group-hover:text-maroon" />
                                        <h3 className="text-sm font-semibold text-textColor group-hover:text-maroon">
                                            Report Harian
                                        </h3>
                                    </div>
                                </Link>
                            </div>

                            {/* logout Section */}
                            <div className="pb-4 my-80 w-full border-gray-100">
                                <Button
                                    onClick={handleLogout}
                                    className="flex gap-4 justify-start items-center px-5 py-5 mb-2 w-full rounded-md border transition duration-200 cursor-pointer border-shadowColor hover:border-cream hover:bg-cream group"
                                >
                                    <HiOutlineLogout className="text-2xl text-maroon group-hover:text-maroon" />
                                    <h3 className="text-sm font-semibold text-textColor group-hover:text-maroon">
                                        Logout
                                    </h3>
                                </Button>
                            </div>
                        </div>
                    </div>
                </Disclosure>
            </>
        );
    } else if (role === "farmer") {
        return (
            <>
                <Disclosure as="nav">
                    <Disclosure.Button className="inline-flex absolute right-7 top-11 justify-center items-center p-2.5 bg-white rounded-md transition duration-200 md:hidden peer text-textColor hover:text-cream focus:outline-none group hover:bg-textColor">
                        <GiHamburgerMenu
                            className="block w-6 h-6 md:hidden"
                            area-hidden="true"
                        />
                    </Disclosure.Button>
                    <div className="fixed top-0 -left-96 z-20 p-6 w-1/2 bg-white ease-out delay-150 -h-96 lg:top-4 lg:bottom-4 lg:left-4 lg:w-60 lg:rounded-xl peer-focus:left-0 peer:transition">
                        <div className="flex flex-col justify-start items-center">
                            {/* Logo */}
                            <div className="pb-4 w-full text-base text-center border-b border-gray-100 cursor-pointer">
                                <Image src={Logo} />
                            </div>

                            {/* Sidebar items */}
                            <div className="pb-4 my-4 w-full border-gray-100">
                                <Link href={"/dashboard"}>
                                    <div className="flex gap-4 justify-start items-center p-2 px-5 mb-2 rounded-md transition duration-200 cursor-pointer focus:bg-cream hover:bg-cream group">
                                        <MdOutlineDashboard className="text-2xl text-maroon group-hover:text-maroon" />
                                        <h3 className="text-sm font-semibold text-textColor group-hover:text-maroon">
                                            Dashboard
                                        </h3>
                                    </div>
                                </Link>
                                <Link href={"/dashboard/report"}>
                                    <div className="flex gap-4 justify-start items-center p-2 px-5 mb-2 rounded-md transition duration-200 cursor-pointer focus:bg-cream hover:bg-cream group">
                                        <TbReportAnalytics className="text-2xl text-maroon group-hover:text-maroon" />
                                        <h3 className="text-sm font-semibold text-textColor group-hover:text-maroon">
                                            Report Harian
                                        </h3>
                                    </div>
                                </Link>
                                <Link href={"/dashboard/kandang"}>
                                    <div className="flex gap-4 justify-start items-center p-2 px-5 mb-2 rounded-md transition duration-200 cursor-pointer focus:bg-cream hover:bg-cream group">
                                        <RiHome2Line className="text-2xl text-maroon group-hover:text-maroon" />
                                        <h3 className="text-sm font-semibold text-textColor group-hover:text-maroon">
                                            Kandang
                                        </h3>
                                    </div>
                                </Link>
                                <Link href={"/dashboard/pakan"}>
                                    <div className="flex gap-4 justify-start items-center p-2 px-5 mb-2 rounded-md transition duration-200 cursor-pointer focus:bg-cream hover:bg-cream group">
                                        <RiHandCoinLine className="text-2xl text-maroon group-hover:text-maroon" />
                                        <h3 className="text-sm font-semibold text-textColor group-hover:text-maroon">
                                            Pakan
                                        </h3>
                                    </div>
                                </Link>
                                <Link href={"/dashboard/ternak"}>
                                    <div className="flex gap-4 justify-start items-center p-2 px-5 mb-2 rounded-md transition duration-200 cursor-pointer focus:bg-cream hover:bg-cream group">
                                        <FiFeather className="text-2xl text-maroon group-hover:text-maroon" />
                                        <h3 className="text-sm font-semibold text-textColor group-hover:text-maroon">
                                            Ternak
                                        </h3>
                                    </div>
                                </Link>
                            </div>

                            {/* logout Section */}
                            <div className="pb-4 my-40 w-full border-gray-100">
                                <Button
                                    onClick={handleLogout}
                                    className="flex gap-4 justify-start items-center px-5 py-5 mb-2 w-full rounded-md border transition duration-200 cursor-pointer border-shadowColor hover:border-cream hover:bg-cream group"
                                >
                                    <HiOutlineLogout className="text-2xl text-maroon group-hover:text-maroon" />
                                    <h3 className="text-sm font-semibold text-textColor group-hover:text-maroon">
                                        Logout
                                    </h3>
                                </Button>
                            </div>
                        </div>
                    </div>
                </Disclosure>
            </>
        );
    } else {
        return (
            <>
                <Disclosure as="nav">
                    <Disclosure.Button className="inline-flex absolute right-7 top-11 justify-center items-center p-2.5 bg-white rounded-md transition duration-200 md:hidden peer text-textColor hover:text-cream focus:outline-none group hover:bg-textColor">
                        <GiHamburgerMenu
                            className="block w-6 h-6 md:hidden"
                            area-hidden="true"
                        />
                    </Disclosure.Button>
                    <div className="fixed top-0 -left-96 z-20 p-6 w-1/2 bg-white ease-out delay-150 -h-96 lg:top-4 lg:bottom-4 lg:left-4 lg:w-60 lg:rounded-xl peer-focus:left-0 peer:transition">
                        <div className="flex flex-col justify-start items-center">
                            {/* Logo */}
                            <div className="pb-4 w-full text-base text-center border-b border-gray-100 cursor-pointer">
                                <Image src={Logo} />
                            </div>

                            {/* Sidebar items */}
                            <div className="pb-4 my-4 w-full border-gray-100">
                                <Link href={"/dashboard"}>
                                    <div className="flex gap-4 justify-start items-center p-2 px-5 mb-2 rounded-md transition duration-200 cursor-pointer focus:bg-cream hover:bg-cream group">
                                        <MdOutlineDashboard className="text-2xl text-maroon group-hover:text-maroon" />
                                        <h3 className="text-sm font-semibold text-textColor group-hover:text-maroon">
                                            Dashboard
                                        </h3>
                                    </div>
                                </Link>
                                <Link href={"/dashboard/report"}>
                                    <div className="flex gap-4 justify-start items-center p-2 px-5 mb-2 rounded-md transition duration-200 cursor-pointer focus:bg-cream hover:bg-cream group">
                                        <TbReportAnalytics className="text-2xl text-maroon group-hover:text-maroon" />
                                        <h3 className="text-sm font-semibold text-textColor group-hover:text-maroon">
                                            Report Harian
                                        </h3>
                                    </div>
                                </Link>
                                <Link href={"/dashboard/user"}>
                                    <div className="flex gap-4 justify-start items-center p-2 px-5 mb-2 rounded-md transition duration-200 cursor-pointer focus:bg-cream hover:bg-cream group">
                                        <FaRegUser className="text-2xl text-maroon group-hover:text-maroon" />
                                        <h3 className="text-sm font-semibold text-textColor group-hover:text-maroon">
                                            User
                                        </h3>
                                    </div>
                                </Link>
                                <Link href={"/dashboard/kandang"}>
                                    <div className="flex gap-4 justify-start items-center p-2 px-5 mb-2 rounded-md transition duration-200 cursor-pointer focus:bg-cream hover:bg-cream group">
                                        <RiHome2Line className="text-2xl text-maroon group-hover:text-maroon" />
                                        <h3 className="text-sm font-semibold text-textColor group-hover:text-maroon">
                                            Kandang
                                        </h3>
                                    </div>
                                </Link>
                                <Link href={"/dashboard/pakan"}>
                                    <div className="flex gap-4 justify-start items-center p-2 px-5 mb-2 rounded-md transition duration-200 cursor-pointer focus:bg-cream hover:bg-cream group">
                                        <RiHandCoinLine className="text-2xl text-maroon group-hover:text-maroon" />
                                        <h3 className="text-sm font-semibold text-textColor group-hover:text-maroon">
                                            Pakan
                                        </h3>
                                    </div>
                                </Link>
                                <Link href={"/dashboard/ternak"}>
                                    <div className="flex gap-4 justify-start items-center p-2 px-5 mb-2 rounded-md transition duration-200 cursor-pointer focus:bg-cream hover:bg-cream group">
                                        <FiFeather className="text-2xl text-maroon group-hover:text-maroon" />
                                        <h3 className="text-sm font-semibold text-textColor group-hover:text-maroon">
                                            Ternak
                                        </h3>
                                    </div>
                                </Link>
                            </div>

                            {/* logout Section */}
                            <div className="pb-4 my-36 w-full border-gray-100">
                                <Button
                                    onClick={handleLogout}
                                    className="flex gap-4 justify-start items-center px-5 py-5 mb-2 w-full rounded-md border transition duration-200 cursor-pointer border-shadowColor hover:border-cream hover:bg-cream group"
                                >
                                    <HiOutlineLogout className="text-2xl text-maroon group-hover:text-maroon" />
                                    <h3 className="text-sm font-semibold text-textColor group-hover:text-maroon">
                                        Logout
                                    </h3>
                                </Button>
                            </div>
                        </div>
                    </div>
                </Disclosure>
            </>
        );
    }
}
