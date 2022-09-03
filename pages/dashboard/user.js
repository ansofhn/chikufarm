import React from "react";
import UserContent from "../../components/content/UserContent";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function user() {
    return (
        <div>
            <UserContent />
        </div>
    );
}

user.getLayout = (page) => <DashboardLayout title="User" children={page} />;
