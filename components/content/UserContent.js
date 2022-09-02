import React from "react";
import { useEffect, useState } from "react";
import { Button, Table, Modal, Input, Select } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { MdAdd } from "react-icons/md";
import axios from "axios";
import Label from "../Label";
import SearchUser from "../SearchUser";
import Link from "next/link";
import Swal from "sweetalert2";

const { Option } = Select;

export default function UserContent() {
    const [isAdding, setIsAdding] = useState(false);
    const [addingUser, setAddingUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [search, setSearch] = useState([]);
    const [filter, setFilter] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [totalDataUser, setTotalDataUser] = useState([]);

    const getData = async (page) => {
        try {
            const response = await axios
                .get(
                    `https://chikufarm-app.herokuapp.com/api/users?page=${page}&size=10`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "access_token"
                            )}`,
                        },
                    }
                )
                .then((res) => {
                    setTotalDataUser(res.data.meta.totalItems);
                    setDataSource(res.data.items);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const getExcel = async () => {
        try {
            const response = await axios
                .get(
                    "https://chikufarm-app.herokuapp.com/api/users/download/excel",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "access_token"
                            )}`,
                        },
                    }
                )
                .then((res) => {
                    console.log(res);
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
                    getData(1);
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
                    getData(1);
                    resetEditing();
                });
        } catch (error) {
            console.log(error.response.data.message);
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
        getData(1);
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
                        <div className="self-center px-2 py-2 text-xs font-semibold text-center uppercase rounded-md text-maroon bg-cream">
                            {role.roleName}
                        </div>
                    );
                } else if (role.roleName == "farmer") {
                    return (
                        <div className="self-center px-2 py-2 text-xs font-semibold text-center uppercase bg-gray-200 rounded-md text-textColor">
                            {role.roleName}
                        </div>
                    );
                } else {
                    return (
                        <div className="self-center px-2 py-2 text-xs font-semibold text-center uppercase bg-gray-200 rounded-md text-textColor">
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
            title: "Are you sure?",
            content: "Delete this user",
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
        <div className="my-4 lg:w-3/4 lg:ml-72 2xl:w-10/12">
            <div className="p-4 text-lg font-bold text-textColor">
                User Data / All
            </div>
            <div className="p-10 bg-white rounded-xl">
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
                    <div className="flex gap-2">
                        <Link
                            href={
                                "https://chikufarm-app.herokuapp.com/api/users/download/excel"
                            }
                        >
                            <Button
                                className="flex items-center gap-2 px-4 py-4 font-medium transition duration-300 border-none rounded-md bg-maroon text-cream hover:bg-maroon hover:text-cream hover:border-none focus:text-cream focus:bg-maroon focus:border-none"
                                onClick={getExcel}
                            >
                                Export
                            </Button>
                        </Link>

                        <Button
                            className="flex items-center gap-2 px-4 py-4 font-medium transition duration-300 border-none rounded-md bg-maroon text-cream hover:bg-maroon hover:text-cream hover:border-none focus:text-cream focus:bg-maroon focus:border-none"
                            onClick={onAddUser}
                        >
                            Add User
                        </Button>
                    </div>
                </div>
                <Table
                    className="ant-pagination-simple"
                    bordered={true}
                    columns={columns}
                    dataSource={dataSource}
                    pagination={{
                        pageSize: 10,
                        className: "pt-2",
                        total: totalDataUser,
                        onChange: (page) => {
                            getData(page);
                        },
                    }}
                ></Table>

                {/* Add User */}
                <Modal
                    className="p-0 -my-24 overflow-hidden rounded-xl"
                    title={[
                        <div className="mx-1 my-1 font-semibold font-montserrat text-textColor">
                            Add New User
                        </div>,
                    ]}
                    onCancel={() => {
                        resetAdd();
                    }}
                    visible={isAdding}
                    footer={null}
                >
                    <form onSubmit={onChangeForm} method="POST">
                        <Label forInput={"fullName"}>Fullname</Label>
                        <Input
                            className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
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
                            className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
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
                            className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                            value={addingUser?.email}
                            placeholder={"Email"}
                            type="email"
                            onChange={(e) => {
                                setAddingUser((pre) => {
                                    return { ...pre, email: e.target.value };
                                });
                            }}
                        />
                        <Label forInput={"phone"}>Phone</Label>
                        <Input
                            className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
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
                            className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                            value={addingUser?.password}
                            placeholder={"Password"}
                            type="password"
                            onChange={(e) => {
                                setAddingUser((pre) => {
                                    return { ...pre, password: e.target.value };
                                });
                            }}
                        />
                        <Label forInput={"role"}>User Role</Label>
                        <Select
                            className="mb-2 text-sm border rounded-md border-textColor hover:border-textColor"
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
                                value="a15743f2-6dc5-4a45-be7d-1e74b1310375"
                            >
                                Admin
                            </Option>
                            <Option
                                className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                value="f26d05af-85fd-49f7-bfcf-850ea0e41c1c"
                            >
                                Farmer
                            </Option>
                            <Option
                                className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                value="4da2e875-baa7-43b4-824f-ba934fa94511"
                            >
                                Guest
                            </Option>
                        </Select>
                        <div className="flex justify-center gap-2 mt-6">
                            <Button
                                className="w-full font-semibold rounded-md border-maroon text-maroon hover:text-maroon hover:border-maroon focus:text-maroon focus:border-maroon"
                                key="back"
                                onClick={() => {
                                    resetAdd();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="w-full font-semibold rounded-md border-maroon bg-maroon text-cream hover:maroon hover:bg-maroon hover:text-cream hover:border-maroon focus:bg-maroon focus:text-cream focus:border-maroon"
                                key="submit"
                                type="submit"
                                onClick={addData}
                            >
                                Add
                            </Button>
                        </div>
                    </form>
                </Modal>

                {/* Edit User */}
                <Modal
                    className="p-0 -my-10 overflow-hidden rounded-xl"
                    title={[
                        <div className="mx-1 my-1 font-semibold font-montserrat text-textColor">
                            Edit User
                        </div>,
                    ]}
                    onCancel={() => {
                        resetEditing();
                    }}
                    visible={isEditing}
                    footer={null}
                >
                    <Label forInput={"fullName"}>Fullname</Label>
                    <Input
                        className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                        value={editingUser?.fullName}
                        onChange={(e) => {
                            setEditingUser((pre) => {
                                return { ...pre, fullName: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"userName"}>Username</Label>
                    <Input
                        className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                        value={editingUser?.userName}
                        onChange={(e) => {
                            setEditingUser((pre) => {
                                return { ...pre, userName: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"email"}>Email</Label>
                    <Input
                        className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                        value={editingUser?.email}
                        onChange={(e) => {
                            setEditingUser((pre) => {
                                return { ...pre, email: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"phone"}>Phone</Label>
                    <Input
                        className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                        value={editingUser?.phone}
                        onChange={(e) => {
                            setEditingUser((pre) => {
                                return { ...pre, phone: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"role"}>User Role</Label>
                    <Select
                        className="mb-2 text-sm border rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
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
                            value="a15743f2-6dc5-4a45-be7d-1e74b1310375"
                        >
                            Admin
                        </Option>
                        <Option
                            className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                            value="f26d05af-85fd-49f7-bfcf-850ea0e41c1c"
                        >
                            Farmer
                        </Option>
                        <Option
                            className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                            value="4da2e875-baa7-43b4-824f-ba934fa94511"
                        >
                            Guest
                        </Option>
                    </Select>

                    <div className="flex justify-center gap-2 mt-6">
                        <Button
                            className="w-full font-semibold rounded-md border-maroon text-maroon hover:text-maroon hover:border-maroon focus:text-maroon focus:border-maroon"
                            key="back"
                            onClick={() => {
                                resetEditing();
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="w-full font-semibold rounded-md border-maroon bg-maroon text-cream hover:maroon hover:bg-maroon hover:text-cream hover:border-maroon focus:bg-maroon focus:text-cream focus:border-maroon"
                            key="submit"
                            type="submit"
                            onClick={editData}
                        >
                            Save
                        </Button>
                    </div>
                </Modal>
            </div>
        </div>
    );
}
