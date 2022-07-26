import React from "react";
import PakanContent from "../../components/content/PakanContent";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function pakan() {
    return (
        <PakanContent/>
    );
}

pakan.getLayout = (page) => <DashboardLayout title="Pakan" children={page} />;
