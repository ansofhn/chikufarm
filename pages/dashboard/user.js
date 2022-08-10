import React, { useEffect } from "react";
import UserContent from "../../components/content/UserContent";
import ProfileMenu from "../../components/ProfileMenu";
import SideNavbar from "../../components/SideNavbar";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useRouter } from "next/router";

export default function user() {
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
            <UserContent />
        </div>
    );
}

user.getLayout = (page) => <DashboardLayout title="User" children={page} />;
