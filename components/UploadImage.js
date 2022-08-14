import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import axios from "axios";

const UploadImage = ({ onChangeImage }) => {
    const uploadHandler = async (args) => {
        console.log("masuk sini");
        try {
            const formData = new FormData();
            formData.append("file", args.file);

            const processImage = await axios
                .post("https://chikufarm-app.herokuapp.com/api/users/profile-picture", formData, {
                    headers: { "content-type": "multipart/form-data" },
                })
                .then((res) => {
                    message.success("berhasil Upload File");
                    onChangeImage(res.data.data.filename);
                });
        } catch (e) {
            console.log(e, "apa errornya");
            message.error("Upload failed");
        }
    };

    return (
        <Upload customRequest={(args) => uploadHandler(args)} multiple={false}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
    );
};

export default UploadImage;
