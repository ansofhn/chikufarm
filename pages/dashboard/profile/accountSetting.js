import React from "react";
import ProfileSetting from "../../../components/content/ProfileSetting";
import ProfileMenu from "../../../components/ProfileMenu";
import SideNavbar from "../../../components/SideNavbar";
import DashboardLayout from "../../../layouts/DashboardLayout";

export default function accountSetting() {
    return (
        <div>
            <ProfileMenu />
            <SideNavbar />
            <ProfileSetting/>
        </div>
    );
}

accountSetting.getLayout = (page) => (
    <DashboardLayout title="Account Setting" children={page} />
);
