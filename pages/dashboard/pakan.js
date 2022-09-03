import React from "react";
import PakanContent from "../../components/content/PakanContent";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function pakan() {
    return (
        <div>
            <PakanContent />
        </div>
    );
}

pakan.getLayout = (page) => <DashboardLayout title="Feed" children={page} />;
