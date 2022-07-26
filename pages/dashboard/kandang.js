import React from "react";
import KandangContent from "../../components/content/KandangContent";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function kandang() {
    return (
        <KandangContent/>
    );
}

kandang.getLayout = (page) => <DashboardLayout title="Kandang" children={page} />;
