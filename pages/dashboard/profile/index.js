import React from "react";
import ProfileSetting from "../../../components/content/ProfileSetting";
import ProfileMenu from "../../../components/ProfileMenu";
import SideNavbar from "../../../components/SideNavbar";
import DashboardLayout from "../../../layouts/DashboardLayout";

export default function profile() {
    return (
        <div>
            <ProfileMenu />
            <SideNavbar />
            <ProfileSetting/>
        </div>
    );
}

profile.getLayout = (page) => (
    <DashboardLayout title="profile" children={page} />
);
