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
                    console.log(res.data);
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
            console.log(error);
        }
    };

    const resendCode = async () => {
        try {
            const response = await axios
                .get(
                    `https://chikufarm-app.herokuapp.com/api/auth/forgot-password/${username}`
                )
                .then((res) => {
                    console.log(res.data);
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
            console.log(error);
        }
    };

    const onChangeForm = (e) => {
        e.preventDefault();
    };
    return (
        <form onSubmit={onChangeForm} method="POST">
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
                                onChange={(e) => {
                                    setCode((pre) => {
                                        return {
                                            ...pre,
                                            token: e.target.value,
                                        };
                                    });
                                }}
                            />
                            <p className="text-sm py-2 font-medium text-textColor">
                                If you don't receive code?{" "}
                                <a
                                    onClick={resendCode}
                                    className="text-maroon font-semibold hover:text-maroon"
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