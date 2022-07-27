import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, LogoutIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Photo from "../public/pp.png";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const user = {
    username: "ansofhn",
};

export default function ProfileMenu() {
    return (
        <div className="flex justify-end md:mx-10 my-4 text-textColor ml-72">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex justify-center w-full rounded-md border shadow-sm px-4 py-2 bg-white text-sm font-medium text-textColor hover:bg-gray-50 focus:outline-none">
                        <div className="flex gap-2">
                            <div className="flex items-center mx-2">
                                <Image src={Photo} />
                            </div>
                            <div className="items-start">
                                <div className="text-xs font-light">
                                    Welcome back,
                                </div>
                                <div className="text-lg font-medium">
                                    {user.username}
                                </div>
                            </div>
                        </div>
                        <ChevronDownIcon
                            className="-mr-1 ml-20 self-center h-5 w-5"
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
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        href="#"
                                        className={classNames(
                                            active
                                                ? "bg-gray-100 text-gray-900"
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
                                        href="#"
                                        className={classNames(
                                            active
                                                ? "bg-gray-100 text-gray-900"
                                                : "text-gray-700",
                                            "block px-4 py-2 text-sm"
                                        )}
                                    >
                                        Change Password
                                    </a>
                                )}
                            </Menu.Item>
                            <form method="POST" action="#">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            type="submit"
                                            className={classNames(
                                                active
                                                    ? "bg-gray-100 text-gray-900"
                                                    : "text-gray-700",
                                                "block w-full text-left px-4 py-2 text-sm"
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
