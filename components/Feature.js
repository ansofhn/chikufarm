import React from "react";
import Image from "next/image";
import Group from "../public/groupImage.png";
import Link from "next/link";
import Button from "./Button";

export default function Feature() {
    return (
        <div className="grid w-4/5 grid-cols-2 gap-20 mx-auto mb-20">
            <div className="p-10">
                <Image src={Group} />
            </div>

            <div className="self-center p-10 text-left text-textColor">
                <div className="text-3xl font-bold font-montserrat">Our Features</div>
                <div className="my-2 text-sm">
                    Specially developed to manage
                </div>
                <div className="mt-10 text-base font-bold">Farm Management</div>
                <div className="mt-2 text-sm">managing livestock, feed, coop</div>
                <div className="mt-4 text-base font-bold">Daily Report System</div>
                <div className="mt-2 text-sm">manage your daily data and report</div>
                <div className="mt-4 text-base font-bold">Summary Data by Report</div>
                <div className="mt-2 mb-10 text-sm">see summary and start analyzing</div>

                <Link href={"/register"}>
                    <Button
                        className={
                            "transition duration-300 text-semibold px-14 py-2 bg-maroon text-cream"
                        }
                    >
                        Sign Up
                    </Button>
                </Link>
            </div>
        </div>
    );
}
