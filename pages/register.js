import React, { useState } from "react";
import Link from "next/link";
import Button from "../components/Button";
import Input from "../components/Input";
import Label from "../components/Label";
import RegisterLayout from "../layouts/RegisterLayout";

import axios from "axios";
import Router, { useRouter } from "next/router";

export default function Register() {
    const [fullName, setFullName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();
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
                    "https://d4dd-101-255-119-166.ap.ngrok.io/users",
                    data,
                    {
                        headers: { "content-type": "application/json" },
                    }
                )
                .then((respond) => {
                    if (respond.status === 201 || 200) {
                        window.alert("sukses registrasi");
                        router.push("/login");
                    }
                });
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
    const onChangePassword = (e) => {
        setPassword(e.target.value);
        console.log(password);
    };

    return (
        <form>
            <div className="mb-6">
                <Label forInput="fullname"></Label>
                <Input
                    name="fullname"
                    id="fullname"
                    placeholder="Fullname"
                    onChange={onChangeFullname}
                />
            </div>
            <div className="mb-6">
                <Label forInput="username"></Label>
                <Input
                    name="username"
                    id="username"
                    placeholder="Username"
                    onChange={onChangeUsername}
                />
            </div>
            <div className="mb-6">
                <Label forInput="email"></Label>
                <Input
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
                    name="phone"
                    id="phone"
                    placeholder="Phone"
                    onChange={onChangePhone}
                />
            </div>
            <div className="mb-6">
                <Label forInput="password"></Label>
                <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={onChangePassword}
                />
            </div>

            <Button
                onClick={onFinish}
                className={
                    "transition duration-300 w-full text-semibold px-6 py-2.5 border-2 border-maroon text-maroon hover:bg-maroon hover:text-cream"
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
