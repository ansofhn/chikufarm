import { IdcardOutlined, LockOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import Link from "next/link";
import Button from "../Button";
import Label from "../Label";
import Input from "../Input";
import axios from "axios";
import Swal from "sweetalert2";

export default function PasswordSetting() {
    const [password, setPassword] = useState([]);

    const changePassword = async () => {
        const change = {
            password: password.passwordFirst,
        };
        try {
            const response = await axios
                .post(
                    "https://chikufarm-app.herokuapp.com/api/users/change-password",
                    change,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem(
                                "access_token"
                            )}`,
                        },
                    }
                )
                .then((res) => {
                    console.log(res.data);
                    if (res.data.message === "Password changed") {
                        let timerInterval;
                        Swal.fire({
                            position: "top",
                            html: "Password Changed !",
                            timer: 1500,
                            showConfirmButton: false,
                            timerProgressBar: true,
                            willClose: () => {
                                clearInterval(timerInterval);
                            },
                        });
                    } else {
                        let timerInterval;
                        Swal.fire({
                            position: "top",
                            html: "Failed to Changed Password",
                            timer: 1500,
                            showConfirmButton: false,
                            timerProgressBar: true,
                            willClose: () => {
                                clearInterval(timerInterval);
                            },
                        });
                    }
                });
        } catch (error) {
            console.log(error);
        }
    };

    const checkPassword = () => {
        if (password.passwordFirst === password.passwordLast) {
            changePassword();
        } else {
            let timerInterval;
            Swal.fire({
                position: "top",
                html: "Password Doesn't Match, Input Again !",
                timer: 1500,
                showConfirmButton: false,
                timerProgressBar: true,
                willClose: () => {
                    clearInterval(timerInterval);
                },
            });
        }
    };

    return (
        <div className="lg:w-3/4 lg:ml-72 2xl:w-10/12">
            <div className="p-4 mb-4 text-lg font-bold text-textColor">
                Password Setting
                <p className="text-sm font-normal text-textColor">
                    Change your password to keep your account safe
                </p>
            </div>

            <div className="p-10 bg-white rounded-xl">
                <div className="grid grid-cols-4 gap-4">
                    <div className="grid h-48 grid-rows-2">
                        <Link href={"/dashboard/profile/accountSetting"}>
                            <Button className="mr-4 font-semibold text-textColor">
                                <IdcardOutlined className="mr-4 text-xl text-center" />
                                Account
                            </Button>
                        </Link>
                        <Link href={"/dashboard/profile/passwordSetting"}>
                            <Button className="mr-4 font-semibold text-textColor">
                                <LockOutlined className="mr-4 text-xl text-center" />
                                Password
                            </Button>
                        </Link>
                    </div>
                    <div className="col-span-3 p-5 border-l border-shadowColor">
                        <div className="ml-6 text-lg font-bold text-textColor">
                            Set Your Password
                            <p className="text-sm font-light text-textColor">
                                In order to keep your account safe you need to
                                create a strong password
                            </p>
                        </div>

                        <div className="mt-10 ml-6">
                            <div className="my-6">
                                <Label
                                    for="password"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Password
                                </Label>
                                <Input
                                    type="password"
                                    id="password"
                                    className="w-full px-4 py-2 text-sm rounded-lg text-textColor border-cream focus:border-2 focus:border-cream focus:ring-0"
                                    placeholder="••••••••"
                                    onChange={(e) => {
                                        setPassword((pre) => {
                                            return {
                                                ...pre,
                                                passwordFirst: e.target.value,
                                            };
                                        });
                                    }}
                                    required
                                />
                            </div>
                            <div className="mt-2">
                                <Label
                                    for="confirm_password"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Confirm password
                                </Label>
                                <Input
                                    type="password"
                                    id="confirm_password"
                                    className="w-full px-4 py-2 text-sm rounded-lg text-textColor border-cream focus:border-maroon focus:ring-0"
                                    placeholder="••••••••"
                                    onChange={(e) => {
                                        setPassword((pre) => {
                                            return {
                                                ...pre,
                                                passwordLast: e.target.value,
                                            };
                                        });
                                    }}
                                    required
                                />
                            </div>
                            <div className="col-span-2 mt-5">
                                <Button
                                    className="w-full text-sm font-semibold rounded-lg bg-cream text-maroon"
                                    key="submit"
                                    type="submit"
                                    onClick={checkPassword}
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
