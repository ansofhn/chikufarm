import React from "react";
import PakanContent from "../../components/content/PakanContent";
import ProfileMenu from "../../components/ProfileMenu";
import SideNavbar from "../../components/SideNavbar";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function pakan() {
    return (
        <div>
            <ProfileMenu/>
            <SideNavbar/>
            <PakanContent/>
        </div>
    );
}

pakan.getLayout = (page) => <DashboardLayout title="Pakan" children={page} />;
