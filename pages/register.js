import React from "react";
import Link from "next/link";
import Button from "../components/Button";
import Input from "../components/Input";
import Label from "../components/Label";
import GuestRegister from "../layouts/GuestRegister";

export default function Register() {
    return (
        <form>
            <div className="mb-6">
                <Label forInput="fullname"></Label>
                <Input name="fullname" id="fullname" placeholder="Fullname" />
            </div>
            <div className="mb-6">
                <Label forInput="username"></Label>
                <Input name="username" id="username" placeholder="Username" />
            </div>
            <div className="mb-6">
                <Label forInput="email"></Label>
                <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                />
            </div>
            <div className="mb-6">
                <Label forInput="phone"></Label>
                <Input name="phone" id="phone" placeholder="Phone" />
            </div>
            <div className="mb-6">
                <Label forInput="password"></Label>
                <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                />
            </div>
            <Link href={"#"}>
                <Button
                    className={
                        "transition duration-300 w-full text-semibold px-6 py-2.5 border-2 border-maroon text-maroon hover:bg-maroon hover:text-cream"
                    }
                >
                    Sign Up
                </Button>
            </Link>
        </form>
    );
}

Register.getLayout = (page) => (
    <GuestRegister
        header={"Create Guest Account"}
        title="Register"
        children={page}
    />
);
