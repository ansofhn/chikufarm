import React, { useEffect } from "react";
import ProfileMenu from "../../components/ProfileMenu";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useRouter } from "next/router";
import VaccineContent from "../../components/content/VaccineContent";

export default function vaccine() {
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
            <VaccineContent/>
        </div>
    );
}

vaccine.getLayout = (page) => <DashboardLayout title="Vaccine" children={page} />;
