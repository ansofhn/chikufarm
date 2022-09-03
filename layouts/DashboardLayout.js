import React, { useEffect } from "react";
import Head from "next/head";
import ProfileMenu from "../components/ProfileMenu";
import SideNavbar from "../components/SideNavbar";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

export default function DashboardLayout({ title, children }) {
    const router = useRouter();
    const CheckToken = () => {
        try {
            if (localStorage.getItem("access_token") == null) {
                let timerInterval;
                Swal.fire({
                    position: "top",
                    html: "You must login first !",
                    timer: 1500,
                    showConfirmButton: false,
                    timerProgressBar: true,
                    willClose: () => {
                        clearInterval(timerInterval);
                    },
                });
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
        <div className="h-screen bg-gray-200">
            <div className="p-5 bg-gray-200">
                <Head>
                    <title>{title}</title>
                </Head>
                <div>
                    <SideNavbar />
                    <ProfileMenu />
                    {children}
                </div>
            </div>
        </div>
    );
}
