import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Image from "next/image";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function ProfileMenu() {
    const [dataUser, setDataUser] = useState([]);
    const [role, setRole] = useState([]);
    const router = useRouter();

    const handleLogout = (e) => {
        e.preventDefault();
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
                    setDataUser(res.data.data);
                    setRole(res.data.data.role.roleName);
                });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="flex justify-end my-4 ml-72 md:mx-10 text-textColor 2xl:mx-6">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex justify-center px-2.5 py-2.5 mr-2 w-full text-sm font-medium bg-white rounded-lg shadow-sm text-textColor focus:outline-none">
                        <div className="flex gap-2">
                            <div className="flex items-center mr-2">
                                <Image
                                    className="rounded-lg bg-cream"
                                    loader={() => dataUser.profilePicture}
                                    priority={true}
                                    unoptimized={true}
                                    src={`https://chikufarm-app.herokuapp.com/api/users/profile-picture/${dataUser.profilePicture}`}
                                    width={40}
                                    height={40}
                                />
                            </div>
                            <div className="items-start">
                                <div className="font-medium text-start">
                                    {dataUser.userName}
                                </div>
                                <div className="text-xs font-light text-left">
                                    {role}
                                </div>
                            </div>
                        </div>
                        <ChevronDownIcon
                            className="self-center w-5 h-5 ml-20 -mr-1"
                            aria-hidden="true"
                        />
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
                    <Menu.Items className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white rounded-lg shadow-lg focus:outline-none">
                        <div className="py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <Link
                                        href={
                                            "/dashboard/profile/accountSetting"
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
                                            Update Profile
                                        </div>
                                    </Link>
                                )}
                            </Menu.Item>

                            <Menu.Item>
                                {({ active }) => (
                                    <Link
                                        href={
                                            "/dashboard/profile/passwordSetting"
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
                                            Change Password
                                        </div>
                                    </Link>
                                )}
                            </Menu.Item>
                            <form method="POST" action="/">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={handleLogout}
                                            type="submit"
                                            className={classNames(
                                                active
                                                    ? "bg-white text-textColor hover:bg-gray-50"
                                                    : "text-gray-700",
                                                "block px-4 py-2 w-full text-sm text-left"
                                            )}
                                        >
                                            Sign out
                                        </button>
                                    )}
                                </Menu.Item>
                            </form>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}
