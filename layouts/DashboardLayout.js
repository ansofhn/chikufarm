import React from "react";
import Head from "next/head";
import SideNavbar from "../components/SideNavbar";
import Header from "../components/Header";

export default function DashboardLayout({ title, children }) {
    return (
        <div className="py-5 bg-gray-100">
            <Head>
                <title>{title}</title>
            </Head>
            <div>
                <SideNavbar />
                <Header />
                {children}
            </div>
        </div>
    );
}
