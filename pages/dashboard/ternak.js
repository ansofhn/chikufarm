import React from "react";
import TernakContent from "../../components/content/TernakContent";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function ternak() {
    return (
        <TernakContent/>
    );
}

ternak.getLayout = (page) => <DashboardLayout title="Ternak" children={page} />;
