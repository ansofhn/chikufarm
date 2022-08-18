import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Button from "../components/Button";
import Input from "../components/Input";
import resetPw from "../public/Secure data-bro.png";
import Label from "../components/Label";

export default function resetPassword() {
    return (
        <div className="flex flex-col items-center justify-center w-full antialiased tracking-tighter text-center md:bg-gray-100 md:min-h-screen">
            <div className="flex items-center w-3/6 max-w-4xl shadow-md shadow-shadowColor bg-white rounded-xl">
                <Head>
                    <title>Reset Password</title>
                </Head>
                <div className="grid grid-cols-2 py-4 px-4 rounded-2xl">
                    <div className="items-center p-2 my-auto mx-auto">
                        <Image src={resetPw} />
                    </div>
                    <div className="p-8 items-center text-left">
                        <h3 className="text-2xl py-2 font-bold text-textColor">
                            Enter New Password
                        </h3>
                        <p className="text-sm font-medium text-textColor">
                            Your new password must be different from previously
                            used password
                        </p>
                        <div class="my-6">
                            <Label
                                for="password"
                                class="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Password
                            </Label>
                            <Input
                                type="password"
                                id="password"
                                className="rounded-lg text-textColor w-full py-2 px-4 text-sm border-cream focus:border-2 focus:border-cream focus:ring-0"
                                placeholder="•••••••••"
                                required
                            />
                        </div>
                        <div class="mt-2">
                            <Label
                                for="confirm_password"
                                class="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Confirm password
                            </Label>
                            <Input
                                type="password"
                                id="confirm_password"
                                className="rounded-lg text-textColor w-full py-2 px-4 text-sm border-cream focus:border-maroon focus:ring-0"
                                placeholder="•••••••••"
                                required
                            />
                        </div>
                        <Link href={"/login"}>
                            <Button
                                className={"bg-maroon text-cream my-4 w-full"}
                            >
                                Continue
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
