import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function about() {
    return (
        <div>
            <Navbar />
            <div className="w-full bg-white">
                <div className="container">
                    <div className="grid grid-cols-2 p-2 gap-4 mx-20 my-32 bg-white">
                        <div className="p-2">
                            <h3 className="font-bold text-3xl text-textColor">
                                Chikufarm Platform
                            </h3>
                            <p className="mb-14">
                                Was Built for a generation that's weary of
                                credit
                            </p>
                        </div>
                        <div className="bg-gray-100 pb-96 rounded-lg col-start-1 p-8">
                            <h3 className="font-bold text-xl mb-2 text-textColor">
                                What we do
                            </h3>
                            <p className="mb-4 text-sm">
                                Sunt ut pariatur labore anim ut mollit.Est
                                ullamco pariatur aliquip officia adipisicing
                                labore ea non laborum veniam ut.
                            </p>
                            <p>
                                Laboris voluptate culpa ea minim sit
                                reprehenderit dolore in ut.Ad esse cillum id
                                est.Et voluptate ut nulla sunt sint cupidatat
                                magna veniam laborum officia in cillum.
                            </p>
                        </div>
                        <div className="bg-cream rounded-lg p-8">
                            <h3 className="font-bold text-xl mb-2 text-textColor">
                                Our vision
                            </h3>
                            <p className="mb-4">
                                Sunt ut pariatur labore anim ut mollit.Est
                                ullamco pariatur aliquip officia adipisicing
                                labore ea non laborum veniam ut.Non cupidatat
                                nostrud consequat occaecat excepteur dolor
                                voluptate sunt eu non officia
                            </p>
                        </div>
                        <div className="bg-softBrown rounded-lg p-8">
                            <h3 className="font-bold text-xl mb-2 text-textColor">
                                Who we serve
                            </h3>
                            <p className="mb-4">
                                Sunt ut pariatur labore anim ut mollit.Est
                                ullamco pariatur aliquip officia adipisicing
                                labore ea non laborum veniam ut.
                            </p>
                            <p className="mb-4">
                                Laboris voluptate culpa ea minim sit
                                reprehenderit dolore in ut.Ad esse cillum id
                                est.Et voluptate ut nulla sunt sint cupidatat
                                magna veniam laborum officia in cillum.
                            </p>
                        </div>
                        <div className="bg-softGrey rounded-lg p-8">
                            <h3 className="font-bold text-xl mb-2 text-textColor">
                                Going global
                            </h3>
                            <p className="mb-4">
                                Sunt ut pariatur labore anim ut mollit.Est
                                ullamco pariatur aliquip officia adipisicing
                                labore ea non laborum veniam ut.
                            </p>
                            <p className="mb-4">
                                Laboris voluptate culpa ea minim sit
                                reprehenderit dolore in ut.Ad esse cillum id
                                est.Et voluptate ut nulla sunt sint cupidatat
                                magna veniam laborum officia in cillum.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
