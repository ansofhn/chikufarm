import React from "react";
import DashboardLayout from "../../../layouts/DashboardLayout";
import Chat from "../../../components/Chat";

export default function chat() {
    return (
        <div>
            <Chat />
        </div>
    );
}

chat.getLayout = (page) => <DashboardLayout title="Forum" children={page} />;