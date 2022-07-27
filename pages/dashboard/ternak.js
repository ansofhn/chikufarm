import React from "react";
import TernakContent from "../../components/content/TernakContent";
import ProfileMenu from "../../components/ProfileMenu";
import SideNavbar from "../../components/SideNavbar";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function ternak() {
    return (
        <div>
            <ProfileMenu/>
            <SideNavbar/>
            <TernakContent/>
        </div>
    );
}

ternak.getLayout = (page) => <DashboardLayout title="Ternak" children={page} />;
