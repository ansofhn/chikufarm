import React from "react";
import NavLink from "./NavLink";
import Image from "next/image";
import Button from "./Button";
import Link from "next/link";
import Logo from "../public/logo-navbar.png";

export default function Navbar() {
    return (
        <>
            <div className="fixed top-0 z-10 w-full bg-white border-b border-gray-100">
                <div className="container">
                    <div className="flex items-center justify-between">
                        <Link href={"/"}>
                            <div className="flex items-center py-2 gap-x-2 cursor-pointer">
                                <Image src={Logo} />
                            </div>
                        </Link>

                        <div className="flex items-center gap-x-2">
                            <NavLink url={"/"}>Home</NavLink>
                            <NavLink url={"/about"}>About</NavLink>
                            <NavLink url={"/contact"}>Contact</NavLink>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <Link href={"/login"}>
                                <Button
                                    className={
                                        "transition duration-300 text-sm font-semibold px-4 py-2 bg-cream text-maroon"
                                    }
                                >
                                    Login
                                </Button>
                            </Link>
                            <Link href={"/register"}>
                                <Button
                                    className={
                                        "transition duration-300 text-sm font-semibold px-3 py-2 bg-maroon text-cream"
                                    }
                                >
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
