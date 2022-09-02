import React, { useEffect } from "react";
import ProfileMenu from "../../components/ProfileMenu";
import SideNavbar from "../../components/SideNavbar";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useRouter } from "next/router";
import HarvestContent from "../../components/content/HarvestContent";

export default function panen() {
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
            <HarvestContent />
        </div>
    );
}

panen.getLayout = (page) => <DashboardLayout title="Pakan" children={page} />;
