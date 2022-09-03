import React from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import HarvestContent from "../../components/content/HarvestContent";

export default function panen() {
    return (
        <div>
            <HarvestContent />
        </div>
    );
}

panen.getLayout = (page) => <DashboardLayout title="Harvest" children={page} />;
