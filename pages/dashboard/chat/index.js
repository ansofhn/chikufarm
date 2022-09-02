import React, { useEffect } from "react";
import ProfileMenu from "../../../components/ProfileMenu";
import SideNavbar from "../../../components/SideNavbar";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { useRouter } from "next/router";
import Chat from "../../../components/Chat";

export default function chat() {
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
            <Chat />
        </div>
    );
}

chat.getLayout = (page) => <DashboardLayout title="Forum" children={page} />;
