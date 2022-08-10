import React, { useEffect } from "react";
import DashboardContent from "../../components/content/DashboardContent";
import ProfileMenu from "../../components/ProfileMenu";
import SideNavbar from "../../components/SideNavbar";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useRouter } from "next/router";

export default function dashboard() {
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
        <>
            <ProfileMenu />
            <SideNavbar />
            <DashboardContent />
        </>
    );
}

dashboard.getLayout = (page) => (
    <DashboardLayout title="Dashboard" children={page} />
);
