import React from "react";
import Image from "next/image";
import Group from "../public/groupImage.png";
import Link from "next/link";
import Button from "./Button";

export default function Feature() {
    return (
        <div className="grid w-4/5 grid-cols-2 gap-20 mx-auto mb-20">
            <div className="p-5">
                <Image src={Group} />
            </div>

            <div className="self-center p-10 text-left text-textColor">
                <div className="text-4xl font-bold">Our Feature</div>
                <div className="my-2 text-base">
                    Specially developed to manage
                </div>
                <div className="mt-10 text-lg font-bold">Manage Kandang</div>
                <div className="mt-2">One line description</div>
                <div className="mt-4 text-lg font-bold">Manage Pakan</div>
                <div className="mt-2">One line description</div>
                <div className="mt-4 text-lg font-bold">Manage Ternak</div>
                <div className="mt-2 mb-10">One line description</div>

                <Link href={"/register"}>
                    <Button
                        className={
                            "transition rounded-md duration-300 text-semibold px-14 py-2 bg-maroon text-cream"
                        }
                    >
                        Sign Up
                    </Button>
                </Link>
            </div>
        </div>
    );
}
