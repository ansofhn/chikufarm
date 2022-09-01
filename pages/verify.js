import React, { useEffect, useState } from "react";
import Head from "next/head";
import Button from "../components/Button";
import Input from "../components/Input";
import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

export default function verify() {
    const [code, setCode] = useState([]);
    const [username, setUsername] = useState("");
    const router = useRouter();

    const CheckUser = () => {
        try {
            if (localStorage.getItem("username") == null) {
                let timerInterval;
                Swal.fire({
                    position: "top",
                    html: "User Not Found!",
                    timer: 1500,
                    showConfirmButton: false,
                    timerProgressBar: true,
                    willClose: () => {
                        clearInterval(timerInterval);
                    },
                });
                router.push("/forgot");
            } else {
                setUsername(localStorage.getItem("username"));
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        CheckUser();
    }, []);

    const validCode = async () => {
        try {
            const response = await axios
                .post(
                    "https://chikufarm-app.herokuapp.com/api/auth/forgot-password",
                    code,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((res) => {
                    if (res.data.message === "Token valid") {
                        let timerInterval;
                        Swal.fire({
                            position: "top",
                            html: "Validation Success !",
                            timer: 1500,
                            showConfirmButton: false,
                            timerProgressBar: true,
                            willClose: () => {
                                clearInterval(timerInterval);
                            },
                        });
                        localStorage.setItem("userId", res.data.data.user.id);
                        localStorage.setItem("token", res.data.data.token);
                        localStorage.removeItem("username");
                        router.push("/reset");
                    } else {
                        let timerInterval;
                        Swal.fire({
                            position: "top",
                            html: "Invalid Code",
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
            let timerInterval;
            Swal.fire({
                position: "top",
                html: "Invalid Code",
                timer: 1500,
                showConfirmButton: false,
                timerProgressBar: true,
                willClose: () => {
                    clearInterval(timerInterval);
                },
            });
        }
    };

    const resendCode = async () => {
        try {
            const response = await axios
                .get(
                    `https://chikufarm-app.herokuapp.com/api/auth/forgot-password/${username}`
                )
                .then((res) => {
                    if (res.data === "Email sent") {
                        let timerInterval;
                        Swal.fire({
                            position: "top",
                            html: "Check Your Email",
                            timer: 1500,
                            showConfirmButton: false,
                            timerProgressBar: true,
                            willClose: () => {
                                clearInterval(timerInterval);
                            },
                        });

                        router.push("/verify");
                    }
                });
        } catch (error) {
            let timerInterval;
            Swal.fire({
                position: "top",
                html: "User Not Found!",
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
                <div className="flex items-center w-2/6 max-w-4xl bg-white shadow-md shadow-shadowColor rounded-xl">
                    <Head>
                        <title>Email Verification</title>
                    </Head>
                    <div className="px-4 py-4 rounded-2xl">
                        <div className="items-center p-8 text-center">
                            <h3 className="py-2 text-3xl font-bold text-textColor">
                                Get Your Code
                            </h3>
                            <p className="mx-8 text-sm font-medium text-textColor">
                                Please enter the 4 digit code that send to your
                                email address.
                            </p>
                            <Input
                                className="w-3/5 py-2 mt-10 text-sm text-center border-2 rounded-lg placeholder:text-center text-textColor border-cream focus:border-cream focus:ring-0"
                                placeholder="Enter Verification Code"
                                onChange={(e) => {
                                    setCode((pre) => {
                                        return {
                                            ...pre,
                                            token: e.target.value,
                                        };
                                    });
                                }}
                            />
                            <p className="py-2 text-sm font-medium text-textColor">
                                If you don't receive code?{" "}
                                <a
                                    onClick={resendCode}
                                    className="font-semibold text-maroon hover:text-maroon"
                                >
                                    Resend
                                </a>
                            </p>

                            <Button
                                className={"bg-maroon text-cream my-4 w-5/6"}
                                onClick={validCode}
                            >
                                Verify and Proceed
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
