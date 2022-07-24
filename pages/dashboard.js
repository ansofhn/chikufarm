import React from "react";
import Content from "../components/Content";
import Header from "../components/Header";
import SideNavbar from "../components/SideNavbar";

export default function dashboard() {
    return (
        <div className="py-5 bg-gray-100 ">
            <div>
                <SideNavbar />
                <Header/>
                <Content/>
            </div>
        </div>
    );
}
