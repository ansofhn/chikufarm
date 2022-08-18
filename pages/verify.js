import React from "react";
import Head from "next/head";
import Link from 'next/link'
import Button from "../components/Button";
import Input from "../components/Input";

export default function verify() {
    return (
        <div className="flex flex-col items-center justify-center w-full antialiased tracking-tighter text-center md:bg-gray-100 md:min-h-screen">
            <div className="flex items-center w-2/6 max-w-4xl shadow-md shadow-shadowColor bg-white rounded-xl">
                <Head>
                    <title>Email Verification</title>
                </Head>
                <div className="py-4 px-4 rounded-2xl">
                    <div className="p-8 items-center text-center">
                        <h3 className="text-3xl py-2 font-bold text-textColor">
                            Get Your Code
                        </h3>
                        <p className="text-sm mx-8 font-medium text-textColor">
                            Please enter the 4 digit code that send to your
                            email address.
                        </p>
                        <Input
                            className="rounded-lg placeholder:text-center text-center text-textColor w-3/5 py-2 mt-10 text-sm border-cream border-2 focus:border-cream focus:ring-0"
                            placeholder="Enter Verification Code"
                            type="email"
                        />
                        <p className="text-sm py-2 font-medium text-textColor">
                            If you don't receive code?{" "}
                            <a
                                href="#"
                                className="text-maroon font-semibold hover:text-maroon"
                            >
                                Resend
                            </a>
                        </p>
                        <Link href={"/resetPassword"}>
                            <Button
                                className={"bg-maroon text-cream my-4 w-5/6"}
                            >
                                Verify and Proceed
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
