import React from "react";
import { MdOutlineWavingHand } from "react-icons/md";
import Footer from "../components/Footer";
import Input from "../components/Input";
import Label from "../components/Label";
import Navbar from "../components/Navbar";

export default function contact() {
    return (
        <div>
            <Navbar />
            <div className="w-full bg-white">
                <div className="container">
                    <div className="grid grid-cols-2 p-2 gap-8 mx-40 my-32 bg-white">
                        <div className="text-4xl text-textColor font-semibold">
                            Love to hear from you, Get in touch
                            <MdOutlineWavingHand />
                        </div>
                        <div className="col-start-1">
                            <Label forInput="name">Your name</Label>
                            <Input className="rounded-md w-full" name="name" id="name" />
                        </div>
                        <div className="">
                            <Label forInput="email">Your email</Label>
                            <Input className="rounded-md w-full" type="email" name="email" id="email" />
                        </div>
                        <div className="">
                            
                            <Label forInput="email">Phone</Label>
                            <Input className="rounded-md w-full" type="email" name="email" id="email" />
                        </div>
                        <div className="">
                            <Label forInput="email">What your role</Label>
                            <Input
                                className="rounded-md w-full"
                                type="email"
                                name="email"
                                id="email"
                            />
                        </div>
                        <div className="col-span-2">
                            <Label forInput="message">Message</Label>
                            <Input
                                className="rounded-md border p-2 w-full h-20"
                                type="textbox"
                                name="message"
                                id="message"
                            />
                        </div>
                        
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
