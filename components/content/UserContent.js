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
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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
                            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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
                            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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
                            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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
                    headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
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
                    { headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` } }
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
            dataIndex: "role",
            render: (role) => role.roleName,
        },
        {
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
                        className="flex items-center gap-2 px-4 py-4 transition duration-300 border-none rounded-lg text-semibold bg-maroon text-cream hover:bg-maroon hover:text-cream hover:border-none focus:text-cream focus:bg-maroon focus:border-none"
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
                    className="p-0 -my-24 overflow-hidden rounded-2xl"
                    title="Add User"
                    visible={isAdding}
                    footer={[
                        <div className="flex justify-center my-2">
                            <Button
                                className="w-full mx-2 font-semibold rounded-md border-maroon text-maroon hover:text-maroon hover:border-maroon focus:text-maroon focus:border-maroon"
                                key="back"
                                onClick={() => {
                                    resetAdd();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="w-full mx-2 font-semibold rounded-md border-maroon bg-maroon text-cream hover:maroon hover:bg-maroon hover:text-cream hover:border-maroon focus:bg-maroon focus:text-cream focus:border-maroon"
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
                            onChange={(e) => {
                                setAddingUser((pre) => {
                                    return { ...pre, password: e.target.value };
                                });
                            }}
                        />
                        <Label forInput={"role"}>User Role</Label>
                        <Select
                            className="mb-2 text-sm border rounded-lg border-textColor hover:border-textColor "
                            onSelect={(value) => {
                                setAddingUser((pre) => {
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
                                value="b6727f48-e1ac-4403-932e-5de35057de73"
                            >
                                Admin
                            </Option>
                            <Option
                                className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                value="4d8b3231-814b-411d-9886-3c806522062d"
                            >
                                Farmer
                            </Option>
                            <Option
                                className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                value="84fa3508-e865-44bc-b328-070783f9ca30"
                            >
                                Guest
                            </Option>
                        </Select>
                    </form>
                </Modal>

                {/* Edit User */}
                <Modal
                    className="p-0 -my-10 overflow-hidden rounded-2xl"
                    title="Edit User"
                    visible={isEditing}
                    footer={[
                        <div className="flex justify-center my-2">
                            <Button
                                className="w-full mx-2 font-semibold rounded-md border-maroon text-maroon hover:text-maroon hover:border-maroon focus:text-maroon focus:border-maroon"
                                key="back"
                                onClick={() => {
                                    resetEditing();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="w-full mx-2 font-semibold rounded-md border-maroon bg-maroon text-cream hover:maroon hover:bg-maroon hover:text-cream hover:border-maroon focus:bg-maroon focus:text-cream focus:border-maroon"
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
                        className="my-1 text-sm rounded-lg border-textColor hover:border-textColor "
                        value={editingUser?.fullName}
                        onChange={(e) => {
                            setEditingUser((pre) => {
                                return { ...pre, fullName: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"userName"}>Username</Label>
                    <Input
                        className="my-1 text-sm rounded-lg border-textColor hover:border-textColor "
                        value={editingUser?.userName}
                        onChange={(e) => {
                            setEditingUser((pre) => {
                                return { ...pre, userName: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"email"}>Email</Label>
                    <Input
                        className="my-1 text-sm rounded-lg border-textColor hover:border-textColor "
                        value={editingUser?.email}
                        onChange={(e) => {
                            setEditingUser((pre) => {
                                return { ...pre, email: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"phone"}>Phone</Label>
                    <Input
                        className="my-1 text-sm rounded-lg border-textColor hover:border-textColor "
                        value={editingUser?.phone}
                        onChange={(e) => {
                            setEditingUser((pre) => {
                                return { ...pre, phone: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"role"}>User Role</Label>
                    <Select
                        className="my-1 text-sm border rounded-lg border-textColor hover:border-textColor"
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
                            value="b6727f48-e1ac-4403-932e-5de35057de73"
                        >
                            Admin
                        </Option>
                        <Option
                            className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                            value="4d8b3231-814b-411d-9886-3c806522062d"
                        >
                            Farmer
                        </Option>
                        <Option
                            className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                            value="84fa3508-e865-44bc-b328-070783f9ca30"
                        >
                            Guest
                        </Option>
                    </Select>
                </Modal>
            </div>
        </div>
    );
}
