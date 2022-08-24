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
    const [addingCoop, setAddingCoop] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editingCoop, setEditingCoop] = useState(null);
    const [search, setSearch] = useState([]);
    const [filter, setFilter] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const [coop, setCoop] = useState([]);
    const [farm, setFarm] = useState([]);
    const [user, setUser] = useState([]);
    const [totalDataCoop, setTotalDataCoop] = useState([]);

    const [isCreate, setIsCreate] = useState(false);
    const [creatingHarvest, setCreatingHarvest] = useState(null);

    const getData = async (page) => {
        try {
            const coopdata = await axios
                .get(
                    `https://chikufarm-app.herokuapp.com/api/coop?page=${page}&size=10`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "access_token"
                            )}`,
                        },
                    }
                )
                .then((res) => {
                    setTotalDataCoop(res.data.meta.totalItems);
                    setDataSource(res.data.items);
                });

            const responseFarm = await axios
                .get("https://chikufarm-app.herokuapp.com/api/farm", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "access_token"
                        )}`,
                    },
                })
                .then((res) => {
                    setFarm(res.data.items);
                });
            const responseUser = await axios
                .get(
                    "https://chikufarm-app.herokuapp.com/api/users?role=farmer",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "access_token"
                            )}`,
                        },
                    }
                )
                .then((res) => {
                    setUser(res.data.items);
                });

            const responseCoop = await axios
                .get("https://chikufarm-app.herokuapp.com/api/coop", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "access_token"
                        )}`,
                    },
                })
                .then((res) => {
                    setCoop(res.data.items);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const addData = async () => {
        try {
            const response = await axios
                .post(
                    "https://chikufarm-app.herokuapp.com/api/coop",
                    addingCoop,
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
                    getData(1);
                    resetAdd();
                });
        } catch (error) {
            console.log(error);
        }
    };

    const createPanen = async () => {
        try {
            const response = await axios
                .post(
                    "https://chikufarm-app.herokuapp.com/api/harvest/create",
                    creatingHarvest,
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
                    getData(1);
                    resetCreate();
                });
        } catch (error) {
            console.log(error);
        }
    };

    const editData = async () => {
        const coopId = editingCoop.id;

        const updateCoop = {
            coopNumber: editingCoop.coopNum,
            populationStart: editingCoop.populationStart,
            dateIn: editingCoop.dateIn,
            userId: editingCoop.userId,
        };
        try {
            const responseCoop = await axios
                .put(
                    `https://chikufarm-app.herokuapp.com/api/coop/${coopId}`,
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
                    getData(1);
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
                    `https://chikufarm-app.herokuapp.com/api/coop?search=${search}&farm=${filter}`,
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
            title: "Nomor Kandang",
            dataIndex: "coopNumber",
            width: 100,
            align: "center",
        },
        {
            title: "Nama Ternak",
            dataIndex: "farm",
            render: (farm) => farm.farmName,
        },
        {
            title: "Nama Pakan",
            width: 150,
            dataIndex: "masterFeed",
            render: (masterFeed) => masterFeed.feedName,
        },
        {
            title: "Populasi Awal",
            dataIndex: "populationStart",
            width: 100,
            align: "center",
        },
        {
            title: "Populasi Update",
            dataIndex: "populationUpdate",
            width: 100,
            align: "center",
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
            align: "center",
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
        setAddingCoop(null);
    };

    const resetAdd = () => {
        setIsAdding(false);
        setAddingCoop(null);
    };

    const onCreatePanen = () => {
        setIsCreate(true);
        setCreatingHarvest(null);
    };

    const resetCreate = () => {
        setIsCreate(false);
        setCreatingHarvest(null);
    };

    const onDeleteKandang = (record) => {
        Modal.confirm({
            title: "Delete Pakan",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                setDataSource((pre) => {
                    return pre.filter((kandang) => kandang.id !== record.id);
                });
                deleteData(record);
            },
        });
    };
    const onEditKandang = (record) => {
        setIsEditing(true);
        setEditingCoop({ ...record });
    };
    const resetEditing = () => {
        setIsEditing(false);
        setEditingCoop(null);
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
                <div className="flex justify-between pb-5 mb-5 border-b border-gray-200">
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
                        className="flex gap-2 items-center px-4 py-3 rounded-lg border-none transition duration-300 text-semibold bg-maroon text-cream hover:bg-maroon hover:text-cream hover:border-none focus:text-cream focus:bg-maroon focus:border-none"
                        onClick={onAddKandang}
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
                        total: totalDataCoop,
                        onChange: (page) => {
                            getData(page);
                        },
                    }}
                ></Table>

                <Button
                    className="w-full my-2 uppercase rounded-lg border-none transition duration-300 font-semibold bg-cream text-maroon hover:bg-maroon hover:text-cream hover:border-none focus:text-cream focus:bg-maroon focus:border-none"
                    onClick={onCreatePanen}
                >
                    panen
                </Button>

                {/* Add Coop */}
                <Modal
                    closable={false}
                    className=" -my-24 overflow-hidden p-0 rounded-2xl"
                    title="Add Kandang"
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
                        <Label forInput={"coopNumber"}>Nomor Kandang</Label>
                        <Input
                            className="my-1 text-sm rounded-lg border-textColor hover:border-textColor"
                            value={addingCoop?.coopNumber}
                            placeholder={"Nomor Kandang"}
                            onChange={(e) => {
                                setAddingCoop((pre) => {
                                    return {
                                        ...pre,
                                        coopNumber: e.target.value,
                                    };
                                });
                            }}
                        />
                        <Label forInput={"populationStart"}>
                            Populasi Awal
                        </Label>
                        <Input
                            className="my-1 text-sm rounded-lg border-textColor hover:border-textColor"
                            value={addingCoop?.populationStart}
                            placeholder="Populasi Awal"
                            onChange={(e) => {
                                setAddingCoop((pre) => {
                                    return {
                                        ...pre,
                                        populationStart: e.target.value,
                                    };
                                });
                            }}
                        />
                        <Label forInput={"dateIn"}>Tanggal Masuk</Label>
                        <Input
                            className="my-1 text-sm rounded-lg border-textColor hover:border-textColor"
                            placeholder="Year-Month-Day"
                            onChange={(e) => {
                                setAddingCoop((pre) => {
                                    return {
                                        ...pre,
                                        dateIn: e.target.value,
                                    };
                                });
                            }}
                        />
                        <Label forInput={"farmName"}>Nama Ternak</Label>
                        <Select
                            className="my-1 w-2/5 text-sm rounded-lg border border-textColor hover:border-textColor"
                            placeholder="Choose Farm Name"
                            onSelect={(value) => {
                                setAddingCoop((pre) => {
                                    return { ...pre, farmId: value };
                                });
                            }}
                            bordered={false}
                        >
                            {farm.map((dataId) => {
                                return (
                                    <Option
                                        className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                        value={dataId.id}
                                    >
                                        {dataId.farmName}
                                    </Option>
                                );
                            })}
                        </Select>
                        <Label forInput={"farmer"}>Farmer</Label>
                        <Select
                            className="my-1 w-2/5 text-sm rounded-lg border border-textColor hover:border-textColor"
                            placeholder="Choose Farmer"
                            onSelect={(value) => {
                                setAddingCoop((pre) => {
                                    return { ...pre, userId: value };
                                });
                            }}
                            bordered={false}
                        >
                            {user.map((dataId) => {
                                return (
                                    <Option
                                        className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                        value={dataId.id}
                                    >
                                        {dataId.fullName}
                                    </Option>
                                );
                            })}
                        </Select>
                    </form>
                </Modal>

                {/* Edit Coop */}
                <Modal
                    closable={false}
                    className="overflow-hidden p-0 rounded-2xl"
                    title="Edit Kandang"
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
                    <Label forInput={"coopNumber"}>Nomor Kandang</Label>
                    <Input
                        className="my-1 text-sm rounded-lg border-textColor hover:border-textColor"
                        // value={editingCoop?.coopNumber}
                        placeholder={editingCoop?.coopNumber}
                        onChange={(e) => {
                            setEditingCoop((pre) => {
                                return {
                                    ...pre,
                                    coopNum: e.target.value,
                                };
                            });
                        }}
                    />
                    <Label forInput={"populationStart"}>Populasi Awal</Label>
                    <Input
                        className="my-1 text-sm rounded-lg border-textColor hover:border-textColor"
                        value={editingCoop?.populationStart}
                        onChange={(e) => {
                            setEditingCoop((pre) => {
                                return {
                                    ...pre,
                                    populationStart: e.target.value,
                                };
                            });
                        }}
                    />
                    <Label forInput={"dateIn"}>Tanggal Masuk</Label>
                    <Input
                        className="my-1 text-sm rounded-lg border-textColor hover:border-textColor"
                        value={editingCoop?.dateIn}
                        onChange={(e) => {
                            setEditingCoop((pre) => {
                                return {
                                    ...pre,
                                    dateIn: e.target.value,
                                };
                            });
                        }}
                    />
                    <Label forInput={"farmer"}>Penanggung Jawab</Label>
                    <Select
                        className="my-1 w-2/5 text-sm rounded-lg border border-textColor hover:border-textColor"
                        placeholder={editingCoop?.user.fullName}
                        onSelect={(value) => {
                            setEditingCoop((pre) => {
                                return { ...pre, userId: value };
                            });
                        }}
                        bordered={false}
                    >
                        {user.map((dataId) => {
                            return (
                                <Option
                                    className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                    value={dataId.id}
                                >
                                    {dataId.fullName}
                                </Option>
                            );
                        })}
                    </Select>
                </Modal>

                {/* Create Harvest */}
                <Modal
                    closable={false}
                    className=" -my-24 overflow-hidden p-0 rounded-2xl"
                    title="Create Harvest"
                    visible={isCreate}
                    footer={[
                        <div className="flex justify-center my-2">
                            <Button
                                className="mx-2 w-full font-semibold rounded-md border-maroon text-maroon hover:text-maroon hover:border-maroon focus:text-maroon focus:border-maroon"
                                key="back"
                                onClick={() => {
                                    resetCreate();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="mx-2 w-full font-semibold rounded-md border-maroon bg-maroon text-cream hover:maroon hover:bg-maroon hover:text-cream hover:border-maroon focus:bg-maroon focus:text-cream focus:border-maroon"
                                key="submit"
                                type="submit"
                                onClick={createPanen}
                            >
                                Create
                            </Button>
                        </div>,
                    ]}
                >
                    <form onSubmit={onChangeForm} method="POST">
                        <Label forInput={"coopNumber"}>Kandang</Label>
                        <Select
                            className="w-2/5 my-1 text-sm border rounded-lg border-textColor hover:border-textColor"
                            placeholder="Pilih Kandang"
                            onSelect={(value) => {
                                setCreatingHarvest((pre) => {
                                    return { ...pre, coopId: value };
                                });
                            }}
                            bordered={false}
                        >
                            {coop.map((dataId) => {
                                return (
                                    <Option
                                        className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                        value={dataId.id}
                                    >
                                        {`Kandang ${dataId.coopNumber}`}
                                    </Option>
                                );
                            })}
                        </Select>
                        <Label forInput={"totalFarmWeight"}>
                            Total Berat Ternak
                        </Label>
                        <Input
                            className="my-1 text-sm rounded-lg border-textColor hover:border-textColor"
                            placeholder="Enter Total Weight"
                            onChange={(e) => {
                                setCreatingHarvest((pre) => {
                                    return {
                                        ...pre,
                                        totalFarmWeight: e.target.value,
                                    };
                                });
                            }}
                        />
                        <Label forInput={"death"}>Kematian</Label>
                        <Input
                            className="my-1 text-sm rounded-lg border-textColor hover:border-textColor"
                            placeholder="Jumlah Kematian"
                            onChange={(e) => {
                                setCreatingHarvest((pre) => {
                                    return {
                                        ...pre,
                                        death: e.target.value,
                                    };
                                });
                            }}
                        />
                        <Label forInput={"harvestTime"}>Tanggal Panen</Label>
                        <Input
                            className="my-1 text-sm rounded-lg border-textColor hover:border-textColor"
                            placeholder="Year-Month-Day"
                            onChange={(e) => {
                                setCreatingHarvest((pre) => {
                                    return {
                                        ...pre,
                                        harvestTime: e.target.value,
                                    };
                                });
                            }}
                        />
                    </form>
                </Modal>
            </div>
        </div>
    );
}
