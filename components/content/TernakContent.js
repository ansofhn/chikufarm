import React from "react";
import { useEffect, useState } from "react";
import { Button, Table, Modal, Input, Select } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { MdAdd } from "react-icons/md";
import axios from "axios";
import Label from "../Label";
import SearchFarm from "../SearchFarm";

const { Option } = Select;

export default function TernakContent() {
    const [isAdding, setIsAdding] = useState(false);
    const [addingFarm, setAddingFarm] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editingFarm, setEditingFarm] = useState(null);
    const [search, setSearch] = useState([]);
    const [filter, setFilter] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [totalDataFarm, setTotalDataFarm] = useState([]);

    const getData = async (page) => {
        try {
            const responseFarm = await axios
                .get(
                    `https://chikufarm-app.herokuapp.com/api/farm?page=${page}&size=10`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "access_token"
                            )}`,
                        },
                    }
                )
                .then((res) => {
                    setTotalDataFarm(res.data.meta.totalItems);
                    setDataSource(res.data.items);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const addData = async () => {
        console.log(addingFarm);
        try {
            const response = await axios
                .post(
                    "https://chikufarm-app.herokuapp.com/api/farm",
                    addingFarm,
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
        const farmId = editingFarm.id;
        const breedId = editingFarm.breedId;

        const updateFarm = {
            farmName: editingFarm.farmName,
            buyPrice: editingFarm.buyPrice,
            growthTime: editingFarm.growthTime,
        };
        const updateBreed = {
            id: farmId,
            breedId: breedId,
        };
        console.log(updateBreed);

        try {
            const responseFarm = await axios
                .put(
                    `https://chikufarm-app.herokuapp.com/api/farm/${farmId}`,
                    updateFarm,
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

            const responseBreed = await axios
                .put(
                    "https://chikufarm-app.herokuapp.com/api/farm/breed/update",
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
                    getData(1);
                    resetEditing();
                });
        } catch (error) {}
    };

    const deleteData = async (record) => {
        const id = record.id;
        try {
            const response = await axios
                .delete(`https://chikufarm-app.herokuapp.com/api/farm/${id}`, {
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
                    `https://chikufarm-app.herokuapp.com/api/farm?search=${search}&breed=${filter}`,
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
        getData(1);
    }, []);

    const columns = [
        {
            title: "Nama Ternak",
            dataIndex: "farmName",
        },
        {
            title: "Masa Pembesaran",
            dataIndex: "growthTime",
            render: (growthTime) => `${growthTime} Hari`,
            width: 200,
        },
        {
            title: "Harga",
            dataIndex: "buyPrice",
        },
        {
            title: "Kategori Ternak",
            dataIndex: "breed",
            render: (breed) => breed.breedType,
        },
        {
            align: "center",
            title: "Actions",
            render: (record) => {
                return (
                    <div className="text-center">
                        <EditOutlined
                            onClick={() => {
                                onEditFarm(record);
                            }}
                        />
                        <DeleteOutlined
                            onClick={() => {
                                onDeleteFarm(record);
                            }}
                            style={{ color: "maroon", marginLeft: 12 }}
                        />
                    </div>
                );
            },
        },
    ];

    const onAddFarm = () => {
        setIsAdding(true);
        setAddingFarm(null);
    };

    const resetAdd = () => {
        setIsAdding(false);
        setAddingFarm(null);
    };

    const onDeleteFarm = (record) => {
        Modal.confirm({
            title: "Delete Ternak",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                setDataSource((pre) => {
                    return pre.filter((farm) => farm.id !== record.id);
                });
                deleteData(record);
            },
        });
    };

    const onEditFarm = (record) => {
        setIsEditing(true);
        setEditingFarm({ ...record });
    };

    const resetEditing = () => {
        setIsEditing(false);
        setEditingFarm(null);
    };

    const onChangeForm = (e) => {
        e.preventDefault();
    };

    return (
        <div className="my-4 lg:w-3/4 lg:ml-72">
            <div className="p-4 text-lg font-bold text-textColor">
                Data Ternak / All
            </div>
            <div className="p-10 bg-white rounded-lg">
                <div className="flex justify-between pb-5 mb-5 border-b border-gray-200">
                    <SearchFarm
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
                        className="flex gap-2 items-center px-4 py-3 rounded-lg border-none transition duration-300 text-semibold bg-maroon text-cream hover:bg-maroon hover:text-cream hover:border-none focus:text-cream focus:bg-maroon focus:border-none"
                        onClick={onAddFarm}
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
                    pagination={{
                        pageSize: 10,
                        total: totalDataFarm,
                        onChange: (page) => {
                            getData(page);
                        },
                    }}
                ></Table>

                {/* Add Ternak */}
                <Modal
                    closable={false}
                    className="overflow-hidden p-0 rounded-2xl"
                    title="Add Ternak"
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
                        <Label forInput={"farmName"}>Nama Ternak</Label>
                        <Input
                            className="my-1 text-sm rounded-lg border-textColor hover:border-textColor"
                            value={addingFarm?.farmName}
                            placeholder={"Nama Ternak"}
                            onChange={(e) => {
                                setAddingFarm((pre) => {
                                    return { ...pre, farmName: e.target.value };
                                });
                            }}
                        />
                        <Label forInput={"buyPrice"}>Harga</Label>
                        <Input
                            className="my-1 text-sm rounded-lg border-textColor hover:border-textColor"
                            value={addingFarm?.buyPrice}
                            placeholder={"Harga"}
                            onChange={(e) => {
                                setAddingFarm((pre) => {
                                    return { ...pre, buyPrice: e.target.value };
                                });
                            }}
                        />
                        <Label forInput={"growthTime"}>Masa Pembesaran</Label>
                        <Input
                            className="my-1 text-sm rounded-lg border-textColor hover:border-textColor"
                            value={addingFarm?.growthTime}
                            placeholder={"Masa Pembesaran"}
                            onChange={(e) => {
                                setAddingFarm((pre) => {
                                    return {
                                        ...pre,
                                        growthTime: e.target.value,
                                    };
                                });
                            }}
                        />
                        <Label forInput={"breed"}>Kategori Ternak</Label>
                        <Select
                            className="my-1 w-1/3 text-sm rounded-lg border border-textColor hover:border-textColor"
                            placeholder={"Pilih Kategori"}
                            onSelect={(value) => {
                                setAddingFarm((pre) => {
                                    return { ...pre, breedId: value };
                                });
                            }}
                            bordered={false}
                        >
                            <Option
                                className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                value="f0503001-246d-412e-bba0-6167684e007b"
                            >
                                Ayam Petelur
                            </Option>
                            <Option
                                className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                value="11b40011-8ec1-4b08-8ca6-d377ee6ede13"
                            >
                                Ayam Pedaging
                            </Option>
                            <Option
                                className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                value="95000005-ab6e-4782-8b26-312b484edfc6"
                            >
                                Ayam Aduan
                            </Option>
                        </Select>
                    </form>
                </Modal>

                {/* Edit Ternak */}
                <Modal
                    closable={false}
                    className="overflow-hidden p-0 rounded-2xl"
                    title="Edit Ternak"
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
                                onClick={editData}
                            >
                                Save
                            </Button>
                        </div>,
                    ]}
                >
                    <Label forInput={"farmName"}>Nama Ternak</Label>
                    <Input
                        className="my-1 text-sm rounded-lg border-textColor hover:border-textColor"
                        value={editingFarm?.farmName}
                        onChange={(e) => {
                            setEditingFarm((pre) => {
                                return { ...pre, farmName: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"buyPrice"}>Harga</Label>
                    <Input
                        className="my-1 text-sm rounded-lg border-textColor hover:border-textColor"
                        value={editingFarm?.buyPrice}
                        onChange={(e) => {
                            setEditingFarm((pre) => {
                                return { ...pre, buyPrice: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"growthTime"}>Masa Pembesaran</Label>
                    <Input
                        className="my-1 text-sm rounded-lg border-textColor hover:border-textColor"
                        value={editingFarm?.growthTime}
                        onChange={(e) => {
                            setEditingFarm((pre) => {
                                return { ...pre, growthTime: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"breed"}>Kategori Ternak</Label>
                    <Select
                        className="my-1 w-1/3 text-sm rounded-lg border border-textColor hover:border-textColor"
                        defaultValue={editingFarm?.breed.breedType}
                        onSelect={(value) => {
                            setEditingFarm((pre) => {
                                return { ...pre, breedId: value };
                            });
                        }}
                        bordered={false}
                    >
                        <Option
                            className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                            value="f0503001-246d-412e-bba0-6167684e007b"
                        >
                            Ayam Petelur
                        </Option>
                        <Option
                            className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                            value="11b40011-8ec1-4b08-8ca6-d377ee6ede13"
                        >
                            Ayam Pedaging
                        </Option>
                        <Option
                            className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                            value="95000005-ab6e-4782-8b26-312b484edfc6"
                        >
                            Ayam Aduan
                        </Option>
                    </Select>
                </Modal>
            </div>
        </div>
    );
}
