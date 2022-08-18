import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import axios from "axios";
import Swal from "sweetalert2";

const UploadImage = ({ onChangeImage }) => {
    const uploadHandler = async (args) => {
        console.log("masuk sini");
        console.log(args);
        try {
            const formData = new FormData();
            formData.append("profilePicture", args.file);

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
                    let timerInterval;
                    Swal.fire({
                        position: "top",
                        html: "Upload Success !",
                        timer: 1500,
                        showConfirmButton: false,
                        timerProgressBar: true,
                        willClose: () => {
                            clearInterval(timerInterval);
                        },
                    });
                    onChangeImage(res.data.data.profilePicture);
                });
        } catch (e) {
            console.log(e);
            let timerInterval;
            Swal.fire({
                position: "top",
                html: "Upload Failed !",
                timer: 1500,
                showConfirmButton: false,
                timerProgressBar: true,
                willClose: () => {
                    clearInterval(timerInterval);
                },
            });
        }
    };

    return (
        <Upload
            customRequest={(args) => uploadHandler(args)}
            multiple={false}
            showUploadList={false}
        >
            <Button
                className="border-none rounded-lg shadow shadow-cream text-textColor hover:text-maroon focus:text-maroon ring-0"
                icon={<UploadOutlined />}
            ></Button>
        </Upload>
    );
};

export default UploadImage;
