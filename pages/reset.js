import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Button from "../components/Button";
import Input from "../components/Input";
import Reset from "../public/Mobile login-pana.png";
import Label from "../components/Label";
import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

export default function reset() {
    const [userId, setUserId] = useState([]);
    const [code, setCode] = useState([]);
    const [password, setPassword] = useState([]);
    const router = useRouter();

    const CheckUser = () => {
        try {
            if (
                localStorage.getItem("token") == null &&
                localStorage.getItem("userId") == null
            ) {
                let timerInterval;
                Swal.fire({
                    position: "top",
                    html: "Enter Username First!",
                    timer: 1500,
                    showConfirmButton: false,
                    timerProgressBar: true,
                    willClose: () => {
                        clearInterval(timerInterval);
                    },
                });
                router.push("/forgot");
            } else {
                setCode((pre) => {
                    return { ...pre, token: localStorage.getItem("token") };
                });
                setUserId((pre) => {
                    return { ...pre, userId: localStorage.getItem("userId") };
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        CheckUser();
    }, []);

    const resetPassword = async () => {
        const reset = {
            token: code.token,
            userId: userId.userId,
            password: password.passwordFirst,
        };
        try {
            const response = await axios
                .post(
                    "https://chikufarm-app.herokuapp.com/api/auth/reset-password",
                    reset,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((res) => {
                    console.log(res.data);
                    if (res.data === "password updated") {
                        let timerInterval;
                        Swal.fire({
                            position: "top",
                            html: "Password Updated !",
                            timer: 1500,
                            showConfirmButton: false,
                            timerProgressBar: true,
                            willClose: () => {
                                clearInterval(timerInterval);
                            },
                        });
                        localStorage.removeItem("userId");
                        localStorage.removeItem("token");
                        router.push("/login");
                    } else {
                        let timerInterval;
                        Swal.fire({
                            position: "top",
                            html: "Password Update Failed !",
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
            resetPassword();
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

    const onChangeForm = (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={onChangeForm} method="POST">
            <div className="flex flex-col items-center justify-center w-full antialiased tracking-tighter text-center md:bg-gray-100 md:min-h-screen">
                <div className="flex items-center w-3/6 max-w-4xl bg-white shadow-md shadow-shadowColor rounded-xl">
                    <Head>
                        <title>Reset Password</title>
                    </Head>
                    <div className="grid grid-cols-2 px-4 py-4 my-auto rounded-2xl">
                        <div className="items-center pt-4 mx-auto my-auto">
                            <Image src={Reset} />
                        </div>
                        <div className="items-center p-8 my-auto text-left 2xl:mx-4">
                            <h3 className="py-2 text-2xl font-bold text-textColor">
                                Enter New Password
                            </h3>
                            <p className="text-sm font-medium text-textColor">
                                Your new password must be different from
                                previously used password
                            </p>
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

                            <Button
                                className={"bg-maroon text-cream my-4 w-full"}
                                onClick={checkPassword}
                            >
                                Continue
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}