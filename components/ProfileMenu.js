import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Photo from "../public/pp.png";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useRouter } from "next/router";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function ProfileMenu() {
    const [dataUser, setDataUser] = useState([]);
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
                });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="flex justify-end my-4 ml-72 md:mx-10 text-textColor">
            <Menu as="div" className="inline-block relative text-left">
                <div>
                    <Menu.Button className="inline-flex justify-center px-4 py-2 w-full text-sm font-medium bg-white rounded-lg shadow-sm text-textColor focus:outline-none">
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
                                    alt=""
                                />
                            </div>
                            <div className="items-start">
                                <div className="text-xs font-light">
                                    Welcome back,
                                </div>
                                <div className="font-medium text-start">
                                    {dataUser.userName}
                                </div>
                            </div>
                        </div>
                        <ChevronDownIcon
                            className="self-center -mr-1 ml-20 w-5 h-5"
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 bg-white rounded-lg shadow-lg origin-top-right focus:outline-none">
                        <div className="py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        href="/dashboard/profile/accountSetting"
                                        className={classNames(
                                            active
                                                ? "bg-white text-textColor hover:bg-gray-50 hover:text-textColor"
                                                : "text-gray-700",
                                            "block px-4 py-2 text-sm"
                                        )}
                                    >
                                        Update Profile
                                    </a>
                                )}
                            </Menu.Item>

                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        href="dashboard/profile/passwordSetting"
                                        className={classNames(
                                            active
                                                ? "bg-white text-textColor hover:bg-gray-50 hover:text-textColor"
                                                : "text-gray-700",
                                            "block px-4 py-2 text-sm"
                                        )}
                                    >
                                        Change Password
                                    </a>
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
