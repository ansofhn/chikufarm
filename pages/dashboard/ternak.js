import React from "react";
import TernakContent from "../../components/content/TernakContent";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function ternak() {
    return (
        <div>
            <TernakContent />
        </div>
    );
}

ternak.getLayout = (page) => <DashboardLayout title="Farm" children={page} />;
