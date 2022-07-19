import React from "react";
import Head from "next/head";
import Link from "next/link";
import Button from "../components/Button";

export default function GuestRegister({ header, title, children }) {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen antialiased tracking-tighter text-center">
            <div className="flex w-3/5 max-w-4xl shadow-md bg-cream rounded-2xl">
                <Head>
                    <title>{title}</title>
                </Head>
                {/* Login Section */}
                <div className="w-2/5 px-12 py-40 shadow-md bg-maroon text-cream rounded-tl-2xl rounded-bl-2xl">
                    <h2 className="mb-2 text-3xl font-bold">Dear Guest!</h2>
                    <p className="mb-10">
                        Lets have a look our farm management system
                    </p>
                    <Link href={"/login"}>
                        <Button
                            className={
                                "transition duration-300 border-2 px-6 py-2.5 border-cream text-cream hover:bg-cream hover:text-maroon"
                            }
                        >
                            Login
                        </Button>
                    </Link>
                </div>
                {/* Register Section */}
                <div className="w-3/5 p-5">
                    <div className="p-6 py-3 text-3xl font-bold text-maroon">
                        {header}
                    </div>
                    <div className="p-6 py-3">{children}</div>
                </div>
            </div>
        </div>
    );
}
