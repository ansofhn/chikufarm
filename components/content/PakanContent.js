import React from "react";
import { useEffect, useState } from "react";
import { Button, Table, Modal, Input, Select } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { MdAdd } from "react-icons/md";
import axios from "axios";
import Label from "../Label";
import SearchFeed from "../SearchFeed";

const { Option } = Select;

export default function UserContent() {
    const [isAdding, setIsAdding] = useState(false);
    const [addingPakan, setAddingPakan] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editingPakan, setEditingPakan] = useState(null);
    const [search, setSearch] = useState([]);
    const [filter, setFilter] = useState([]);
    const [dataSource, setDataSource] = useState([]);

    const [breedData, setBreedData] = useState([]);

    const getData = async () => {
        try {
            const response = await axios
                .get("https://chikufarm-app.herokuapp.com/api/feed", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "access_token"
                        )}`,
                    },
                })
                .then((res) => {
                    console.log(res);
                    setDataSource(res.data[0]);
                });

            const breedId = await axios
                .get("https://chikufarm-app.herokuapp.com/api/breed", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "access_token"
                        )}`,
                    },
                })
                .then((res) => {
                    console.log(res.data[0]);
                    setBreedData(res.data[0])
                });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const addData = async () => {
        console.log(addingPakan);
        try {
            const response = await axios
                .post(
                    "https://chikufarm-app.herokuapp.com/api/feed",
                    addingPakan,
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
                    console.log(res.data);
                    setDataSource(dataSource.concat(res.data));
                    resetAdd();
                });
        } catch (error) {
            console.log(error);
        }
    };

    const columns = [
        {
            title: "Nama Pakan",
            dataIndex: "feedName",
        },
        {
            title: "Jenis Pakan",
            dataIndex: "feedType",
        },
        {
            title: "Harga / Kg",
            dataIndex: "pricePerKg",
        },
        {
            title: "Stock",
            dataIndex: "feedStock",
            render: (feedStock) => feedStock[0].stock,
        },
        {
            title: "Status",
            dataIndex: "feedHistory",
            render: (feedHistory) => feedHistory[0].historyStatus,
        },
        {
            title: "Actions",
            render: (record) => {
                return (
                    <>
                        <EditOutlined
                            onClick={() => {
                                onEditPakan(record);
                            }}
                        />
                        <DeleteOutlined
                            onClick={() => {
                                onDeletePakan(record);
                            }}
                            style={{ color: "maroon", marginLeft: 12 }}
                        />
                    </>
                );
            },
        },
    ];

    const onAddPakan = () => {
        setIsAdding(true);
        setAddingPakan(null);
    };

    const resetAdd = () => {
        setIsAdding(false);
        setAddingPakan(null);
    };

    const onDeletePakan = (record) => {
        Modal.confirm({
            title: "Delete Pakan",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                setDataSource((pre) => {
                    return pre.filter((pakan) => pakan.id !== record.id);
                });
            },
        });
    };
    const onEditPakan = (record) => {
        setIsEditing(true);
        setEditingPakan({ ...record });
    };
    const resetEditing = () => {
        setIsEditing(false);
        setEditingPakan(null);
    };
    const onChangeForm = (e) => {
        e.preventDefault();
    };

    return (
        <div className="my-4 lg:w-3/4 lg:ml-72">
            <div className="p-4 text-lg font-bold text-textColor">
                Data Pakan / All
            </div>

            <div className="p-10 bg-white rounded-lg">
                <div className="flex justify-end mb-5 pb-5 border-b border-gray-200">
                    <Button
                        className="transition duration-300 text-semibold rounded-lg items-center gap-2 flex px-4 py-3 bg-maroon text-cream border-none hover:bg-maroon hover:text-cream hover:border-none focus:text-cream focus:bg-maroon focus:border-none"
                        onClick={onAddPakan}
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

                {/* Add Pakan */}
                <Modal
                    className="rounded-lg overflow-hidden p-0"
                    title="Add Pakan"
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
                                type="submit"
                                onClick={addData}
                            >
                                Add
                            </Button>
                        </div>,
                    ]}
                >
                    <form onSubmit={onChangeForm} method="POST">
                        <Label forInput={"feedName"}>Nama Pakan</Label>
                        <Input
                            className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                            value={addingPakan?.feedName}
                            onChange={(e) => {
                                setAddingPakan((pre) => {
                                    return { ...pre, feedName: e.target.value };
                                });
                            }}
                        />
                        <Label forInput={"feedType"}>Jenis Pakan</Label>
                        <Input
                            className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                            value={addingPakan?.feedType}
                            onChange={(e) => {
                                setAddingPakan((pre) => {
                                    return { ...pre, feedType: e.target.value };
                                });
                            }}
                        />
                        <Label forInput={"feedQuantity"}>Stock Pakan</Label>
                        <Input
                            className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                            value={addingPakan?.feedQuantity}
                            onChange={(e) => {
                                setAddingPakan((pre) => {
                                    return {
                                        ...pre,
                                        feedQuantity: e.target.value,
                                    };
                                });
                            }}
                        />
                        <Label forInput={"pricePerKg"}>Harga / Kg</Label>
                        <Input
                            className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                            value={addingPakan?.pricePerKg}
                            onChange={(e) => {
                                setAddingPakan((pre) => {
                                    return {
                                        ...pre,
                                        pricePerKg: e.target.value,
                                    };
                                });
                            }}
                        />
                        <Label forInput={"categoryTernak"}>Kategori Ternak</Label>
                        <Select
                            className="w-1/3 my-1 text-sm border rounded-lg border-textColor hover:border-textColor"
                            placeholder="Category Ternak"
                            onSelect={(value) => {
                                setAddingPakan((pre) => {
                                    return { ...pre, breedId: value };
                                });
                            }}
                            bordered={false}
                        >
                            <Option
                            className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                            value="72274e48-977e-4451-9df1-a1b5a8df59ad"
                        >
                            Ayam Petelur
                        </Option>
                        <Option
                            className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                            value="d54f904b-6741-469b-842a-7012131dd093"
                        >
                            Ayam Pedaging
                        </Option>
                        <Option
                            className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                            value="54c2e855-49f1-4e7e-a5c6-3531377a8c4f"
                        >
                            Ayam Petarunk
                        </Option>
                        </Select>
                    </form>
                </Modal>

                {/* Edit User */}
                <Modal
                    className="rounded-lg overflow-hidden p-0"
                    title="Edit Pakan"
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
                                        return pre.map((pakan) => {
                                            if (pakan.id === editingPakan.id) {
                                                return editingPakan;
                                            } else {
                                                return pakan;
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
                    <Label forInput={"feedName"}>Nama Pakan</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={editingPakan?.feedName}
                        onChange={(e) => {
                            setEditingPakan((pre) => {
                                return { ...pre, feedName: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"feedType"}>Jenis Pakan</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={editingPakan?.feedType}
                        onChange={(e) => {
                            setEditingPakan((pre) => {
                                return { ...pre, feedType: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"feedQuantity"}>Stock Pakan</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={editingPakan?.feedQuantity}
                        onChange={(e) => {
                            setEditingPakan((pre) => {
                                return { ...pre, feedQuantity: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"pricePerKg"}>Harga / Kg</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={editingPakan?.pricePerKg}
                        onChange={(e) => {
                            setEditingPakan((pre) => {
                                return { ...pre, pricePerKg: e.target.value };
                            });
                        }}
                    />
                </Modal>
            </div>
        </div>
    );
}
