import React from "react";
import Feature from "../components/Feature";
import Flow from "../components/Flow";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Service from "../components/Service";
import Stats from "../components/Stats";
import App from "../layouts/App";

export default function Home() {
    return (
        <>
            <Hero/>
            <Stats/>
            <Flow/>
            <Service/>
            <Feature/>
            <Footer/>
        </>
    )
}

Home.getLayout = (page) => <App children={page} />;
