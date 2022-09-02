import React from "react";
import ProfileSetting from "../../../components/content/ProfileSetting";
import SideNavbar from "../../../components/SideNavbar";
import DashboardLayout from "../../../layouts/DashboardLayout";
import SettingLayout from "../../../layouts/SettingLayout";

export default function accountSetting() {
    return (
        <>
            <ProfileSetting />
        </>
    );
}

accountSetting.getLayout = (page) => (
    <SettingLayout title="Account Setting" children={page} />
);
