import { IdcardOutlined, LockOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import Link from "next/link";
import Button from "../Button";
import Label from "../Label";
import Input from "../Input";
import UploadImage from "../UploadImage";

export default function ProfileSetting() {
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

    const onChangeFullname = (e) => {
        setFullName(e.target.value);
        console.log(fullName);
    };
    const onChangeUsername = (e) => {
        setUserName(e.target.value);
        console.log(userName);
    };
    const onChangeEmail = (e) => {
        setEmail(e.target.value);
        console.log(email);
    };
    const onChangePhone = (e) => {
        setPhone(e.target.value);
        console.log(phone);
    };

    return (
        <div className="my-4 lg:w-3/4 lg:ml-72">
            <div className="p-4 text-lg font-bold text-textColor">
                Account Setting
                <p className="text-sm font-normal text-textColor">
                    Change your profile and account settings
                </p>
            </div>

            <div className="p-10 bg-white rounded-lg">
                <div className="grid grid-cols-4 gap-4">
                    <div className="border-r border-shadowColor">
                        <Link href={"/dashboard/profile/accountSetting"}>
                            <Button className="my-4 text-textColor font-semibold">
                                <IdcardOutlined className="text-center text-xl mr-4" />
                                Account
                            </Button>
                        </Link>
                        <Link href={"/dashboard/profile/passwordSetting"}>
                            <Button className="my-4 text-textColor font-semibold">
                                <LockOutlined className="text-center text-xl mr-4" />
                                Password
                            </Button>
                        </Link>
                    </div>
                    <div className="col-span-3 p-5">
                        <div className="text-lg text-textColor font-bold">
                            General Info
                        </div>
                        <UploadImage/>
                        <div className="mt-10 grid-cols-2 grid gap-4">
                            <div className="mb-4">
                                <Label forInput="fullname">Fullname</Label>
                                <Input
                                    className="rounded-lg text-textColor w-full py-2 px-4 text-sm border-cream focus:border-maroon focus:ring-0"
                                    name="fullname"
                                    id="fullname"
                                    onChange={onChangeFullname}
                                />
                            </div>
                            <div className="mb-4">
                                <Label forInput="username">Username</Label>
                                <Input
                                    className="rounded-lg text-textColor w-full py-2 px-4 text-sm border-cream focus:border-maroon focus:ring-0"
                                    name="username"
                                    id="username"
                                    onChange={onChangeUsername}
                                />
                            </div>
                            <div className="mb-4">
                                <Label forInput="email">Email</Label>
                                <Input
                                    className="rounded-lg text-textColor w-full py-2 px-4 text-sm border-cream focus:border-maroon focus:ring-0"
                                    type="email"
                                    name="email"
                                    id="email"
                                    onChange={onChangeEmail}
                                />
                            </div>
                            <div className="mb-4">
                                <Label forInput="phone">Phone</Label>
                                <Input
                                    className="rounded-lg text-textColor w-full py-2 px-4 text-sm border-cream focus:border-maroon focus:ring-0"
                                    name="phone"
                                    id="phone"
                                    onChange={onChangePhone}
                                />
                            </div>
                            <div className="mt-5 col-span-2">
                                <Button
                                    className={
                                        "w-full rounded-lg bg-cream text-maroon text-sm font-semibold"
                                    }
                                >
                                    Save Change
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
