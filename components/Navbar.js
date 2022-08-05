import React from 'react'
import NavLink from './Navlink'
import Image from "next/image"
import Button from './Button';
import Link from 'next/link'
import Logo from "../public/logo-navbar.png"

export default function Navbar() {

    const auth = {
        check: false,
        user: {
            name: "Ansof Habibunnadjar",
        },
    };

  return (
    <div>
      <div className="fixed top-0 z-10 w-full bg-white border-b border-gray-100">
                <div className="container">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center py-2 gap-x-2">
                            <Image src={Logo} />
                        </div>
                        <div className="flex items-center gap-x-2">
                            <NavLink url={"/"}>Home</NavLink>
                            <NavLink url={"/about"}>About</NavLink>
                            <NavLink url={"/contact"}>Contact</NavLink>
                        </div>
                        {auth.check ? (
                            <div className="flex items-center gap-x-2">
                                <NavLink url={"#"}>{auth.user.name}</NavLink>
                            </div>
                        ) : (
                            <div className="flex items-center gap-x-2">
                                <Link href={"/login"}>
                                    <Button
                                        className={
                                            "transition duration-300 text-semibold px-4 py-2 bg-cream text-maroon"
                                        }
                                    >
                                        Login
                                    </Button>
                                </Link>
                                <Link href={"/register"}>
                                    <Button
                                        className={
                                            "transition duration-300 text-semibold px-4 py-2 bg-maroon text-cream"
                                        }
                                    >
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
    </div>
  )
}
