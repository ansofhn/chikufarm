import React, { useEffect } from "react";
import PakanContent from "../../components/content/PakanContent";
import ProfileMenu from "../../components/ProfileMenu";
import SideNavbar from "../../components/SideNavbar";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useRouter } from "next/router";

export default function pakan() {
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
            <PakanContent />
        </div>
    );
}

pakan.getLayout = (page) => <DashboardLayout title="Pakan" children={page} />;
