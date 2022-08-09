import React from "react";
import ProfileSetting from "../../../components/content/ProfileSetting";
import SideNavbar from "../../../components/SideNavbar";
import DashboardLayout from "../../../layouts/DashboardLayout";

export default function accountSetting() {
    return (
        <>
            <SideNavbar />
            <ProfileSetting/>
        </>
    );
}

accountSetting.getLayout = (page) => (
    <DashboardLayout title="Account Setting" children={page} />
);
