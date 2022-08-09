import React from "react";
import ReportContent from "../../components/content/ReportContent";
import ProfileMenu from "../../components/ProfileMenu";
import SideNavbar from "../../components/SideNavbar";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useRouter } from "next/router";

export default function report() {
    const router = useRouter();
    const CheckToken = () => {
        try {
            if (localStorage.getItem("access_token") == null) {
                window.alert("Anda Harus Login Terlebih dahulu");
                router.push("/login");
            }
        } catch (error) {
            console.log(error);
        }
    };
    CheckToken();
    return (
        <div>
            <ProfileMenu />
            <SideNavbar />
            <ReportContent />
        </div>
    );
}

report.getLayout = (page) => <DashboardLayout title="Report" children={page} />;
