import React from "react";
import { useEffect, useState } from "react";
import { Button, Table, Modal, Input, Select } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { MdAdd } from "react-icons/md";
import axios from "axios";
import Label from "../Label";
import SearchCoop from "../SearchCoop";

const { Option } = Select;

export default function KandangContent() {
    const [isAdding, setIsAdding] = useState(false);
    const [addingKandang, setAddingKandang] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editingKandang, setEditingKandang] = useState(null);
    const [search, setSearch] = useState([]);
    const [filter, setFilter] = useState([]);
    const [dataSource, setDataSource] = useState([]);

    const getData = async () => {
        try {
            const coopdata = await axios
                .get("https://chikufarm-app.herokuapp.com/api/coop", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "access_token"
                        )}`,
                    },
                })
                .then((res) => {
                    console.log(res.data)
                    setDataSource(res.data.items);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const addData = async () => {
        console.log(addingKandang);
        try {
            const response = await axios
                .post(
                    "https://chikufarm-app.herokuapp.com/api/coop",
                    addingKandang,
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
                    setDataSource(dataSource.concat(res.data));
                    resetAdd();
                });
        } catch (error) {
            console.log(error);
        }
    };

    const editData = async () => {
        const coopId = editingKandang.id;
        const breedId = editingKandang.breedId;

        const updateCoop = {
            farmName: editingKandang.farmName,
            buyPrice: editingKandang.buyPrice,
            growthTime: editingKandang.growthTime,
        };
        const updateBreed = {
            breedType: editingKandang.breed.breedType,
        };

        try {
            const responseFarm = await axios
                .put(
                    `https://chikufarm-app.herokuapp.com/api/farm/${coopId}`,
                    updateCoop,
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

            const responseBreed = await axios
                .put(
                    `https://chikufarm-app.herokuapp.com/api/breed/${breedId}`,
                    updateBreed,
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
        } catch (error) {}
    };

    const deleteData = async (record) => {
        const id = record.id;
        try {
            const response = await axios
                .delete(`https://chikufarm-app.herokuapp.com/api/coop/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "access_token"
                        )}`,
                    },
                })
                .then((res) => {
                    console.log(res);
                });
        } catch (error) {}
    };

    const searchData = async (search, filter) => {
        try {
            const response = await axios
                .get(
                    `https://chikufarm-app.herokuapp.com/api/coop?search=${search}&breed=${filter}`,
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

    useEffect(() => {
        getData();
    }, []);

    const columns = [
        {
            title: "Nomor Kandang",
            dataIndex: "coopNumber",
        },
        {
            title: "Populasi Awal",
            dataIndex: "populationStart",
        },
        {
            title: "Populasi Update",
            dataIndex: "populationUpdate",
        },
        {
            title: "Tanggal Masuk",
            dataIndex: "dateIn",
        },
        {
            title: "Tanggal Panen",
            dataIndex: "harvestTime",
        },
        {
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
                    return pre.filter(
                        (kandang) => kandang.noKandang !== record.noKandang
                    );
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

    const onChangeForm = (e) => {
        e.preventDefault();
    };

    return (
        <div className="my-4 lg:w-3/4 lg:ml-72">
            <div className="p-4 text-lg font-bold text-textColor">
                Data Kandang / All
            </div>

            <div className="p-10 bg-white rounded-lg">
                <div className="flex justify-between mb-5 pb-5 border-b border-gray-200">
                    <SearchCoop
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
                                type="submit"
                                onClick={addData}
                            >
                                Add
                            </Button>
                        </div>,
                    ]}
                >
                    <form onSubmit={onChangeForm} method="POST">
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
                                    return {
                                        ...pre,
                                        population: e.target.value,
                                    };
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
                    </form>
                </Modal>

                {/* Edit Kandang */}
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
                                onClick={editData}
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
