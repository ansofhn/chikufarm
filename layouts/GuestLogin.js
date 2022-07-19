import React from "react";
import Head from "next/head";
import Link from "next/link";
import Button from "../components/Button";

export default function GuestLogin({ header, title, children }) {
    return (
        <div className="flex flex-col items-center justify-center w-full antialiased tracking-tighter text-center md:bg-white md:min-h-screen">
            <div className="flex items-center w-3/5 max-w-4xl shadow-md bg-cream rounded-2xl">
                <Head>
                    <title>{title}</title>
                </Head>
                {/* Login Section */}
                <div className="w-3/5 p-5 ">
                    <div className="p-6 py-3 text-3xl font-bold text-maroon">
                        {header}
                    </div>
                    <div className="p-6 py-5">{children}</div>
                </div>
                {/* Sign Up Section */}
                <div className="w-2/5 px-12 shadow-md bg-maroon text-cream rounded-tr-2xl rounded-br-2xl py-36">
                    <h2 className="mb-2 text-3xl font-bold">
                        Let's be Partner!
                    </h2>
                    <p className="mb-10">
                        Create a guest account and start journey with us
                    </p>
                    <Link href={"/register"}>
                        <Button
                            className={
                                "transition duration-300 border-2 px-6 py-2.5 border-cream text-cream hover:bg-cream hover:text-maroon"
                            }
                        >
                            Sign Up
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
