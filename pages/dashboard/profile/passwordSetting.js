import React from "react";
import PasswordSetting from "../../../components/content/PasswordSetting";
import SideNavbar from "../../../components/SideNavbar";
import DashboardLayout from "../../../layouts/DashboardLayout";

export default function passwordSetting() {
    return (
        <>
            <PasswordSetting/>
        </>
    );
}

passwordSetting.getLayout = (page) => (
    <DashboardLayout title="Password Setting" children={page} />
);
