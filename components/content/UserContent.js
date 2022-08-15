import React from "react";
import { useEffect, useState } from "react";
import { Button, Table, Modal, Input, Select } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { MdAdd } from "react-icons/md";
import axios from "axios";
import Label from "../Label";
import SearchUser from "../SearchUser";

const { Option } = Select;

export default function UserContent() {
    const [isAdding, setIsAdding] = useState(false);
    const [addingUser, setAddingUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [search, setSearch] = useState([]);
    const [filter, setFilter] = useState([]);
    const [dataSource, setDataSource] = useState([]);

    const getData = async () => {
        try {
            const response = await axios
                .get("https://chikufarm-app.herokuapp.com/api/users", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "access_token"
                        )}`,
                    },
                })
                .then((res) => {
                    setDataSource(res.data.items);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const addData = async () => {
        console.log(addingUser);
        try {
            const response = await axios
                .post(
                    "https://chikufarm-app.herokuapp.com/api/users/register",
                    addingUser,
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
                    setDataSource(dataSource.concat(res.data));
                    resetAdd();
                });
        } catch (error) {
            console.log(error);
        }
    };

    const editData = async () => {
        const userId = editingUser.id;
        const roleId = editingUser.roleId;

        const updateUser = {
            fullName: editingUser.fullName,
            userName: editingUser.userName,
            email: editingUser.email,
            phone: editingUser.phone,
        };
        const updateRole = {
            id: userId,
            roleId: roleId,
        };

        try {
            const responseUser = await axios
                .put(
                    `https://chikufarm-app.herokuapp.com/api/users/${userId}`,
                    updateUser,
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
                    resetEditing();
                });

            const responseRole = await axios
                .put(
                    "https://chikufarm-app.herokuapp.com/api/users/role/update",
                    updateRole,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "access_token"
                            )}`,
                            "content-type": "application/json",
                        },
                    }
                )
                .then((res) => {
                    console.log(res);
                    getData();
                    resetEditing();
                });
        } catch (error) {
            console.log(error);
        }
    };

    const deleteData = async (record) => {
        const id = record.id;
        try {
            const response = await axios
                .delete(`https://chikufarm-app.herokuapp.com/api/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "access_token"
                        )}`,
                    },
                })
                .then((res) => {
                    console.log(res);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const searchData = async (search, filter) => {
        try {
            const response = await axios
                .get(
                    `https://chikufarm-app.herokuapp.com/api/users?search=${search}&role=${filter}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "access_token"
                            )}`,
                        },
                    }
                )
                .then((res) => {
                    setDataSource(res.data.items);
                });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const columns = [
        {
            title: "Fullname",
            dataIndex: "fullName",
        },
        {
            title: "Username",
            dataIndex: "userName",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Phone",
            dataIndex: "phone",
        },
        {
            title: "Role",
            align: "center",
            dataIndex: "role",
            render: (role) => {
                if (role.roleName == "admin") {
                    return (
                        <div className="rounded-md self-center text-center px-2 py-2 font-semibold text-maroon uppercase text-xs bg-cream">
                            {role.roleName}
                        </div>
                    );
                } else if (role.roleName == "farmer") {
                    return (
                        <div className="rounded-md self-center text-center px-2 py-2 font-semibold text-textColor uppercase text-xs bg-gray-200">
                            {role.roleName}
                        </div>
                    );
                } else {
                    return (
                        <div className="rounded-md self-center text-center px-2 py-2 font-semibold text-textColor uppercase text-xs bg-gray-200">
                            {role.roleName}
                        </div>
                    );
                }
            },
        },
        {
            align: "center",
            title: "Actions",
            render: (record) => {
                return (
                    <div className="text-center">
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
                    </div>
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
                deleteData(record);
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

    const onChangeForm = (e) => {
        e.preventDefault();
    };

    return (
        <div className="my-4 lg:w-3/4 lg:ml-72">
            <div className="p-4 text-lg font-bold text-textColor">
                Data User / All
            </div>
            <div className="p-10 bg-white rounded-lg">
                <div className="flex justify-between pb-5 mb-5 border-b border-gray-200">
                    <SearchUser
                        onChangeSearch={(e) => {
                            setSearch(e.target.value);
                            searchData(e.target.value, filter);
                        }}
                        onChangeSelect={(value) => {
                            setFilter(value);
                            searchData(search, value);
                        }}
                    />
                    <Button
                        className="flex gap-2 items-center px-4 py-4 rounded-lg border-none transition duration-300 text-semibold bg-maroon text-cream hover:bg-maroon hover:text-cream hover:border-none focus:text-cream focus:bg-maroon focus:border-none"
                        onClick={onAddUser}
                    >
                        <MdAdd className="self-center text-lg" />
                        Add
                    </Button>
                </div>
                <Table
                    className="ant-pagination-simple"
                    bordered={true}
                    columns={columns}
                    dataSource={dataSource}
                ></Table>

                {/* Add User */}
                <Modal
                    closable={false}
                    className="overflow-hidden p-0 -my-24 rounded-2xl"
                    title="Add User"
                    visible={isAdding}
                    footer={[
                        <div className="flex justify-center my-2">
                            <Button
                                className="mx-2 w-full font-semibold rounded-md border-maroon text-maroon hover:text-maroon hover:border-maroon focus:text-maroon focus:border-maroon"
                                key="back"
                                onClick={() => {
                                    resetAdd();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="mx-2 w-full font-semibold rounded-md border-maroon bg-maroon text-cream hover:maroon hover:bg-maroon hover:text-cream hover:border-maroon focus:bg-maroon focus:text-cream focus:border-maroon"
                                key="submit"
                                type="submit"
                                onClick={addData}
                            >
                                Add
                            </Button>
                        </div>,
                    ]}
                >
                    <form onSubmit={onChangeForm} method="POST">
                        <Label forInput={"fullName"}>Fullname</Label>
                        <Input
                            className="mb-2 text-sm rounded-lg border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                            value={addingUser?.fullName}
                            placeholder={"Fullname"}
                            onChange={(e) => {
                                setAddingUser((pre) => {
                                    return { ...pre, fullName: e.target.value };
                                });
                            }}
                        />
                        <Label forInput={"userName"}>Username</Label>
                        <Input
                            className="mb-2 text-sm rounded-lg border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                            value={addingUser?.userName}
                            placeholder={"Username"}
                            onChange={(e) => {
                                setAddingUser((pre) => {
                                    return { ...pre, userName: e.target.value };
                                });
                            }}
                        />
                        <Label forInput={"email"}>Email</Label>
                        <Input
                            className="mb-2 text-sm rounded-lg border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                            value={addingUser?.email}
                            placeholder={"Email"}
                            onChange={(e) => {
                                setAddingUser((pre) => {
                                    return { ...pre, email: e.target.value };
                                });
                            }}
                        />
                        <Label forInput={"phone"}>Phone</Label>
                        <Input
                            className="mb-2 text-sm rounded-lg border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                            value={addingUser?.phone}
                            placeholder={"Phone Number"}
                            onChange={(e) => {
                                setAddingUser((pre) => {
                                    return { ...pre, phone: e.target.value };
                                });
                            }}
                        />
                        <Label forInput={"password"}>Password</Label>
                        <Input
                            className="mb-2 text-sm rounded-lg border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                            value={addingUser?.password}
                            placeholder={"Password"}
                            onChange={(e) => {
                                setAddingUser((pre) => {
                                    return { ...pre, password: e.target.value };
                                });
                            }}
                        />
                        <Label forInput={"role"}>User Role</Label>
                        <Select
                            className="mb-2 text-sm rounded-lg border border-textColor hover:border-textColor"
                            placeholder={"Choose Role"}
                            onSelect={(value) => {
                                setAddingUser((pre) => {
                                    return { ...pre, roleId: value };
                                });
                            }}
                            style={{
                                width: 150,
                            }}
                            bordered={false}
                        >
                            <Option
                                className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                value="1c8fcc7d-54fb-440b-8f20-2a0d3860531e"
                            >
                                Admin
                            </Option>
                            <Option
                                className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                value="77114cf2-090d-4f45-9616-f93307d8f06d"
                            >
                                Farmer
                            </Option>
                            <Option
                                className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                value="759077e1-5752-41b7-9fb3-4a4efd27d8d7"
                            >
                                Guest
                            </Option>
                        </Select>
                    </form>
                </Modal>

                {/* Edit User */}
                <Modal
                    closable={false}
                    className="overflow-hidden p-0 -my-10 rounded-2xl"
                    title="Edit User"
                    visible={isEditing}
                    footer={[
                        <div className="flex justify-center my-2">
                            <Button
                                className="mx-2 w-full font-semibold rounded-md border-maroon text-maroon hover:text-maroon hover:border-maroon focus:text-maroon focus:border-maroon"
                                key="back"
                                onClick={() => {
                                    resetEditing();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="mx-2 w-full font-semibold rounded-md border-maroon bg-maroon text-cream hover:maroon hover:bg-maroon hover:text-cream hover:border-maroon focus:bg-maroon focus:text-cream focus:border-maroon"
                                key="submit"
                                type="submit"
                                onClick={editData}
                            >
                                Save
                            </Button>
                        </div>,
                    ]}
                >
                    <Label forInput={"fullName"}>Fullname</Label>
                    <Input
                        className="my-1 text-sm rounded-lg border-textColor hover:border-textColor"
                        value={editingUser?.fullName}
                        onChange={(e) => {
                            setEditingUser((pre) => {
                                return { ...pre, fullName: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"userName"}>Username</Label>
                    <Input
                        className="my-1 text-sm rounded-lg border-textColor hover:border-textColor"
                        value={editingUser?.userName}
                        onChange={(e) => {
                            setEditingUser((pre) => {
                                return { ...pre, userName: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"email"}>Email</Label>
                    <Input
                        className="my-1 text-sm rounded-lg border-textColor hover:border-textColor"
                        value={editingUser?.email}
                        onChange={(e) => {
                            setEditingUser((pre) => {
                                return { ...pre, email: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"phone"}>Phone</Label>
                    <Input
                        className="my-1 text-sm rounded-lg border-textColor hover:border-textColor"
                        value={editingUser?.phone}
                        onChange={(e) => {
                            setEditingUser((pre) => {
                                return { ...pre, phone: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"role"}>User Role</Label>
                    <Select
                        className="my-1 text-sm rounded-lg border border-textColor hover:border-textColor"
                        defaultValue={editingUser?.role.roleName}
                        onChange={(value) => {
                            setEditingUser((pre) => {
                                return { ...pre, roleId: value };
                            });
                        }}
                        style={{
                            width: 120,
                        }}
                        bordered={false}
                    >
                        <Option
                            className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                            value="1c8fcc7d-54fb-440b-8f20-2a0d3860531e"
                        >
                            Admin
                        </Option>
                        <Option
                            className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                            value="77114cf2-090d-4f45-9616-f93307d8f06d"
                        >
                            Farmer
                        </Option>
                        <Option
                            className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                            value="759077e1-5752-41b7-9fb3-4a4efd27d8d7"
                        >
                            Guest
                        </Option>
                    </Select>
                </Modal>
            </div>
        </div>
    );
}
