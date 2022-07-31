import React from "react";
import UserContent from "../../components/content/UserContent";
import ProfileMenu from "../../components/ProfileMenu";
import SideNavbar from "../../components/SideNavbar";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function user() {
    return (
        <div>
            <ProfileMenu/>
            <SideNavbar/>
            <UserContent/>
        </div>
    );
}

user.getLayout = (page) => <DashboardLayout title="Profile Setting" children={page} />;
