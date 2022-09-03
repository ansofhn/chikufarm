import React from "react";
import ReportContent from "../../../components/content/ReportContent";
import DashboardLayout from "../../../layouts/DashboardLayout";

export default function dailyReport() {
    return (
        <div>
            <ReportContent />
        </div>
    );
}

dailyReport.getLayout = (page) => <DashboardLayout title="Daily Report" children={page} />;
