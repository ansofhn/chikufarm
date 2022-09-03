import React from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import DetailReportContent from "../../../components/content/DetailReportContent";

export default function detailReport() {
    return (
        <div>
            <DetailReportContent />
        </div>
    );
}

detailReport.getLayout = (page) => <DashboardLayout title="All Detail Report" children={page} />;
