import React from "react";
import Navbar from "../components/Navbar";
import App from "../layouts/App";

export default function Home() {
    return (
        <>
            <Navbar></Navbar>
        </>
    )
}

Home.getLayout = (page) => <App children={page} />;
