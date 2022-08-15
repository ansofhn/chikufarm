import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Label from "../components/Label";
import RegisterLayout from "../layouts/RegisterLayout";
import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from "next/router";

export default function Register() {
    const [fullName, setFullName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
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
            const data = {
                fullName: fullName,
                userName: userName,
                email: email,
                phone: phone,
                password: password,
            };
            console.log(data);
            let response = await axios
                .post(
                    "https://chikufarm-app.herokuapp.com/api/users/register",
                    data,
                    {
                        headers: { "content-type": "application/json" },
                    }
                )
                .then((respond) => {
                    if (respond.status === 201 || 200) {
                        let timerInterval;
                        Swal.fire({
                            position: "top",
                            html: "Register Success !",
                            timer: 1500,
                            showConfirmButton: false,
                            timerProgressBar: true,
                            willClose: () => {
                                clearInterval(timerInterval);
                            },
                        });
                        router.push("/login");
                    }
                });
        } catch (e) {
            e.message;
            let timerInterval;
            Swal.fire({
                position: "top",
                html: "Register Failed !",
                timer: 1500,
                showConfirmButton: false,
                timerProgressBar: true,
                willClose: () => {
                    clearInterval(timerInterval);
                },
            });
        }
    };

    const onChangeFullname = (e) => {
        setFullName(e.target.value);
    };
    const onChangeUsername = (e) => {
        setUserName(e.target.value);
    };
    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const onChangePhone = (e) => {
        setPhone(e.target.value);
    };
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const onChangeForm = (e) => {
        e.preventDefault();
    };
    return (
        <form onSubmit={onChangeForm} method="POST">
            <div className="mb-6">
                <Label forInput="fullname"></Label>
                <Input
                    className="rounded-lg text-textColor shadow-sm shadow-shadowColor w-full py-2 px-4 text-sm border-none focus:ring-0"
                    name="fullname"
                    id="fullname"
                    placeholder="Fullname"
                    onChange={onChangeFullname}
                />
            </div>
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
                <Label forInput="email"></Label>
                <Input
                    className="rounded-lg text-textColor shadow-sm shadow-shadowColor w-full py-2 px-4 text-sm border-none focus:ring-0"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={onChangeEmail}
                />
            </div>
            <div className="mb-6">
                <Label forInput="phone"></Label>
                <Input
                    className="rounded-lg text-textColor shadow-sm shadow-shadowColor w-full py-2 px-4 text-sm border-none focus:ring-0"
                    name="phone"
                    id="phone"
                    placeholder="Phone"
                    onChange={onChangePhone}
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

            <Button
                type="submit"
                onClick={onFinish}
                className={
                    "transition duration-300 w-full font-semibold px-6 py-2.5 border-2 border-maroon text-maroon hover:bg-maroon hover:text-cream"
                }
            >
                Sign Up
            </Button>
        </form>
    );
}

Register.getLayout = (page) => (
    <RegisterLayout
        header={"Create Guest Account"}
        title="Register"
        children={page}
    />
);
