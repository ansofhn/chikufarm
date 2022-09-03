import React from "react";
import ProfileSetting from "../../../components/content/ProfileSetting";
import SettingLayout from "../../../layouts/SettingLayout";

export default function accountSetting() {
    return (
        <>
            <ProfileSetting />
        </>
    );
}

accountSetting.getLayout = (page) => (
    <SettingLayout title="Account Setting" children={page} />
);
