import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Button from "../components/Button";
import Input from "../components/Input";
import ForgotImage from "../public/Secure data-pana.png";
import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

export default function forgot() {
    const [getCode, setGetCode] = useState([]);
    const router = useRouter();

    const getData = async () => {
        const username = getCode.userName;
        try {
            const response = await axios
                .get(
                    `https://chikufarm-app.herokuapp.com/api/auth/forgot-password/${username}`
                )
                .then((res) => {
                    const userName = username
                    localStorage.setItem("username", userName)
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
                <div className="flex items-center w-3/6 max-w-4xl bg-white shadow-md shadow-shadowColor rounded-xl">
                    <Head>
                        <title>Forgot Password</title>
                    </Head>
                    <div className="grid grid-cols-2 px-4 py-4 rounded-2xl">
                        <div>
                            <Image src={ForgotImage} />
                        </div>
                        <div className="items-center p-8 my-auto text-left 2xl:mx-16">
                            <h3 className="py-2 text-4xl font-bold text-textColor">
                                Forgot Password?
                            </h3>
                            <p className="mr-6 text-sm font-medium text-textColor">
                                Enter the email address associated with your
                                account
                            </p>
                            <Input
                                className="w-full px-4 py-2 mt-10 text-sm border-2 rounded-lg text-textColor border-cream focus:border-cream focus:ring-0"
                                placeholder="Enter Username"
                                onChange={(e) => {
                                    setGetCode((pre) => {
                                        return {
                                            ...pre,
                                            userName: e.target.value,
                                        };
                                    });
                                }}
                            />

                            <Button
                                className={"bg-maroon text-cream my-4 w-full"}
                                onClick={getData}
                            >
                                Recover Password
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
