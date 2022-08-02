import React from "react";
import Head from "next/head";

export default function DashboardLayout({ title, children }) {
    return (
        <div className="h-screen bg-gray-200">
        <div className="p-5 bg-gray-200">
            <Head>
                <title>{title}</title>
            </Head>
            <div>
                {children}
            </div>
        </div>
        </div>
    );
}
