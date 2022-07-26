import React from "react";
import DashboardContent from "../../components/DashboardContent";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function dashboard() {
    return (
        <DashboardContent />
    );
}

dashboard.getLayout = (page) => (
    <DashboardLayout title="Dashboard" children={page} />
);