import React from "react";
import Image from "next/image";
import Step1 from "../public/create.png";
import Step2 from "../public/add-content.png";
import Step3 from "../public/launch.png";

export default function Flow() {
    return (
        <div className="p-5 my-40">
            <div className="text-center">
                <h3 className=" mb-14 text-3xl font-bold text-textColor font-monserrat">
                    How it works
                </h3>
                <div className="mx-auto w-4/5 grid grid-cols-3">
                    <div className="w-2/3 self-center mx-auto p-5">
                        <Image src={Step1} />
                        <h3 className="text-lg text-textColor font-semibold my-2">
                            Login
                        </h3>
                        <p className="text-sm font-normal">
                            Login to get started
                        </p>
                    </div>
                    <div className="w-2/3 self-center mx-auto p-5">
                        <Image src={Step2} />
                        <h3 className="text-lg text-textColor font-semibold my-2">
                            Add & Report
                        </h3>
                        <p className="text-sm font-normal">
                            Add data and report
                        </p>
                    </div>
                    <div className="w-2/3 self-center mx-auto p-5">
                        <Image src={Step3} />
                        <h3 className="text-lg text-textColor font-semibold my-2">
                            Manage Your Own
                        </h3>
                        <p className="text-sm font-normal">
                            Manage and update your daily progress
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
