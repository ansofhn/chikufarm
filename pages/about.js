import Head from "next/head";
import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function about() {
    return (
        <>
            <Head>
                <title>About Us</title>
            </Head>
            <Navbar />
            <div className="w-full bg-white">
                <div className="container">
                    <div className="grid grid-cols-2 gap-4 p-2 mx-20 my-32 bg-white">
                        <div className="p-2">
                            <h3 className="text-3xl font-bold text-textColor">
                                Chikufarm Platform
                            </h3>
                            <p className="mb-14">
                                Your daily management for best investment
                            </p>
                        </div>
                        <div className="col-start-1 p-8 bg-gray-100 rounded-lg pb-96">
                            <h3 className="mb-2 text-xl font-bold text-textColor">
                                What we do
                            </h3>
                            <p className="mb-4 text-sm">
                                We make farm management system services,
                                especially chickens and ducks. management is
                                carried out with proven research and can improve
                                quality and quantity as well as increase or
                                maximize profits.
                            </p>
                            <p>
                                The service we create will manage daily report
                                data and then feed recommendations, a good
                                harvest system, to vaccination schedules and
                                also recommendations ranging from types to how
                                to use them.
                            </p>
                        </div>
                        <div className="p-8 rounded-lg bg-cream">
                            <h3 className="mb-2 text-xl font-bold text-textColor">
                                Our vision
                            </h3>
                            <p className="mb-4">
                                Our vision is to make it easier for poultry
                                farmers and also to improve people's welfare by
                                improving quality at competitive prices.
                            </p>
                            <p>Everyone can farm easily as easy as it</p>
                            <p className="mt-4 font-medium text-md">
                                "Let's Just Farm"
                            </p>
                        </div>
                        <div className="p-8 rounded-lg bg-softBrown">
                            <h3 className="mb-2 text-xl font-bold text-textColor">
                                Who we serve
                            </h3>
                            <p className="mb-4">
                                We offer many features that are needed in
                                today's livestock world, which are tested and
                                comply with international standards.
                            </p>
                            <p className="mb-4">
                                Live reports with statistics, daily reports,
                                feed management, coop management, livestock
                                management, harvest system, to vaccinations.
                            </p>
                        </div>
                        <div className="p-8 rounded-lg bg-softGrey">
                            <h3 className="mb-2 text-xl font-bold text-textColor">
                                Going global
                            </h3>
                            <p className="mb-4">
                                Together with chikufarm, the farm management
                                system globally.
                            </p>
                            <p className="mb-4">
                                For global news, announcements, and more on our
                                contact admin, visit our contact page.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
