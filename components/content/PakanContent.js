import React from "react";
import { useEffect, useState } from "react";
import { Button, Table, Modal, Input, Select, Pagination } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { MdAdd } from "react-icons/md";
import axios from "axios";
import Label from "../Label";
import SearchFeed from "../SearchFeed";

const { Option } = Select;

export default function PakanContent() {
    const [isAdding, setIsAdding] = useState(false);
    const [addingPakan, setAddingPakan] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editingPakan, setEditingPakan] = useState(null);
    const [isDetail, setIsDetail] = useState(false);
    const [detailPakan, setDetailPakan] = useState(null);
    const [search, setSearch] = useState([]);
    const [filter, setFilter] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [historySource, setHistorySource] = useState([]);

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
                    console.log(res.data.items);
                    setDataSource(res.data.items);
                });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const addData = async () => {
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
    
    const editData = async () => {
        
        const feedId = editingPakan.id;

        const updateFeed = {
            feedName: editingPakan.feedName,
            feedType: editingPakan.feedType,
            pricePerKg: editingPakan.pricePerKg,
        };

        try {
            const response = await axios
                .put(
                    `https://chikufarm-app.herokuapp.com/api/feed/${feedId}`,
                    updateFeed,
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
        } catch (error) {}
    };

    const deleteData = async (record) => {
        console.log(record.id);
        const id = record.id;
        try {
            const response = await axios
                .delete(`https://chikufarm-app.herokuapp.com/api/feed/${id}`, {
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
                    `https://chikufarm-app.herokuapp.com/api/feed?search=${search}&breed=${filter}`,
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
        } catch (error) {}
    };

    const getHistory = async (record) => {
        console.log(record.id);
        const id = record.id;
        try {
            const response = await axios
                .get(`https://chikufarm-app.herokuapp.com/api/feed/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "access_token"
                        )}`,
                    },
                })
                .then((res) => {
                    console.log(res.data.feedHistory);
                    setHistorySource(res.data.feedHistory);
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
            title: "Kategori Ternak",
            dataIndex: "breed",
            render: (breed) => breed.breedType,
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
                            className="text-maroon ml-3"
                            onClick={() => {
                                onDeletePakan(record);
                            }}
                        />
                        <EyeOutlined
                            className="text-textColor ml-3"
                            onClick={() => {
                                onDetail(record);
                            }}
                        />
                    </>
                );
            },
        },
    ];

    const columnHistory = [
        {
            title: "Date",
            dataIndex: "createdAt",
            render:(createdAt)=>{
                return `${createdAt.substring(0,10)}`
            }
        },
        {
            title: "Stock",
            dataIndex: "feedQuantity",
        },
        {
            title: "Status",
            dataIndex: "historyStatus",
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
                            className="text-maroon ml-3"
                            onClick={() => {
                                onDeletePakan(record);
                            }}
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
                deleteData(record);
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

    const onDetail = (record) => {
        getHistory(record);
        setDetailPakan({ ...record });
        setIsDetail(true);
    };
    const resetDetail = () => {
        setIsDetail(false);
        setDetailPakan(null);
    };

    const onChangeForm = (e) => {
        e.preventDefault();
    };

    console.log(editingPakan)
    
    return (
        <div className="my-4 lg:w-3/4 lg:ml-72">
            <div className="p-4 text-lg font-bold text-textColor">
                Data Pakan / All
            </div>

            <div className="p-10 bg-white rounded-lg">
                <div className="flex justify-between mb-5 pb-5 border-b border-gray-200">
                    <SearchFeed
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
                    className="p-0 -my-24 overflow-hidden rounded-2xl"
                    title="Add Pakan"
                    visible={isAdding}
                    footer={[
                        <div className="flex justify-center my-2">
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
                        <Label forInput={"feedQuantity"}>Jumlah Pakan</Label>
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
                        <Label forInput={"categoryTernak"}>
                            Kategori Ternak
                        </Label>
                        <Select
                            className="w-2/5 my-1 text-sm border rounded-lg border-textColor hover:border-textColor"
                            placeholder="Kategori Ternak"
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
                                Ayam Aduan
                            </Option>
                        </Select>
                    </form>
                </Modal>

                {/* Edit User */}
                <Modal
                    className="rounded-2xl overflow-hidden p-0"
                    title="Edit Pakan"
                    visible={isEditing}
                    footer={[
                        <div className="flex justify-center py-2">
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
                                onClick={editData}
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

                {/* Detail Pakan */}
                <Modal
                    className="rounded-2xl overflow-hidden p-0 -my-20"
                    visible={isDetail}
                    title="History Pakan"
                    footer={[
                        <div className="flex justify-center py-2">
                            <Button
                                className="w-full mx-2 rounded-md border-maroon text-maroon font-semibold hover:text-maroon hover:border-maroon focus:text-maroon focus:border-maroon"
                                key="back"
                                onClick={() => {
                                    resetDetail();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="w-full mx-2 rounded-md border-maroon bg-maroon text-cream font-semibold hover:maroon hover:bg-maroon hover:text-cream hover:border-maroon focus:bg-maroon focus:text-cream focus:border-maroon"
                                key="submit"
                                onClick={editData}
                            >
                                Save
                            </Button>
                        </div>,
                    ]}
                >
                    <Table
                        bordered={true}
                        columns={columnHistory}
                        dataSource={historySource}
                        pagination={false}
                    ></Table>
                </Modal>
            </div>
        </div>
    );
}
