import React from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import VaccineContent from "../../components/content/VaccineContent";

export default function vaccine() {
    return (
        <div>
            <VaccineContent/>
        </div>
    );
}

vaccine.getLayout = (page) => <DashboardLayout title="Vaccine" children={page} />;
