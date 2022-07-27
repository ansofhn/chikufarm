import React from "react";
import DashboardContent from "../../components/content/DashboardContent";
import ProfileMenu from "../../components/ProfileMenu";
import SideNavbar from "../../components/SideNavbar";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function dashboard() {
    return (
        <>
            <ProfileMenu/>
            <SideNavbar />
            <DashboardContent />
        </>
    );
}

dashboard.getLayout = (page) => (
    <DashboardLayout title="Dashboard" children={page} />
);
