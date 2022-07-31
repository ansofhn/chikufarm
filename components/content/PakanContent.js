import { Button, Table, Modal, Input } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Label from "../Label";
import { MdAdd } from "react-icons/md";
import React from "react";

export default function UserContent() {
    const [isAdding, setIsAdding] = useState(false);
    const [addingPakan, setAddingPakan] = useState(null);

    const [isEditing, setIsEditing] = useState(false);
    const [editingPakan, setEditingPakan] = useState(null);
    const [dataSource, setDataSource] = useState([
        {
            id: 9991,
            name: "Sorgum",
            type: "Pakan Ayam",
            stock: "200 Kg",
            status: "Tersedia",
        },
        {
            id: 9992,
            name: "Dedak",
            type: "Pakan Bebek",
            stock: "150 Kg",
            status: "Tersedia",
        },
    ]);
    const columns = [
        {
            key: "1",
            title: "Nama Pakan",
            dataIndex: "name",
        },
        {
            key: "2",
            title: "Jenis Pakan",
            dataIndex: "type",
        },
        {
            key: "3",
            title: "Stock",
            dataIndex: "stock",
        },
        {
            key: "4",
            title: "Status",
            dataIndex: "status",
        },
        {
            key: "5",
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

                {/* Add User */}
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
                                onClick={() => {
                                    const uuid = Math.floor(
                                        1000 + Math.random() * 9000
                                    );
                                    addingPakan["id"] = uuid;

                                    setDataSource([...dataSource, addingPakan]);
                                    resetAdd();
                                }}
                            >
                                Add
                            </Button>
                        </div>,
                    ]}
                >
                    <Label forInput={"name"}>Nama Pakan</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={addingPakan?.name}
                        onChange={(e) => {
                            setAddingPakan((pre) => {
                                return { ...pre, name: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"type"}>Jenis Pakan</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={addingPakan?.type}
                        onChange={(e) => {
                            setAddingPakan((pre) => {
                                return { ...pre, type: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"stock"}>Stock Pakan</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={addingPakan?.stock}
                        onChange={(e) => {
                            setAddingPakan((pre) => {
                                return { ...pre, stock: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"status"}>Status</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={addingPakan?.status}
                        onChange={(e) => {
                            setAddingPakan((pre) => {
                                return { ...pre, status: e.target.value };
                            });
                        }}
                    />
                    
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
                    <Label forInput={"name"}>Nama Pakan</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={editingPakan?.name}
                        onChange={(e) => {
                            setEditingPakan((pre) => {
                                return { ...pre, name: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"type"}>Jenis Pakan</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={editingPakan?.type}
                        onChange={(e) => {
                            setEditingPakan((pre) => {
                                return { ...pre, type: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"stock"}>Stock Pakan</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={editingPakan?.stock}
                        onChange={(e) => {
                            setEditingPakan((pre) => {
                                return { ...pre, stock: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"status"}>Status</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={editingPakan?.status}
                        onChange={(e) => {
                            setEditingPakan((pre) => {
                                return { ...pre, status: e.target.value };
                            });
                        }}
                    />
                </Modal>
            </div>
        </div>
    );
}
