import React, { useEffect, useState, Fragment } from "react";
import { Disclosure } from "@headlessui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import Image from "next/image";
import Logo from "../public/Title.png";
import { Menu, Transition } from "@headlessui/react";

// import icons from react-icons
import { MdOutlineDashboard, MdOutlineSell } from "react-icons/md";
import { TbReportAnalytics, TbVaccine } from "react-icons/tb";
import { BiUser, BiChat } from "react-icons/bi";
import { RiHome2Line, RiHandCoinLine } from "react-icons/ri";
import { FiFeather } from "react-icons/fi";
import { HiOutlineLogout } from "react-icons/hi";
import Link from "next/link";
import { Button } from "antd";
import { useRouter } from "next/router";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { io } from "socket.io-client";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function SideNavbar() {
    const [role, setRole] = useState("");
    const [newMessage, setNewMessage] = useState(0);
    const router = useRouter();

    const socket = io("https://chikufarm-app.herokuapp.com");

    useEffect(() => {
        socket.on("newMessage", (message) => {
            setNewMessage((newMessage += 1));
        });
    });
    const onHandleForum = () => {
        setNewMessage(0);
    };

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
                    <div className="fixed top-0 z-20 w-1/2 p-6 ease-out delay-150 bg-white -left-96 -h-96 lg:top-4 lg:bottom-4 lg:left-4 lg:w-60 lg:rounded-xl peer-focus:left-0 peer:transition">
                        <div className="flex flex-col items-center justify-start">
                            {/* Logo */}
                            <Link href={"/dashboard"}>
                                <div className="w-full pb-4 text-base text-center border-b border-gray-100 cursor-pointer">
                                    <Image src={Logo} />
                                </div>
                            </Link>

                            {/* Sidebar items */}
                            <div className="w-full pb-4 my-4 border-gray-100">
                                <Link href={"/dashboard"}>
                                    <div className="flex items-center justify-start gap-4 px-2 py-2 mb-2 transition duration-200 rounded-md cursor-pointer focus:bg-cream active:bg-cream hover:bg-cream group">
                                        <MdOutlineDashboard className="text-2xl text-maroon group-hover:text-maroon" />
                                        <h3 className="text-sm font-semibold text-textColor group-hover:text-maroon">
                                            Dashboard
                                        </h3>
                                    </div>
                                </Link>
                                <Menu
                                    as="div"
                                    className="relative inline-block text-left"
                                >
                                    <div>
                                        <Menu.Button className="flex items-center justify-between gap-4 py-2 pl-2 pr-4 mb-2 transition duration-200 rounded-md cursor-pointer hover:bg-cream group ">
                                            <TbReportAnalytics className="text-2xl text-maroon group-hover:text-maroon" />
                                            <h3 className="text-sm font-semibold text-textColor group-hover:text-maroon mr-12">
                                                Report
                                            </h3>
                                            <svg
                                                aria-hidden="true"
                                                className="w-4 h-4"
                                                fill="maroon"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                    clip-rule="evenodd"
                                                ></path>
                                            </svg>
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items
                                            static
                                            className="absolute top-0 z-10 ml-56 origin-top-left bg-white rounded-md shadow-md w-44 focus:outline-none"
                                        >
                                            <div className="py-1">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            href={
                                                                "/dashboard/report/dailyReport"
                                                            }
                                                        >
                                                            <div
                                                                className={classNames(
                                                                    active
                                                                        ? "bg-white text-textColor hover:bg-gray-50 hover:text-textColor"
                                                                        : "text-gray-700",
                                                                    "block px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 hover:text-textColor"
                                                                )}
                                                            >
                                                                Daily Coop
                                                                Report
                                                            </div>
                                                        </Link>
                                                    )}
                                                </Menu.Item>

                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            href={
                                                                "/dashboard/report/detailReport"
                                                            }
                                                        >
                                                            <div
                                                                className={classNames(
                                                                    active
                                                                        ? "bg-white text-textColor hover:bg-gray-50 hover:text-textColor"
                                                                        : "text-gray-700",
                                                                    "block px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 hover:text-textColor"
                                                                )}
                                                            >
                                                                All Detail
                                                                Report
                                                            </div>
                                                        </Link>
                                                    )}
                                                </Menu.Item>

                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            href={
                                                                "/dashboard/report/vaccinationReport"
                                                            }
                                                        >
                                                            <div
                                                                className={classNames(
                                                                    active
                                                                        ? "bg-white text-textColor hover:bg-gray-50 hover:text-textColor"
                                                                        : "text-gray-700",
                                                                    "block px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 hover:text-textColor"
                                                                )}
                                                            >
                                                                Vaccination
                                                                Report
                                                            </div>
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>

                                <Link
                                    href={"/dashboard/chat"}
                                    onClick={onHandleForum}
                                >
                                    <div className="flex items-center justify-start gap-4 px-2 py-2 mb-2 transition duration-200 rounded-md cursor-pointer focus:bg-cream hover:bg-cream group">
                                        <BiChat className="text-2xl text-maroon group-hover:text-maroon" />
                                        <h3 className="text-sm font-semibold text-textColor group-hover:text-maroon mr-9">
                                            Forum
                                        </h3>
                                        <span class="inline-flex items-center justify-center w-2 h-2 p-2.5 ml-3 text-xs font-medium text-cream bg-maroon rounded-full">
                                            {newMessage}
                                        </span>
                                    </div>
                                </Link>
                            </div>

                            {/* logout Section */}
                            <div className="w-full pb-4 my-4 border-gray-100">
                                <Button
                                    onClick={handleLogout}
                                    className="flex items-center justify-start w-full gap-4 px-6 py-5 mb-2 transition duration-200 border rounded-md cursor-pointer border-shadowColor hover:border-cream hover:bg-cream group focus:border-cream focus:ring-0"
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
                    <div className="fixed top-0 z-20 w-1/2 p-6 ease-out delay-150 bg-white -left-96 -h-96 lg:top-4 lg:bottom-4 lg:left-4 lg:w-60 lg:rounded-xl peer-focus:left-0 peer:transition">
                        <div className="flex flex-col items-center justify-start">
                            {/* Logo */}
                            <Link href={"/dashboard"}>
                                <div className="w-full pb-4 text-base text-center border-b border-gray-100 cursor-pointer">
                                    <Image src={Logo} />
                                </div>
                            </Link>

                            {/* Sidebar items */}
                            <div className="w-full pb-4 my-4 border-gray-100">
                                <Link href={"/dashboard"}>
                                    <div className="flex items-center justify-start gap-4 px-2 py-2 mb-2 transition duration-200 rounded-md cursor-pointer focus:bg-cream active:bg-cream hover:bg-cream group">
                                        <MdOutlineDashboard className="text-2xl text-maroon group-hover:text-maroon" />
                                        <h3 className="text-sm font-semibold text-textColor group-hover:text-maroon">
                                            Dashboard
                                        </h3>
                                    </div>
                                </Link>
                                <Menu
                                    as="div"
                                    className="relative inline-block text-left"
                                >
                                    <div>
                                        <Menu.Button className="flex items-center justify-between gap-4 py-2 pl-2 pr-4 mb-2 transition duration-200 rounded-md cursor-pointer hover:bg-cream group ">
                                            <TbReportAnalytics className="text-2xl text-maroon group-hover:text-maroon" />
                                            <h3 className="text-sm font-semibold text-textColor group-hover:text-maroon mr-12">
                                                Report
                                            </h3>
                                            <svg
                                                aria-hidden="true"
                                                className="w-4 h-4"
                                                fill="maroon"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                    clip-rule="evenodd"
                                                ></path>
                                            </svg>
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items
                                            static
                                            className="absolute top-0 z-10 ml-56 origin-top-left bg-white rounded-md shadow-md w-44 focus:outline-none"
                                        >
                                            <div className="py-1">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            href={
                                                                "/dashboard/report/dailyReport"
                                                            }
                                                        >
                                                            <div
                                                                className={classNames(
                                                                    active
                                                                        ? "bg-white text-textColor hover:bg-gray-50 hover:text-textColor"
                                                                        : "text-gray-700",
                                                                    "block px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 hover:text-textColor"
                                                                )}
                                                            >
                                                                Daily Coop
                                                                Report
                                                            </div>
                                                        </Link>
                                                    )}
                                                </Menu.Item>

                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            href={
                                                                "/dashboard/report/detailReport"
                                                            }
                                                        >
                                                            <div
                                                                className={classNames(
                                                                    active
                                                                        ? "bg-white text-textColor hover:bg-gray-50 hover:text-textColor"
                                                                        : "text-gray-700",
                                                                    "block px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 hover:text-textColor"
                                                                )}
                                                            >
                                                                All Detail
                                                                Report
                                                            </div>
                                                        </Link>
                                                    )}
                                                </Menu.Item>

                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            href={
                                                                "/dashboard/report/vaccinationReport"
                                                            }
                                                        >
                                                            <div
                                                                className={classNames(
                                                                    active
                                                                        ? "bg-white text-textColor hover:bg-gray-50 hover:text-textColor"
                                                                        : "text-gray-700",
                                                                    "block px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 hover:text-textColor"
                                                                )}
                                                            >
                                                                Vaccination
                                                                Report
                                                            </div>
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>

                                <Link
                                    href={"/dashboard/chat"}
                                    onClick={onHandleForum}
                                >
                                    <div className="flex items-center justify-start gap-4 px-2 py-2 mb-2 transition duration-200 rounded-md cursor-pointer focus:bg-cream hover:bg-cream group">
                                        <BiChat className="text-2xl text-maroon group-hover:text-maroon" />
                                        <h3 className="text-sm font-semibold text-textColor group-hover:text-maroon mr-9">
                                            Forum
                                        </h3>
                                        <span class="inline-flex items-center justify-center w-2 h-2 p-2.5 ml-3 text-xs font-medium text-cream bg-maroon rounded-full">
                                            {newMessage}
                                        </span>
                                    </div>
                                </Link>
                                
                                <Link href={"/dashboard/vaccine"}>
                                    <div className="flex items-center justify-start gap-4 px-2 py-2 mb-2 transition duration-200 rounded-md cursor-pointer focus:bg-cream hover:bg-cream group">
                                        <TbVaccine className="text-2xl text-maroon group-hover:text-maroon" />
                                        <h3 className="text-sm font-semibold text-textColor group-hover:text-maroon">
                                            Vaccine
                                        </h3>
                                    </div>
                                </Link>
                                <Link href={"/dashboard/panen"}>
                                    <div className="flex items-center justify-start gap-4 px-2 py-2 mb-2 transition duration-200 rounded-md cursor-pointer focus:bg-cream hover:bg-cream group">
                                        <MdOutlineSell className="text-2xl text-maroon group-hover:text-maroon" />
                                        <h3 className="text-sm font-semibold text-textColor group-hover:text-maroon">
                                            Harvest
                                        </h3>
                                    </div>
                                </Link>
                                <Link href={"/dashboard/kandang"}>
                                    <div className="flex items-center justify-start gap-4 px-2 py-2 mb-2 transition duration-200 rounded-md cursor-pointer focus:bg-cream hover:bg-cream group">
                                        <RiHome2Line className="text-2xl text-maroon group-hover:text-maroon" />
                                        <h3 className="text-sm font-semibold text-textColor group-hover:text-maroon">
                                            Coop
                                        </h3>
                                    </div>
                                </Link>
                                <Link href={"/dashboard/pakan"}>
                                    <div className="flex items-center justify-start gap-4 px-2 py-2 mb-2 transition duration-200 rounded-md cursor-pointer focus:bg-cream hover:bg-cream group">
                                        <RiHandCoinLine className="text-2xl text-maroon group-hover:text-maroon" />
                                        <h3 className="text-sm font-semibold text-textColor group-hover:text-maroon">
                                            Feed
                                        </h3>
                                    </div>
                                </Link>
                                <Link href={"/dashboard/ternak"}>
                                    <div className="flex items-center justify-start gap-4 px-2 py-2 mb-2 transition duration-200 rounded-md cursor-pointer focus:bg-cream hover:bg-cream group">
                                        <FiFeather className="text-2xl text-maroon group-hover:text-maroon" />
                                        <h3 className="text-sm font-semibold text-textColor group-hover:text-maroon">
                                            Farm
                                        </h3>
                                    </div>
                                </Link>
                            </div>

                            {/* logout Section */}
                            <div className="w-full pb-4 my-4 border-gray-100">
                                <Button
                                    onClick={handleLogout}
                                    className="flex items-center justify-start w-full gap-4 px-6 py-5 mb-2 transition duration-200 border rounded-md cursor-pointer border-shadowColor hover:border-cream hover:bg-cream group focus:border-cream focus:ring-0"
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
                    <div className="fixed top-0 z-20 w-1/2 p-6 ease-out delay-150 bg-white -left-96 -h-96 lg:top-4 lg:bottom-4 lg:left-4 lg:w-60 lg:rounded-xl peer-focus:left-0 peer:transition">
                        <div className="flex flex-col items-center justify-start">
                            {/* Logo */}
                            <Link href={"/dashboard"}>
                                <div className="w-full pb-4 text-base text-center border-b border-gray-100 cursor-pointer">
                                    <Image src={Logo} />
                                </div>
                            </Link>

                            {/* Sidebar items */}
                            <div className="w-full pb-4 my-4 border-gray-100">
                                <Link href={"/dashboard"}>
                                    <div className="flex items-center justify-start gap-4 px-2 py-2 mb-2 transition duration-200 rounded-md cursor-pointer focus:bg-cream active:bg-cream hover:bg-cream group">
                                        <MdOutlineDashboard className="text-2xl text-maroon group-hover:text-maroon" />
                                        <h3 className="text-sm font-semibold text-textColor group-hover:text-maroon">
                                            Dashboard
                                        </h3>
                                    </div>
                                </Link>
                                <Menu
                                    as="div"
                                    className="relative inline-block text-left"
                                >
                                    <div>
                                        <Menu.Button className="flex items-center justify-between gap-4 py-2 pl-2 pr-4 mb-2 transition duration-200 rounded-md cursor-pointer hover:bg-cream group ">
                                            <TbReportAnalytics className="text-2xl text-maroon group-hover:text-maroon" />
                                            <h3 className="text-sm font-semibold text-textColor group-hover:text-maroon mr-12">
                                                Report
                                            </h3>
                                            <svg
                                                aria-hidden="true"
                                                className="w-4 h-4"
                                                fill="maroon"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                    clip-rule="evenodd"
                                                ></path>
                                            </svg>
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items
                                            static
                                            className="absolute top-0 z-10 ml-56 origin-top-left bg-white rounded-md shadow-md w-44 focus:outline-none"
                                        >
                                            <div className="py-1">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            href={
                                                                "/dashboard/report/dailyReport"
                                                            }
                                                        >
                                                            <div
                                                                className={classNames(
                                                                    active
                                                                        ? "bg-white text-textColor hover:bg-gray-50 hover:text-textColor"
                                                                        : "text-gray-700",
                                                                    "block px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 hover:text-textColor"
                                                                )}
                                                            >
                                                                Daily Coop
                                                                Report
                                                            </div>
                                                        </Link>
                                                    )}
                                                </Menu.Item>

                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            href={
                                                                "/dashboard/report/detailReport"
                                                            }
                                                        >
                                                            <div
                                                                className={classNames(
                                                                    active
                                                                        ? "bg-white text-textColor hover:bg-gray-50 hover:text-textColor"
                                                                        : "text-gray-700",
                                                                    "block px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 hover:text-textColor"
                                                                )}
                                                            >
                                                                All Detail
                                                                Report
                                                            </div>
                                                        </Link>
                                                    )}
                                                </Menu.Item>

                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            href={
                                                                "/dashboard/report/vaccinationReport"
                                                            }
                                                        >
                                                            <div
                                                                className={classNames(
                                                                    active
                                                                        ? "bg-white text-textColor hover:bg-gray-50 hover:text-textColor"
                                                                        : "text-gray-700",
                                                                    "block px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 hover:text-textColor"
                                                                )}
                                                            >
                                                                Vaccination
                                                                Report
                                                            </div>
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>

                                <Link
                                    href={"/dashboard/chat"}
                                    onClick={onHandleForum}
                                >
                                    <div className="flex items-center justify-start gap-4 px-2 py-2 mb-2 transition duration-200 rounded-md cursor-pointer focus:bg-cream hover:bg-cream group">
                                        <BiChat className="text-2xl text-maroon group-hover:text-maroon" />
                                        <h3 className="text-sm font-semibold text-textColor group-hover:text-maroon mr-9">
                                            Forum
                                        </h3>
                                        <span class="inline-flex items-center justify-center w-2 h-2 p-2.5 ml-3 text-xs font-medium text-cream bg-maroon rounded-full">
                                            {newMessage}
                                        </span>
                                    </div>
                                </Link>
                                <Link href={"/dashboard/user"}>
                                    <div className="flex items-center justify-start gap-4 px-2 py-2 mb-2 transition duration-200 rounded-md cursor-pointer focus:bg-cream hover:bg-cream group">
                                        <BiUser className="text-2xl text-maroon group-hover:text-maroon" />
                                        <h3 className="text-sm font-semibold text-textColor group-hover:text-maroon">
                                            User
                                        </h3>
                                    </div>
                                </Link>
                                <Link href={"/dashboard/vaccine"}>
                                    <div className="flex items-center justify-start gap-4 px-2 py-2 mb-2 transition duration-200 rounded-md cursor-pointer focus:bg-cream hover:bg-cream group">
                                        <TbVaccine className="text-2xl text-maroon group-hover:text-maroon" />
                                        <h3 className="text-sm font-semibold text-textColor group-hover:text-maroon">
                                            Vaccine
                                        </h3>
                                    </div>
                                </Link>
                                <Link href={"/dashboard/panen"}>
                                    <div className="flex items-center justify-start gap-4 px-2 py-2 mb-2 transition duration-200 rounded-md cursor-pointer focus:bg-cream hover:bg-cream group">
                                        <MdOutlineSell className="text-2xl text-maroon group-hover:text-maroon" />
                                        <h3 className="text-sm font-semibold text-textColor group-hover:text-maroon">
                                            Harvest
                                        </h3>
                                    </div>
                                </Link>
                                <Link href={"/dashboard/kandang"}>
                                    <div className="flex items-center justify-start gap-4 px-2 py-2 mb-2 transition duration-200 rounded-md cursor-pointer focus:bg-cream hover:bg-cream group">
                                        <RiHome2Line className="text-2xl text-maroon group-hover:text-maroon" />
                                        <h3 className="text-sm font-semibold text-textColor group-hover:text-maroon">
                                            Coop
                                        </h3>
                                    </div>
                                </Link>
                                <Link href={"/dashboard/pakan"}>
                                    <div className="flex items-center justify-start gap-4 px-2 py-2 mb-2 transition duration-200 rounded-md cursor-pointer focus:bg-cream hover:bg-cream group">
                                        <RiHandCoinLine className="text-2xl text-maroon group-hover:text-maroon" />
                                        <h3 className="text-sm font-semibold text-textColor group-hover:text-maroon">
                                            Feed
                                        </h3>
                                    </div>
                                </Link>
                                <Link href={"/dashboard/ternak"}>
                                    <div className="flex items-center justify-start gap-4 px-2 py-2 mb-2 transition duration-200 rounded-md cursor-pointer focus:bg-cream hover:bg-cream group">
                                        <FiFeather className="text-2xl text-maroon group-hover:text-maroon" />
                                        <h3 className="text-sm font-semibold text-textColor group-hover:text-maroon">
                                            Farm
                                        </h3>
                                    </div>
                                </Link>
                            </div>

                            {/* logout Section */}
                            <div className="w-full pb-4 my-4 border-gray-100">
                                <Button
                                    onClick={handleLogout}
                                    className="flex items-center justify-start w-full gap-4 px-6 py-5 mb-2 transition duration-200 border rounded-md cursor-pointer border-shadowColor hover:border-cream hover:bg-cream group focus:border-cream focus:ring-0"
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
