import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../public/Logo.png";
import Button from "../components/Button";
import Input from "../components/Input";
import Label from "../components/Label";
import LoginLayout from "../layouts/LoginLayout";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import Link from "next/link";

export default function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const CheckToken = () => {
        try {
            if (localStorage.getItem("access_token") !== null) {
                localStorage.removeItem("access_token");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        CheckToken();
    }, []);

    const onFinish = async () => {
        try {
            const dataLogin = {
                username: userName,
                password: password,
            };
            console.log(dataLogin);
            let response = await axios
                .post(
                    "https://chikufarm-app.herokuapp.com/api/auth/login",
                    dataLogin,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((respond) => {
                    console.log(respond.data.access_token);
                    const access_token = respond.data.access_token;
                    localStorage.setItem("access_token", access_token);
                    if (respond.status === 201 || 200) {
                        let timerInterval;
                        Swal.fire({
                            position: "top",
                            html: "Login Success !",
                            timer: 1500,
                            showConfirmButton: false,
                            timerProgressBar: true,
                            willClose: () => {
                                clearInterval(timerInterval);
                            },
                        });
                        router.push("/dashboard");
                    }
                });
        } catch (e) {
            e.message;
            let timerInterval;
            Swal.fire({
                position: "top",
                html: "Login Failed !",
                timer: 1500,
                showConfirmButton: false,
                timerProgressBar: true,
                willClose: () => {
                    clearInterval(timerInterval);
                },
            });
        }
    };

    const onChangeUsername = (e) => {
        setUserName(e.target.value);
        console.log(userName);
    };
    const onChangePassword = (e) => {
        setPassword(e.target.value);
        console.log(password);
    };
    const onChangeForm = (e) => {
        e.preventDefault();
    };
    
    return (
        <form onSubmit={onChangeForm} method="POST">
            <div className="mb-6">
                <Label forInput="username"></Label>
                <Input
                    className="rounded-lg text-textColor shadow-sm shadow-shadowColor w-full py-2 px-4 text-sm border-none focus:ring-0"
                    name="username"
                    id="username"
                    placeholder="Username"
                    onChange={onChangeUsername}
                />
            </div>
            <div className="mb-6">
                <Label forInput="password"></Label>
                <Input
                    className="rounded-lg text-textColor shadow-sm shadow-shadowColor w-full py-2 px-4 text-sm border-none focus:ring-0"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={onChangePassword}
                />
            </div>
            <div className="flex items-center justify-between mb-5">
                <Button
                    type="submit"
                    onClick={onFinish}
                    className={
                        "transition duration-300 text-semibold px-6 py-2.5 ml-1 border-2 border-maroon text-maroon hover:bg-maroon hover:text-cream"
                    }
                >
                    Login
                </Button>
                <Link href={"/forgot"}>
                    <a className="mr-2 hover:text-maroon text-textColor">
                        Forgot password?
                    </a>
                </Link>
            </div>
        </form>
    );
}

Login.getLayout = (page) => (
    <LoginLayout header={<Image src={Logo} />} title="Login" children={page} />
);
