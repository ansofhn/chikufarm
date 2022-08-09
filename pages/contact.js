import React from "react";
import { MdOutlineWavingHand } from "react-icons/md";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Input from "../components/Input";
import Label from "../components/Label";
import Navbar from "../components/Navbar";

export default function contact() {
    return (
        <>
            <Navbar />
            <div className="w-full bg-white">
                <div className="container">
                    <form className="grid grid-cols-2 p-2 gap-8 mx-40 my-32 bg-white">
                        <div className="mb-5 text-4xl text-textColor font-semibold">
                            Love to hear from you, Get in touch
                            
                        </div>
                        <div className="col-start-1">
                            <Label forInput="name">Your name</Label>
                            <Input className="text-sm p-2.5 rounded-md w-full bg-gray-100 border-none focus:ring-maroon" name="name" id="name" />
                        </div>
                        <div className="">
                            <Label forInput="email">Your email</Label>
                            <Input className="text-sm p-2.5 rounded-md w-full bg-gray-100 border-none focus:ring-maroon" type="email" name="email" id="email" />
                        </div>
                        <div className="">
                            
                            <Label forInput="email">Phone</Label>
                            <Input className="text-sm p-2.5 rounded-md w-full bg-gray-100 border-none focus:ring-maroon" type="email" name="email" id="email" />
                        </div>
                        <div>
                            <Label forInput="email">What your role</Label>
                            <Input
                                className="text-sm p-2.5 rounded-md w-full bg-gray-100 border-none focus:ring-maroon"
                                type="email"
                                name="email"
                                id="email"
                            />
                        </div>
                        <div className="col-span-2">
                            <Label forInput="message">Message</Label>
                            <Input
                                className="rounded-md w-full h-40 p-4 bg-gray-100 border-none focus:ring-maroon"
                                name="message"
                                id="message"
                                type="textarea"
                            />
                        </div>
                        <div>
                            <Button
                                type="submit"
                                className="mt-5 transition duration-300 text-semibold px-6 py-3 rounded-md text-cream w-full bg-maroon border-none focus:ring-0"
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
