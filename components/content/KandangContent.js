import { Button, Table, Modal, Input } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Label from "../Label";
import { MdAdd } from "react-icons/md";
import React from "react";

export default function UserContent() {
    const [isAdding, setIsAdding] = useState(false);
    const [addingKandang, setAddingKandang] = useState(null);

    const [isEditing, setIsEditing] = useState(false);
    const [editingKandang, setEditingKandang] = useState(null);
    const [dataSource, setDataSource] = useState([
        {
            noKandang: "K" + 9991,
            type: "Ayam",
            population: 25,
            dateIn: "24-12-22",
            status: "Progress",
        },
        {
            noKandang: "K" + 9992,
            type: "Bebek",
            population: 20,
            dateIn: "25-12-22",
            status: "Progress",
        },
    ]);
    const columns = [
        {
            key: "1",
            title: "Kode Kandang",
            dataIndex: "noKandang",
        },
        {
            key: "2",
            title: "Jenis Ternak",
            dataIndex: "type",
        },
        {
            key: "3",
            title: "Populasi",
            dataIndex: "population",
        },
        {
            key: "4",
            title: "Tanggal Masuk",
            dataIndex: "dateIn",
        },
        {
            key: "5",
            title: "Status",
            dataIndex: "status",
        },
        {
            key: "6",
            title: "Actions",
            render: (record) => {
                return (
                    <>
                        <EditOutlined
                            onClick={() => {
                                onEditKandang(record);
                            }}
                        />
                        <DeleteOutlined
                            onClick={() => {
                                onDeleteKandang(record);
                            }}
                            style={{ color: "maroon", marginLeft: 12 }}
                        />
                    </>
                );
            },
        },
    ];

    const onAddKandang = () => {
        setIsAdding(true);
        setAddingKandang(null);
    };

    const resetAdd = () => {
        setIsAdding(false);
        setAddingKandang(null);
    };

    const onDeleteKandang = (record) => {
        Modal.confirm({
            title: "Delete Pakan",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                setDataSource((pre) => {
                    return pre.filter((kandang) => kandang.noKandang !== record.noKandang);
                });
            },
        });
    };
    const onEditKandang = (record) => {
        setIsEditing(true);
        setEditingKandang({ ...record });
    };
    const resetEditing = () => {
        setIsEditing(false);
        setEditingKandang(null);
    };
    return (
        <div className="my-4 lg:w-3/4 lg:ml-72">
            <div className="p-4 text-lg font-bold text-textColor">
                Data Kandang / All
            </div>

            <div className="p-10 bg-white rounded-lg">
                <div className="flex justify-end mb-5 pb-5 border-b border-gray-200">
                    <Button
                        className="transition duration-300 text-semibold rounded-lg items-center gap-2 flex px-4 py-3 bg-maroon text-cream border-none hover:bg-maroon hover:text-cream hover:border-none focus:text-cream focus:bg-maroon focus:border-none"
                        onClick={onAddKandang}
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
                    title="Add Kandang"
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
                                    addingKandang["noKandang"] = "K" + uuid;

                                    setDataSource([...dataSource, addingKandang]);
                                    resetAdd();
                                }}
                            >
                                Add
                            </Button>
                        </div>,
                    ]}
                >
                    <Label forInput={"type"}>Jenis Ternak</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={addingKandang?.type}
                        onChange={(e) => {
                            setAddingKandang((pre) => {
                                return { ...pre, type: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"population"}>Populasi</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={addingKandang?.population}
                        onChange={(e) => {
                            setAddingKandang((pre) => {
                                return { ...pre, population: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"dateIn"}>Tanggal Masuk</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={addingKandang?.dateIn}
                        onChange={(e) => {
                            setAddingKandang((pre) => {
                                return { ...pre, dateIn: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"status"}>Status</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={addingKandang?.status}
                        onChange={(e) => {
                            setAddingKandang((pre) => {
                                return { ...pre, status: e.target.value };
                            });
                        }}
                    />
                    
                </Modal>

                {/* Edit User */}
                <Modal
                    className="rounded-lg overflow-hidden p-0"
                    title="Edit Kandang"
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
                                        return pre.map((kandang) => {
                                            if (kandang.noKandang === editingKandang.noKandang) {
                                                return editingKandang;
                                            } else {
                                                return kandang;
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
                    <Label forInput={"type"}>Jenis Ternak</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={editingKandang?.type}
                        onChange={(e) => {
                            setEditingKandang((pre) => {
                                return { ...pre, type: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"population"}>Populasi</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={editingKandang?.population}
                        onChange={(e) => {
                            setEditingKandang((pre) => {
                                return { ...pre, population: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"dateIn"}>Tanggal Masuk</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={editingKandang?.dateIn}
                        onChange={(e) => {
                            setEditingKandang((pre) => {
                                return { ...pre, dateIn: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"status"}>Status</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={editingKandang?.status}
                        onChange={(e) => {
                            setEditingKandang((pre) => {
                                return { ...pre, status: e.target.value };
                            });
                        }}
                    />
                </Modal>
            </div>
        </div>
    );
}
