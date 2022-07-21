import React from "react";
import Content from "../components/Content";
import Header from "../components/Header";
import SideNavbar from "../components/SideNavbar";

export default function dashboard() {
    return (
        <div>
            <div>
                <SideNavbar />
                <div>
                    <Header />
                </div>
                <div>
                    <Content />
                </div>
            </div>
        </div>
    );
}
