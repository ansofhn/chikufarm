import React, { useEffect } from "react";
import KandangContent from "../../components/content/KandangContent";
import ProfileMenu from "../../components/ProfileMenu";
import SideNavbar from "../../components/SideNavbar";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useRouter } from "next/router";

export default function kandang() {
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
            <ProfileMenu />
            <SideNavbar />
            <KandangContent />
        </div>
    );
}

kandang.getLayout = (page) => (
    <DashboardLayout title="Kandang" children={page} />
);
