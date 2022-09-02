import React from "react";
import PasswordSetting from "../../../components/content/PasswordSetting";
import SettingLayout from "../../../layouts/SettingLayout";

export default function passwordSetting() {
    return (
        <>
            <PasswordSetting/>
        </>
    );
}

passwordSetting.getLayout = (page) => (
    <SettingLayout title="Password Setting" children={page} />
);
