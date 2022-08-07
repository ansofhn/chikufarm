import React from "react";
import PasswordSetting from "../../../components/content/PasswordSetting";
import ProfileMenu from "../../../components/ProfileMenu";
import SideNavbar from "../../../components/SideNavbar";
import DashboardLayout from "../../../layouts/DashboardLayout";

export default function passwordSetting() {
    return (
        <div>
            <ProfileMenu />
            <SideNavbar />
            <PasswordSetting/>
        </div>
    );
}

passwordSetting.getLayout = (page) => (
    <DashboardLayout title="Password Setting" children={page} />
);
