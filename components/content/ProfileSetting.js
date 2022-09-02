import { IdcardOutlined, LockOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Button from "../Button";
import Label from "../Label";
import Input from "../Input";
import UploadImage from "../UploadImage";
import Image from "next/image";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Swal from "sweetalert2";

export default function ProfileSetting() {
    const [dataUser, setDataUser] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [pathImage, setPathImage] = useState("");

    const CheckToken = () => {
        try {
            if (localStorage.getItem("access_token") !== null) {
                return jwt_decode(localStorage.getItem("access_token"));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getData = async () => {
        const decoded = CheckToken();
        try {
            const response = await axios
                .get(
                    `https://chikufarm-app.herokuapp.com/api/users/${decoded.sub}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "access_token"
                            )}`,
                        },
                    }
                )
                .then((res) => {
                    setDataUser(res.data.data);
                });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const onFinish = async () => {
        const id = dataUser.id;

        try {
            const response = await axios
                .put(
                    `https://chikufarm-app.herokuapp.com/api/users/${id}`,
                    editingUser,
                    {
                        headers: {
                            "content-type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem(
                                "access_token"
                            )}`,
                        },
                    }
                )
                .then((res) => {
                    console.log(res);
                    getData();
                    setEditingUser(null);
                    if (res.status === 201 || 200) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Change Saved",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                });
        } catch (e) {
            e.message;
            let timerInterval;
            Swal.fire({
                position: "top",
                html: "Please make some changes !",
                timer: 1500,
                showConfirmButton: false,
                timerProgressBar: true,
                willClose: () => {
                    clearInterval(timerInterval);
                },
            });
        }
    };

    const handleChangeImage = (filepath) => {
        setPathImage(filepath);
    };

    const checkImage = () => {
        if (pathImage.length !== 0) {
            return (
                <Image
                    className="rounded-full bg-cream"
                    loader={() => pathImage}
                    priority={true}
                    unoptimized={true}
                    src={`https://chikufarm-app.herokuapp.com/api/users/profile-picture/${pathImage}`}
                    width={120}
                    height={120}
                    alt=""
                />
            );
        } else {
            return (
                <Image
                    className="rounded-full bg-cream"
                    loader={() => dataUser.profilePicture}
                    priority={true}
                    unoptimized={true}
                    src={`https://chikufarm-app.herokuapp.com/api/users/profile-picture/${dataUser.profilePicture}`}
                    width={120}
                    height={120}
                    alt=""
                />
            );
        }
    };

    return (
        <div className="lg:w-3/4 lg:ml-72 2xl:w-10/12">
            <div className="p-4 mb-4 text-lg font-bold text-textColor">
                Account Setting
                <p className="text-sm font-normal text-textColor">
                    Change your profile and account settings
                </p>
            </div>

            <div className="p-10 bg-white rounded-xl">
                <div className="grid grid-cols-4 gap-4">
                    <div className="grid h-48 grid-rows-2">
                        <Link href={"/dashboard/profile/accountSetting"}>
                            <Button className="mr-4 font-semibold text-textColor">
                                <IdcardOutlined className="mr-4 text-xl text-center" />
                                Account
                            </Button>
                        </Link>
                        <Link href={"/dashboard/profile/passwordSetting"}>
                            <Button className="mr-4 font-semibold text-textColor">
                                <LockOutlined className="mr-4 text-xl text-center" />
                                Password
                            </Button>
                        </Link>
                    </div>
                    <div className="col-span-3 p-5 border-l border-shadowColor">
                        <div className="ml-6 text-lg font-bold text-textColor">
                            General Info
                        </div>
                        <div className="my-4 ml-6">
                            {checkImage()}
                            <UploadImage onChangeImage={handleChangeImage} />
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-10 ml-6">
                            <div className="mb-4">
                                <Label forInput="fullname">Fullname</Label>
                                <Input
                                    className="w-full px-4 py-2 text-sm rounded-lg text-textColor border-cream focus:border-maroon focus:ring-0"
                                    defaultValue={dataUser.fullName}
                                    onChange={(e) => {
                                        setEditingUser((pre) => {
                                            return {
                                                ...pre,
                                                fullName: e.target.value,
                                            };
                                        });
                                    }}
                                />
                            </div>
                            <div className="mb-4">
                                <Label forInput="username">Username</Label>
                                <Input
                                    className="w-full px-4 py-2 text-sm rounded-lg text-textColor border-cream focus:border-maroon focus:ring-0"
                                    defaultValue={dataUser.userName}
                                    onChange={(e) => {
                                        setEditingUser((pre) => {
                                            return {
                                                ...pre,
                                                userName: e.target.value,
                                            };
                                        });
                                    }}
                                />
                            </div>
                            <div className="mb-4">
                                <Label forInput="email">Email</Label>
                                <Input
                                    className="w-full px-4 py-2 text-sm rounded-lg text-textColor border-cream focus:border-maroon focus:ring-0"
                                    type="email"
                                    defaultValue={dataUser.email}
                                    onChange={(e) => {
                                        setEditingUser((pre) => {
                                            return {
                                                ...pre,
                                                email: e.target.value,
                                            };
                                        });
                                    }}
                                />
                            </div>
                            <div className="mb-4">
                                <Label forInput="phone">Phone</Label>
                                <Input
                                    className="w-full px-4 py-2 text-sm rounded-lg text-textColor border-cream focus:border-maroon focus:ring-0"
                                    defaultValue={dataUser.phone}
                                    onChange={(e) => {
                                        setEditingUser((pre) => {
                                            return {
                                                ...pre,
                                                phone: e.target.value,
                                            };
                                        });
                                    }}
                                />
                            </div>
                            <div className="col-span-2 mt-5">
                                <Button
                                    className="w-full text-sm font-semibold rounded-lg bg-cream text-maroon"
                                    key="submit"
                                    type="submit"
                                    onClick={onFinish}
                                >
                                    Save Change
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
