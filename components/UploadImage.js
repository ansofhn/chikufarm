import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import axios from "axios";

const UploadImage = ({ onChangeImage }) => {
    const uploadHandler = async (args) => {
        console.log("masuk sini");
        console.log(args)
        try {
            const formData = new FormData();
            formData.append("profilePicture", args.file);
            console.log(formData)
            const processImage = await axios
                .post(
                    "https://chikufarm-app.herokuapp.com/api/users/profile-picture",
                    formData,
                    {
                        headers: {
                            "content-type": "multipart/form-data",
                            Authorization: `Bearer ${localStorage.getItem(
                                "access_token"
                            )}`,
                        },
                    }
                )
                .then((res) => {
                    message.success("Berhasil Upload Image");
                    onChangeImage(res.data.data.profilePicture);
                });
        } catch (e) {
            console.log(e, "apa errornya");
            message.error("Upload failed");
        }
    };

    return (
        <Upload customRequest={(args) => uploadHandler(args)} multiple={false}>
            <Button className="border-none rounded-lg shadow shadow-cream text-textColor hover:text-maroon focus:text-maroon ring-0" icon={<UploadOutlined />}></Button>
        </Upload>
    );
};

export default UploadImage;
