import React from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import VaccinationReportContent from "../../../components/content/VaccinationReportContent";

export default function vaccinationReport() {
    return (
        <div>
            <VaccinationReportContent />
        </div>
    );
}

vaccinationReport.getLayout = (page) => <DashboardLayout title="Vaccination Report" children={page} />;
