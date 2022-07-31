import { Button, Table, Modal, Input } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Label from "../Label";
import { MdAdd } from "react-icons/md";
import React from "react";

export default function UserContent() {
    const [isAdding, setIsAdding] = useState(false);
    const [addingTernak, setAddingTernak] = useState(null);

    const [isEditing, setIsEditing] = useState(false);
    const [editingTernak, setEditingTernak] = useState(null);
    const [dataSource, setDataSource] = useState([
        {
            id: 9991,
            name: "Ayam",
            type: "Petelur",
            price: "Rp. 100,000,-",
            longlife: "24 day",
        },
        {
            id: 9992,
            name: "Ayam",
            type: "Petarung",
            price: "Rp. 250,000,-",
            longlife: "24 day",
        },
    ]);
    const columns = [
        {
            key: "1",
            title: "Nama Ternak",
            dataIndex: "name",
        },
        {
            key: "2",
            title: "Jenis Ternak",
            dataIndex: "type",
        },
        {
            key: "3",
            title: "Harga",
            dataIndex: "price",
        },
        {
            key: "4",
            title: "Masa Pembesaran",
            dataIndex: "longlife",
        },
        {
            key: "5",
            title: "Actions",
            render: (record) => {
                return (
                    <>
                        <EditOutlined
                            onClick={() => {
                                onEditTernak(record);
                            }}
                        />
                        <DeleteOutlined
                            onClick={() => {
                                onDeleteTernak(record);
                            }}
                            style={{ color: "maroon", marginLeft: 12 }}
                        />
                    </>
                );
            },
        },
    ];

    const onAddTernak = () => {
        setIsAdding(true);
        setAddingTernak(null);
    };

    const resetAdd = () => {
        setIsAdding(false);
        setAddingTernak(null);
    };

    const onDeleteTernak = (record) => {
        Modal.confirm({
            title: "Delete Ternak",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                setDataSource((pre) => {
                    return pre.filter((ternak) => ternak.id !== record.id);
                });
            },
        });
    };
    const onEditTernak = (record) => {
        setIsEditing(true);
        setEditingTernak({ ...record });
    };
    const resetEditing = () => {
        setIsEditing(false);
        setEditingTernak(null);
    };
    return (
        <div className="my-4 lg:w-3/4 lg:ml-72">
            <div className="p-4 text-lg font-bold text-textColor">
                Data Ternak / All
            </div>

            <div className="p-10 bg-white rounded-lg">
                <div className="flex justify-end mb-5 pb-5 border-b border-gray-200">
                    <Button
                        className="transition duration-300 text-semibold rounded-lg items-center gap-2 flex px-4 py-3 bg-maroon text-cream border-none hover:bg-maroon hover:text-cream hover:border-none focus:text-cream focus:bg-maroon focus:border-none"
                        onClick={onAddTernak}
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
                    title="Add Ternak"
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
                                    addingTernak["id"] = uuid;

                                    setDataSource([...dataSource, addingTernak]);
                                    resetAdd();
                                }}
                            >
                                Add
                            </Button>
                        </div>,
                    ]}
                >
                    <Label forInput={"name"}>Nama Ternak</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={addingTernak?.name}
                        onChange={(e) => {
                            setAddingTernak((pre) => {
                                return { ...pre, name: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"type"}>Jenis Ternak</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={addingTernak?.type}
                        onChange={(e) => {
                            setAddingTernak((pre) => {
                                return { ...pre, type: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"price"}>Harga</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={addingTernak?.price}
                        onChange={(e) => {
                            setAddingTernak((pre) => {
                                return { ...pre, price: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"longlife"}>Masa Pembesaran</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={addingTernak?.longlife}
                        onChange={(e) => {
                            setAddingTernak((pre) => {
                                return { ...pre, longlife: e.target.value };
                            });
                        }}
                    />
                    
                </Modal>

                {/* Edit User */}
                <Modal
                    className="rounded-lg overflow-hidden p-0"
                    title="Edit Ternak"
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
                                        return pre.map((ternak) => {
                                            if (ternak.id === editingTernak.id) {
                                                return editingTernak;
                                            } else {
                                                return ternak;
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
                    <Label forInput={"name"}>Nama Ternak</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={editingTernak?.name}
                        onChange={(e) => {
                            setEditingTernak((pre) => {
                                return { ...pre, name: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"type"}>Jenis Ternak</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={editingTernak?.type}
                        onChange={(e) => {
                            setEditingTernak((pre) => {
                                return { ...pre, type: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"price"}>Harga</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={editingTernak?.price}
                        onChange={(e) => {
                            setEditingTernak((pre) => {
                                return { ...pre, price: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"longlife"}>Masa Pembesaran</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={editingTernak?.longlife}
                        onChange={(e) => {
                            setEditingTernak((pre) => {
                                return { ...pre, longlife: e.target.value };
                            });
                        }}
                    />
                </Modal>
            </div>
        </div>
    );
}
