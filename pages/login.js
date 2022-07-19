import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../public/logo.png";
import Button from "../components/Button";
import Input from "../components/Input";
import Label from "../components/Label";
import GuestLogin from "../layouts/GuestLogin";

export default function Login() {
    return (
        <form>
            <div className="mb-6">
                <Label forInput="username"></Label>
                <Input name="username" id="username" placeholder="Username" />
            </div>
            <div className="mb-6">
                <Label forInput="password"></Label>
                <Input type="password" name="password" id="password" placeholder="Password" />
            </div>
            <div className="flex items-center justify-between mb-5">
                <Link href={"#"}>
                    <Button className={"text-semibold px-6 py-2.5 ml-1 border-2 border-maroon text-maroon hover:bg-maroon hover:text-cream"}>
                        Login
                    </Button>
                </Link>
                <a href="#" className="mr-2 text-textColor">Forgot password?</a>
            </div>
        </form>
    );
}

Login.getLayout = (page) => (
    <GuestLogin header={<Image src={Logo} />} title="Login" children={page} />
);
