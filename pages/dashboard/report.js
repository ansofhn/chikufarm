import React from "react";
import ReportContent from "../../components/content/ReportContent";
import ProfileMenu from "../../components/ProfileMenu";
import SideNavbar from "../../components/SideNavbar";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function report() {
    return (
        <div>
            <ProfileMenu/>
            <SideNavbar/>
            <ReportContent/>
        </div>
    );
}

report.getLayout = (page) => <DashboardLayout title="Report" children={page} />;