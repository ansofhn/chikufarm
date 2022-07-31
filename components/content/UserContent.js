import { Button, Table, Modal, Input } from "antd";
import { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Label from "../Label";
import { MdAdd } from "react-icons/md";

import { Select } from "antd";
import React from "react";
import axios from "axios";
import { validate } from "uuid";
const { Option } = Select;

export default function UserContent() {
    // const [dataDummy, setDataDummy] = useState([]);
    // const column = [
    //     {
    //         title: "ID",
    //         dataIndex: "id",
    //     },
    //     {
    //         title: "FirstName",
    //         dataIndex: "firstName",
    //     },
    //     {
    //         title: "LastName",
    //         dataIndex: "lastName",
    //     },
    // ];

    // async function getData() {
    //     try {
    //         const data = await axios
    //             .get("https://dummyjson.com/users")
    //             .then((respond) => {
    //                 setDataDummy(respond.data.users);
    //             });
    //     } catch (error) {}
    // }

    // useEffect(()=>{
    //     getData()
    //     console.log(dataDummy)
    // },[])

    const [isAdding, setIsAdding] = useState(false);
    const [addingUser, setAddingUser] = useState(null);

    const [isEditing, setIsEditing] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [dataSource, setDataSource] = useState([
        {
            id: 9991,
            fullname: "Ansof Habibunnadjar",
            username: "ansofhn",
            email: "ansofhn5@gmail.com",
            phone: "085692751958",
            role: "Admin",
        },
        {
            id: 9992,
            fullname: "Faisal Hari Salam",
            username: "faisalharie",
            email: "faisalharie@gmail.com",
            phone: "081284594562",
            role: "Admin",
        },
    ]);
    const columns = [
        {
            key: "1",
            title: "ID",
            dataIndex: "id",
        },
        {
            key: "2",
            title: "Fullname",
            dataIndex: "fullname",
        },
        {
            key: "3",
            title: "Username",
            dataIndex: "username",
        },
        {
            key: "4",
            title: "Email",
            dataIndex: "email",
        },
        {
            key: "5",
            title: "Phone",
            dataIndex: "phone",
        },
        {
            key: "6",
            title: "Role",
            dataIndex: "role",
        },
        {
            key: "7",
            title: "Actions",
            render: (record) => {
                return (
                    <>
                        <EditOutlined
                            onClick={() => {
                                onEditUser(record);
                            }}
                        />
                        <DeleteOutlined
                            onClick={() => {
                                onDeleteUser(record);
                            }}
                            style={{ color: "maroon", marginLeft: 12 }}
                        />
                    </>
                );
            },
        },
    ];

    const onAddUser = () => {
        setIsAdding(true);
        setAddingUser(null);
    };

    const resetAdd = () => {
        setIsAdding(false);
        setAddingUser(null);
    };

    const onDeleteUser = (record) => {
        Modal.confirm({
            title: "Delete User",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                setDataSource((pre) => {
                    return pre.filter((user) => user.id !== record.id);
                });
            },
        });
    };
    const onEditUser = (record) => {
        setIsEditing(true);
        setEditingUser({ ...record });
    };
    const resetEditing = () => {
        setIsEditing(false);
        setEditingUser(null);
    };
    return (
        <div className="my-4 lg:w-3/4 lg:ml-72">
            <div className="p-4 text-lg font-bold text-textColor">
                Data User / All
            </div>
            <div className="p-10 bg-white rounded-lg">
                <div className="flex justify-end mb-5 pb-5 border-b border-gray-200">
                    <Button
                        className="transition duration-300 text-semibold rounded-lg items-center gap-2 flex px-4 py-3 bg-maroon text-cream border-none hover:bg-maroon hover:text-cream hover:border-none focus:text-cream focus:bg-maroon focus:border-none"
                        onClick={onAddUser}
                    >
                        <MdAdd className="self-center text-lg" />
                        Add
                    </Button>
                </div>
                <Table
                    bordered={true}
                    columns={columns}
                    dataSource={dataSource}
                ></Table>

                {/* Add User */}
                <Modal
                    className="rounded-lg overflow-hidden p-0"
                    title="Add User"
                    visible={isAdding}
                    footer={[
                        <div className="flex justify-center">
                            <Button
                                className="w-full mx-2 rounded-md border-maroon text-maroon font-semibold hover:text-maroon hover:border-maroon focus:text-maroon focus:border-maroon"
                                key="back"
                                onClick={() => {
                                    resetAdd();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="w-full mx-2 rounded-md border-maroon bg-maroon text-cream font-semibold hover:maroon hover:bg-maroon hover:text-cream hover:border-maroon focus:bg-maroon focus:text-cream focus:border-maroon"
                                key="submit"
                                onClick={() => {
                                    const uuid = Math.floor(
                                        1000 + Math.random() * 9000
                                    );
                                    addingUser["id"] = uuid;

                                    setDataSource([...dataSource, addingUser]);
                                    resetAdd();
                                }}
                            >
                                Add
                            </Button>
                        </div>,
                    ]}
                >
                    <Label forInput={"fullname"}>Fullname</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={addingUser?.fullname}
                        onChange={(e) => {
                            setAddingUser((pre) => {
                                return { ...pre, fullname: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"username"}>Username</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={addingUser?.username}
                        onChange={(e) => {
                            setAddingUser((pre) => {
                                return { ...pre, username: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"email"}>Email</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={addingUser?.email}
                        onChange={(e) => {
                            setAddingUser((pre) => {
                                return { ...pre, email: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"phone"}>Phone</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={addingUser?.phone}
                        onChange={(e) => {
                            setAddingUser((pre) => {
                                return { ...pre, phone: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"role"}>User Role</Label>
                    <Select
                        className="rounded-lg text-sm border border-textColor my-1 hover:border-textColor"
                        onSelect={(value) => {
                            setAddingUser((pre) => {
                                return { ...pre, role: value };
                            });
                        }}
                        style={{
                            width: 120,
                        }}
                        bordered={false}
                    >
                        <Option
                            className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                            value="Admin"
                        >
                            Admin
                        </Option>
                        <Option
                            className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                            value="Farmer"
                        >
                            Farmer
                        </Option>
                        <Option
                            className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                            value="Guest"
                        >
                            Guest
                        </Option>
                    </Select>
                </Modal>

                {/* Edit User */}
                <Modal
                    className="rounded-lg overflow-hidden p-0"
                    title="Edit User"
                    visible={isEditing}
                    footer={[
                        <div className="flex justify-center">
                            <Button
                                className="w-full mx-2 rounded-md border-maroon text-maroon font-semibold hover:text-maroon hover:border-maroon focus:text-maroon focus:border-maroon"
                                key="back"
                                onClick={() => {
                                    resetEditing();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="w-full mx-2 rounded-md border-maroon bg-maroon text-cream font-semibold hover:maroon hover:bg-maroon hover:text-cream hover:border-maroon focus:bg-maroon focus:text-cream focus:border-maroon"
                                key="submit"
                                onClick={() => {
                                    setDataSource((pre) => {
                                        return pre.map((user) => {
                                            if (user.id === editingUser.id) {
                                                return editingUser;
                                            } else {
                                                return user;
                                            }
                                        });
                                    });
                                    resetEditing();
                                }}
                            >
                                Save
                            </Button>
                        </div>,
                    ]}
                >
                    <Label forInput={"fullname"}>Fullname</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={editingUser?.fullname}
                        onChange={(e) => {
                            setEditingUser((pre) => {
                                return { ...pre, fullname: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"username"}>Username</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={editingUser?.username}
                        onChange={(e) => {
                            setEditingUser((pre) => {
                                return { ...pre, username: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"email"}>Email</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={editingUser?.email}
                        onChange={(e) => {
                            setEditingUser((pre) => {
                                return { ...pre, email: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"phone"}>Phone</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={editingUser?.phone}
                        onChange={(e) => {
                            setEditingUser((pre) => {
                                return { ...pre, phone: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"role"}>User Role</Label>
                    <Select
                        className="rounded-lg text-sm border border-textColor my-1 hover:border-textColor"
                        defaultValue={editingUser?.role}
                        onChange={(value) => {
                            setEditingUser((pre) => {
                                return { ...pre, role: value };
                            });
                        }}
                        style={{
                            width: 120,
                        }}
                        bordered={false}
                    >
                        <Option
                            className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                            value="Admin"
                        >
                            Admin
                        </Option>
                        <Option
                            className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                            value="Farmer"
                        >
                            Farmer
                        </Option>
                        <Option
                            className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                            value="Guest"
                        >
                            Guest
                        </Option>
                    </Select>
                </Modal>
            </div>
        </div>
    );
}
