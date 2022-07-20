import React from "react";
import Hero from "../components/Hero";
import App from "../layouts/App";

export default function Home() {
    return (
        <>
            <Hero></Hero>
        </>
    )
}

Home.getLayout = (page) => <App children={page} />;
