import React, { useEffect } from "react";
import ProfileMenu from "../../../components/ProfileMenu";
import SideNavbar from "../../../components/SideNavbar";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { useRouter } from "next/router";
import DetailReportContent from "../../../components/content/DetailReportContent";

export default function detailReport() {
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
    useEffect(() => {
        CheckToken();
    }, []);
    return (
        <div>
            <ProfileMenu/>
            <DetailReportContent />
        </div>
    );
}

detailReport.getLayout = (page) => <DashboardLayout title="Report" children={page} />;
