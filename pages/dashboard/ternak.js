import React, { useEffect } from "react";
import TernakContent from "../../components/content/TernakContent";
import ProfileMenu from "../../components/ProfileMenu";
import SideNavbar from "../../components/SideNavbar";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useRouter } from "next/router";

export default function ternak() {
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
            <TernakContent />
        </div>
    );
}

ternak.getLayout = (page) => <DashboardLayout title="Ternak" children={page} />;
