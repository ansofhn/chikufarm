import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../public/logo.png";
import Button from "../components/Button";
import Input from "../components/Input";
import Label from "../components/Label";
import LoginLayout from "../layouts/LoginLayout";
import { useRouter } from "next/router";

export default function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();
    const onFinish = async () => {
        try {
            const data = {
                userName: userName,
                password: password,
            };
            let response = await axios
                .post("https://4f42-101-255-119-166.ap.ngrok.io/auth/login", data)
                .then((respond) => {
                    console.log(respond);
                    if (respond.status === 201 || 200) {
                        window.alert("Sukses Login");
                        router.push("/dashboard");
                    }
                });
            console.log(data)
        } catch (e) {
            e.message;
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

    return (
        <form>
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
                <Label forInput="password"></Label>
                <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={onChangePassword}
                />
            </div>
            <div className="flex items-center justify-between mb-5">
                <Link href={"#"}>
                    <Button
                        onClick={onFinish}
                        className={
                            "transition duration-300 text-semibold px-6 py-2.5 ml-1 border-2 border-maroon text-maroon hover:bg-maroon hover:text-cream"
                        }
                    >
                        Login
                    </Button>
                </Link>
                <a href="#" className="mr-2 text-textColor">
                    Forgot password?
                </a>
            </div>
        </form>
    );
}

Login.getLayout = (page) => (
    <LoginLayout header={<Image src={Logo} />} title="Login" children={page} />
);
