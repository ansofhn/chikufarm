import React from "react";
import { Select } from "antd";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Input from "../components/Input";
import Label from "../components/Label";
import Navbar from "../components/Navbar";

const { Option } = Select;

export default function contact() {
    return (
        <>
            <Navbar />
            <div className="w-full bg-white">
                <div className="container">
                    <form className="grid grid-cols-2 gap-8 p-2 mx-40 my-32 bg-white">
                        <div className="mb-6 text-4xl font-semibold text-textColor 2xl:mr-24">
                            Love to hear from you, Get in touch
                        </div>
                        <div className="col-start-1">
                            <Label forInput="name">Your Username</Label>
                            <Input
                                className="text-sm p-2.5 rounded-md w-full bg-gray-100 border-none focus:ring-0"
                                name="name"
                                id="name"
                                placeholder="Username"
                            />
                        </div>
                        <div className="">
                            <Label forInput="email">Your email</Label>
                            <Input
                                className="text-sm p-2.5 rounded-md w-full bg-gray-100 border-none focus:ring-0"
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                            />
                        </div>
                        <div className="">
                            <Label forInput="email">Phone</Label>
                            <Input
                                className="text-sm p-2.5 rounded-md w-full bg-gray-100 border-none focus:ring-0"
                                placeholder="Phone"
                            />
                        </div>
                        <div>
                            <Label forInput="email">What your role</Label>
                            <Select
                                className="w-full p-1 text-sm bg-gray-100 border-none rounded-md focus:ring-0"
                                placeholder="Choose Your Role"
                                onSelect={""}
                                bordered={false}
                            >
                                <Option
                                    className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                    value="admin"
                                >
                                    Admin
                                </Option>
                                <Option
                                    className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                    value="farmer"
                                >
                                    Farmer
                                </Option>
                                <Option
                                    className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                    value="guest"
                                >
                                    Guest
                                </Option>
                            </Select>
                        </div>
                        <div className="col-span-2">
                            <Label forInput="message">Message</Label>
                            <textarea
                                id="message"
                                rows="8"
                                className="block p-2.5 w-full text-sm text-textColor bg-gray-100 rounded-md focus:ring-0 focus:border-none border-none "
                                placeholder="Your message..."
                            ></textarea>
                        </div>
                        <div>
                            <Button
                                type="submit"
                                className="w-full px-6 py-3 mt-5 transition duration-300 border-none rounded-md text-semibold text-cream bg-maroon focus:ring-0"
                            >
                                Send Message
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}
