import React from "react";
import KandangContent from "../../components/content/KandangContent";
import ProfileMenu from "../../components/ProfileMenu";
import SideNavbar from "../../components/SideNavbar";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function kandang() {
    return (
        <div>
            <ProfileMenu/>
            <SideNavbar/>
            <KandangContent/>
        </div>
    );
}

kandang.getLayout = (page) => <DashboardLayout title="Kandang" children={page} />;
