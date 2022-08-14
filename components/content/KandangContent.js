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
    const [farm, setFarm] = useState([]);
    const [feed, setFeed] = useState([]);

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
                    console.log(res.data.items);
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
                    // console.log(res.data.items);
                    setFarm(res.data.items);
                });
            const responseFeed = await axios
                .get("https://chikufarm-app.herokuapp.com/api/feed", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "access_token"
                        )}`,
                    },
                })
                .then((res) => {
                    // console.log(res.data.items);
                    setFeed(res.data.items);
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
                    getData();
                    resetAdd();
                });
        } catch (error) {
            console.log(error);
        }
    };

    const editData = async () => {
        const coopId = editingKandang.id;

        const updateCoop = {
            coopNumber: editingKandang.coopNum,
            populationStart: editingKandang.populationStart,
            dateIn: editingKandang.dateIn,
        };
        console.log(updateCoop);
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
        getData();
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
            dataIndex: "feedRecomendation",
            render: (feedRecomendation) =>
                feedRecomendation.masterFeed.feedName,
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
                    return pre.filter((kandang) => kandang.id !== record.id);
                });
                deleteData(record);
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
                ></Table>

                {/* Add Coop */}
                <Modal
                    closable={false}
                    className="-my-14 overflow-hidden p-0 rounded-2xl"
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
                            value={addingKandang?.coopNumber}
                            placeholder={"Nomor Kandang"}
                            onChange={(e) => {
                                setAddingKandang((pre) => {
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
                            value={addingKandang?.populationStart}
                            placeholder="Populasi Awal"
                            onChange={(e) => {
                                setAddingKandang((pre) => {
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
                                setAddingKandang((pre) => {
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
                                setAddingKandang((pre) => {
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
                        <Label forInput={"feedName"}>Nama Pakan</Label>
                        <Select
                            className="my-1 w-2/5 text-sm rounded-lg border border-textColor hover:border-textColor"
                            placeholder="Choose Feed Name"
                            onSelect={(value) => {
                                setAddingKandang((pre) => {
                                    return { ...pre, masterFeedId: value };
                                });
                            }}
                            bordered={false}
                        >
                            {feed.map((dataId) => {
                                return (
                                    <Option
                                        className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                        value={dataId.id}
                                    >
                                        {dataId.feedName}
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
                        // value={editingKandang?.coopNumber}
                        placeholder={editingKandang?.coopNumber}
                        onChange={(e) => {
                            setEditingKandang((pre) => {
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
                        value={editingKandang?.populationStart}
                        onChange={(e) => {
                            setEditingKandang((pre) => {
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
                        value={editingKandang?.dateIn}
                        onChange={(e) => {
                            setEditingKandang((pre) => {
                                return {
                                    ...pre,
                                    dateIn: e.target.value,
                                };
                            });
                        }}
                    />
                </Modal>
            </div>
        </div>
    );
}
