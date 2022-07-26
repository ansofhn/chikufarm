import React from "react";
import UserContent from "../../components/UserContent";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function user() {
    return (
        <UserContent/>
    );
}

user.getLayout = (page) => <DashboardLayout title="User" children={page} />;
