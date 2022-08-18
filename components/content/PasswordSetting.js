import { IdcardOutlined, LockOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import Link from "next/link";
import Button from "../Button";
import Label from "../Label";
import Input from "../Input";

export default function PasswordSetting() {
    const [fullName, setFullName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const onFinish = async () => {
        try {
            const data = {
                fullName: fullName,
                username: userName,
                email: email,
                phone: phone,
                password: password,
                role: "guest",
            };
            console.log(data);
        } catch (e) {
            e.message;
        }
    };

    return (
        <div className="lg:w-3/4 lg:ml-72">
            <div className="p-4 mb-4 text-lg font-bold text-textColor">
                Password Setting
                <p className="text-sm font-normal text-textColor">
                    Change your password to keep your account safe
                </p>
            </div>

            <div className="p-10 bg-white rounded-lg">
                <div className="grid grid-cols-4 gap-4">
                    <div className="grid grid-rows-2 h-48">
                        <Link href={"/dashboard/profile/accountSetting"}>
                            <Button className="mr-4 text-textColor font-semibold">
                                <IdcardOutlined className="text-center text-xl mr-4" />
                                Account
                            </Button>
                        </Link>
                        <Link href={"/dashboard/profile/passwordSetting"}>
                            <Button className="mr-4 text-textColor font-semibold">
                                <LockOutlined className="text-center text-xl mr-4" />
                                Password
                            </Button>
                        </Link>
                    </div>
                    <div className="col-span-3 p-5 border-l border-shadowColor">
                        <div className="ml-6 text-lg text-textColor font-bold">
                            Set Your Password
                            <p className="text-sm font-light text-textColor">
                                In order to keep your account safe you need to
                                create a strong password
                            </p>
                        </div>

                        <div className="mt-10 ml-6">
                            <div class="mb-6">
                                <Label
                                    for="password"
                                    class="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Password
                                </Label>
                                <Input
                                    type="password"
                                    id="password"
                                    className="rounded-lg text-textColor w-full py-2 px-4 text-sm border-cream focus:border-maroon focus:ring-0"
                                    placeholder="•••••••••"
                                    required
                                />
                            </div>
                            <div class="mb-6">
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
                            <div className="mt-5 col-span-2">
                                <Button
                                    className="w-full rounded-lg bg-cream text-maroon text-sm font-semibold"
                                    key="submit"
                                    type="submit"
                                    onClick={onFinish}
                                >
                                    Change my password
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
