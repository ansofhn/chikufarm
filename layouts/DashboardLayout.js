import React from "react";
import Head from "next/head";
// import "antd/dist/antd.variable.css";
// import { ConfigProvider } from "antd";

// ConfigProvider.config({
//     theme: {
//         primaryColor: "",
//     },
// });

export default function DashboardLayout({ title, children }) {
    return (
        <div className="h-screen bg-gray-200">
            <div className="p-5 bg-gray-200">
                <Head>
                    <title>{title}</title>
                </Head>
                <div>{children}</div>
            </div>
        </div>
    );
}
