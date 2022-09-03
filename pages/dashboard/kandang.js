import React from "react";
import KandangContent from "../../components/content/KandangContent";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function kandang() {
    return (
        <div>
            <KandangContent />
        </div>
    );
}

kandang.getLayout = (page) => (
    <DashboardLayout title="Coop" children={page} />
);
