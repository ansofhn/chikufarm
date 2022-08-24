import React from "react";
import { useEffect, useState } from "react";
import { Button, Table, Modal, Input, Select } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { MdAdd } from "react-icons/md";
import axios from "axios";
import Label from "../Label";
import SearchFeed from "../SearchFeed";

const { Option } = Select;

export default function PakanContent() {
    const [isAdding, setIsAdding] = useState(false);
    const [addingFeed, setAddingFeed] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editingFeed, setEditingFeed] = useState(null);
    const [totalDataFeed, setTotalDataFeed] = useState([]);
    const [search, setSearch] = useState([]);
    const [filter, setFilter] = useState([]);
    const [dataSource, setDataSource] = useState([]);

    const [isDetail, setIsDetail] = useState(false);
    const [isAddingHistory, setIsAddingHistory] = useState(false);
    const [addingHistory, setAddingHistory] = useState(null);
    const [isEditingHistory, setIsEditingHistory] = useState(false);
    const [editingHistory, setEditingHistory] = useState(null);
    const [historySource, setHistorySource] = useState([]);

    const [farm, setFarm] = useState([]);

    const [feedRecommend, setFeedRecommend] = useState([]);
    const [isAddingRecommend, setIsAddingRecommend] = useState(false);
    const [addingRecommend, setAddingRecommend] = useState(null);
    const [isEditingRecommend, setIsEditingRecommend] = useState(false);
    const [editingRecommend, setEditingRecommend] = useState(null);
    const [totalDataRecommend, setTotalDataRecommend] = useState([]);

    const getData = async (pageFeed) => {
        try {
            const responseFeed = await axios
                .get(
                    `https://chikufarm-app.herokuapp.com/api/feed?page=${pageFeed}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "access_token"
                            )}`,
                        },
                    }
                )
                .then((res) => {
                    console.log(res.data.meta);
                    setTotalDataFeed(res.data.meta.totalItems);
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
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData(1);
        getDataRecommend(1);
    }, []);

    const addDataFeed = async () => {
        try {
            const response = await axios
                .post(
                    "https://chikufarm-app.herokuapp.com/api/feed",
                    addingFeed,
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

    const editDataFeed = async () => {
        const feedId = editingFeed.id;
        const breedId = editingFeed.breedId;
        const updateFeed = {
            feedName: editingFeed.feedName,
            feedType: editingFeed.feedType,
            pricePerKg: editingFeed.pricePerKg,
        };
        const updateBreed = {
            id: feedId,
            breedId: breedId,
        };

        try {
            const responseFeed = await axios
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
                    getData(1);
                    resetEditing();
                });

            const responseBreed = await axios
                .put(
                    "https://chikufarm-app.herokuapp.com/api/feed/breed/update",
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
                    getData(1);
                    resetEditing();
                });
        } catch (error) {}
    };

    const deleteDataFeed = async (record) => {
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
        console.log(record);
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
                    setHistorySource(res.data.feedHistory);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const addHistory = async () => {
        try {
            const response = await axios
                .post(
                    "https://chikufarm-app.herokuapp.com/api/feed-history",
                    addingHistory,
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
                    setHistorySource(historySource.concat(res.data));
                    resetAddHistory();
                });
        } catch (error) {
            console.log(error);
        }
    };
    const editHistory = async () => {
        const historyId = editingHistory.id;
        const updateHistory = {
            feedQuantity: editingHistory.feedQuantity,
        };
        try {
            const response = await axios
                .put(
                    `https://chikufarm-app.herokuapp.com/api/feed-history/${historyId}`,
                    updateHistory,
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
                    resetEditingHistory();
                    setTimeout((res) => setIsDetail(false), 500);
                });
        } catch (error) {}
    };

    const getDataRecommend = async (pageRecommend) => {
        try {
            const responseRecommend = await axios
                .get(
                    `https://chikufarm-app.herokuapp.com/api/feed-recomendation?page=${pageRecommend}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "access_token"
                            )}`,
                        },
                    }
                )
                .then((res) => {
                    console.log(res.data);
                    setTotalDataRecommend(res.data.meta.totalItems);
                    setFeedRecommend(res.data.items);
                });
        } catch (error) {}
    };

    const addRecomendation = async () => {
        try {
            const response = await axios
                .post(
                    "https://chikufarm-app.herokuapp.com/api/feed-recomendation",
                    addingRecommend,
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
                    setFeedRecommend(feedRecommend.concat(res.data));
                    resetAddRecomendation();
                });
        } catch (error) {
            console.log(error);
        }
    };
    const editRecomendation = async () => {
        const recomendationId = editingRecommend.id;
        const updateRecomendation = {
            week: editingRecommend.week,
            feedQuantity: editingRecommend.feedQuantity,
            farmId: editingRecommend.farmId,
            masterFeedId: editingRecommend.masterFeedId,
        };
        try {
            const response = await axios
                .put(
                    `https://chikufarm-app.herokuapp.com/api/feed-recomendation/${recomendationId}`,
                    updateRecomendation,
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
                    getDataRecommend(1);
                    resetEditingRecomendation();
                });
        } catch (error) {}
    };

    const deleteRecomendation = async (record) => {
        const id = record.id;
        try {
            const response = await axios
                .delete(
                    `https://chikufarm-app.herokuapp.com/api/feed-recomendation/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "access_token"
                            )}`,
                        },
                    }
                )
                .then((res) => {
                    console.log(res);
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
            align: "center",
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
            title: "Stock",
            align: "center",
            dataIndex: "feedStock",
            render: (feedStock) => {
                return `${(feedStock.stock/1).toFixed(1)} Kg`;
            },
        },
        {
            align: "center",
            title: "Actions",
            render: (record) => {
                return (
                    <div className="text-center">
                        <EditOutlined
                            onClick={() => {
                                onEditFeed(record);
                            }}
                        />
                        <DeleteOutlined
                            className="ml-3 text-maroon"
                            onClick={() => {
                                onDeleteFeed(record);
                            }}
                        />
                        <EyeOutlined
                            className="ml-3 text-textColor"
                            onClick={() => {
                                onDetail(record);
                            }}
                        />
                    </div>
                );
            },
        },
    ];

    const columnHistory = [
        {
            title: "Date",
            dataIndex: "createdAt",
            render: (createdAt) => {
                return `${createdAt.substring(0, 10)}`;
            },
        },
        {
            title: "Quantity",
            dataIndex: "feedQuantity",
            render: (feedQuantity) => {
                return `${feedQuantity} Kg`;
            },
        },
        {
            title: "Status",
            dataIndex: "historyStatus",
            align: "center",
        },
        {
            align: "center",
            title: "Actions",
            render: (record) => {
                return (
                    <div className="text-center">
                        <EditOutlined
                            className="ml-3"
                            onClick={() => {
                                onEditHistory(record);
                            }}
                        />
                    </div>
                );
            },
        },
    ];

    const columnRecommend = [
        {
            title: "Week",
            dataIndex: "week",
            align: "center",
        },
        {
            title: "Nama Ternak",
            dataIndex: "farm",
            render: (farm) => farm.farmName,
        },
        {
            title: "Nama Pakan",
            dataIndex: "masterFeed",
            render: (masterFeed) => masterFeed.feedName,
        },
        {
            title: "Jumlah Pakan",
            dataIndex: "feedQuantityOnGram",
            render: (feedQuantityOnGram) => `${feedQuantityOnGram} gram`,
        },
        {
            align: "center",
            title: "Actions",
            render: (record) => {
                return (
                    <div className="text-center">
                        <EditOutlined
                            className="ml-3"
                            onClick={() => {
                                onEditRecomendation(record);
                            }}
                        />
                        <DeleteOutlined
                            className="ml-3 text-maroon"
                            onClick={() => {
                                onDeleteRecomendation(record);
                            }}
                        />
                    </div>
                );
            },
        },
    ];

    const onAddFeed = () => {
        setIsAdding(true);
        setAddingFeed(null);
    };

    const resetAdd = () => {
        setIsAdding(false);
        setAddingFeed(null);
    };

    const onDeleteFeed = (record) => {
        Modal.confirm({
            title: "Delete Pakan",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                setDataSource((pre) => {
                    return pre.filter((feed) => feed.id !== record.id);
                });
                deleteDataFeed(record);
            },
        });
    };

    const onDeleteRecomendation = (record) => {
        Modal.confirm({
            title: "Delete Recomendation",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                setFeedRecommend((pre) => {
                    return pre.filter((recomend) => recomend.id !== record.id);
                });
                deleteRecomendation(record);
            },
        });
    };
    const onEditFeed = (record) => {
        setIsEditing(true);
        setEditingFeed({ ...record });
    };
    const resetEditing = () => {
        setIsEditing(false);
        setEditingFeed(null);
    };

    const onAddHistory = () => {
        setIsAddingHistory(true);
        setAddingHistory(null);
    };

    const resetAddHistory = () => {
        setIsAddingHistory(false);
        setAddingHistory(null);
    };

    const onEditHistory = (record) => {
        setIsEditingHistory(true);
        setEditingHistory({ ...record });
    };
    const resetEditingHistory = () => {
        setIsEditingHistory(false);
        setEditingHistory(null);
    };

    const onAddRecomendation = () => {
        setIsAddingRecommend(true);
        setAddingRecommend(null);
    };

    const resetAddRecomendation = () => {
        setIsAddingRecommend(false);
        setAddingRecommend(null);
    };

    const onEditRecomendation = (record) => {
        setIsEditingRecommend(true);
        setEditingRecommend({ ...record });
    };
    const resetEditingRecomendation = () => {
        setIsEditingRecommend(false);
        setEditingRecommend(null);
    };

    const onDetail = (record) => {
        getHistory(record);
        setIsDetail(true);
    };
    const resetDetail = () => {
        setIsDetail(false);
    };

    const onChangeForm = (e) => {
        e.preventDefault();
    };

    return (
        <div className="my-4 lg:w-3/4 lg:ml-72">
            <div className="p-4 text-lg font-bold text-textColor">
                Data Pakan / All
            </div>

            <div className="p-10 bg-white rounded-xl">
                <div className="flex justify-between pb-5 mb-5 border-b border-gray-200">
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
                    <div className="flex items-center p-1">
                        <Button
                            className="w-40 mx-2 font-semibold rounded-md border-maroon bg-maroon text-cream hover:maroon hover:bg-maroon hover:text-cream hover:border-maroon focus:bg-maroon focus:text-cream focus:border-maroon"
                            onClick={onAddHistory}
                        >
                            Create History
                        </Button>
                        <Button
                            className="flex items-center gap-2 px-4 py-3 font-semibold transition duration-300 border-none rounded-lg text-semibold bg-maroon text-cream hover:bg-maroon hover:text-cream hover:border-none focus:text-cream focus:bg-maroon focus:border-none"
                            onClick={onAddFeed}
                        >
                            <MdAdd className="self-center text-lg" />
                            Add
                        </Button>
                    </div>
                </div>
                <Table
                    className="ant-pagination-simple"
                    bordered={true}
                    columns={columns}
                    dataSource={dataSource}
                    pagination={{
                        pageSize: 10,
                        total: totalDataFeed,
                        onChange: (page) => {
                            getData(page);
                        },
                    }}
                ></Table>

                {/* Add Pakan */}
                <Modal
                    closable={false}
                    className="p-0 -my-24 overflow-hidden rounded-2xl"
                    title="Add Pakan"
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
                                onClick={addDataFeed}
                            >
                                Add
                            </Button>
                        </div>,
                    ]}
                >
                    <form onSubmit={onChangeForm} method="POST">
                        <Label forInput={"feedName"}>Nama Pakan</Label>
                        <Input
                            className="my-1 text-sm rounded-lg border-textColor hover:border-textColor"
                            value={addingFeed?.feedName}
                            placeholder={"Nama Pakan"}
                            onChange={(e) => {
                                setAddingFeed((pre) => {
                                    return { ...pre, feedName: e.target.value };
                                });
                            }}
                        />
                        <Label forInput={"pricePerKg"}>Harga / Kg</Label>
                        <Input
                            className="my-1 text-sm rounded-lg border-textColor hover:border-textColor"
                            value={addingFeed?.pricePerKg}
                            placeholder={"Harga Pakan / Kg"}
                            onChange={(e) => {
                                setAddingFeed((pre) => {
                                    return {
                                        ...pre,
                                        pricePerKg: e.target.value,
                                    };
                                });
                            }}
                        />
                        <Label forInput={"feedQuantity"}>Jumlah Pakan</Label>
                        <Input
                            className="my-1 text-sm rounded-lg border-textColor hover:border-textColor"
                            value={addingFeed?.feedQuantity}
                            placeholder={"Jumlah Pakan"}
                            onChange={(e) => {
                                setAddingFeed((pre) => {
                                    return {
                                        ...pre,
                                        feedQuantity: e.target.value,
                                    };
                                });
                            }}
                        />
                        <Label forInput={"feedType"}>Jenis Pakan</Label>
                        <Select
                            className="w-2/5 my-1 text-sm border rounded-lg border-textColor hover:border-textColor"
                            placeholder="Pilih Jenis Pakan"
                            onSelect={(value) => {
                                setAddingFeed((pre) => {
                                    return { ...pre, feedType: value };
                                });
                            }}
                            bordered={false}
                        >
                            <Option
                                className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                value="starter"
                            >
                                Starter
                            </Option>
                            <Option
                                className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                value="finisher"
                            >
                                Finisher
                            </Option>
                        </Select>
                        <Label forInput={"categoryTernak"}>
                            Kategori Ternak
                        </Label>
                        <Select
                            className="w-2/5 my-1 text-sm border rounded-lg border-textColor hover:border-textColor"
                            placeholder="Kategori Ternak"
                            onSelect={(value) => {
                                setAddingFeed((pre) => {
                                    return { ...pre, breedId: value };
                                });
                            }}
                            bordered={false}
                        >
                            <Option
                                className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                value="62db6618-43ab-4fc6-b2ef-189c0a5a033f"
                            >
                                Ayam Petelur
                            </Option>
                            <Option
                                className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                value="84beb255-4ce4-476e-b42a-d79c935e780f"
                            >
                                Ayam Pedaging
                            </Option>
                            <Option
                                className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                value="40625ead-1a06-41cf-b35e-dceb97fb4487"
                            >
                                Ayam Aduan
                            </Option>
                        </Select>
                    </form>
                </Modal>

                {/* Edit Pakan */}
                <Modal
                    closable={false}
                    className="p-0 overflow-hidden rounded-2xl"
                    title="Edit Pakan"
                    visible={isEditing}
                    footer={[
                        <div className="flex justify-center py-2">
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
                                onClick={editDataFeed}
                            >
                                Save
                            </Button>
                        </div>,
                    ]}
                >
                    <Label forInput={"feedName"}>Nama Pakan</Label>
                    <Input
                        className="my-1 text-sm rounded-lg border-textColor hover:border-textColor"
                        value={editingFeed?.feedName}
                        onChange={(e) => {
                            setEditingFeed((pre) => {
                                return { ...pre, feedName: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"feedType"}>Jenis Pakan</Label>
                    <Select
                            className="w-2/5 my-1 text-sm border rounded-lg border-textColor hover:border-textColor"
                            placeholder={editingFeed?.feedType}
                            onSelect={(value) => {
                                setEditingFeed((pre) => {
                                    return { ...pre, feedType: value };
                                });
                            }}
                            bordered={false}
                        >
                            <Option
                                className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                value="starter"
                            >
                                Starter
                            </Option>
                            <Option
                                className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                value="finisher"
                            >
                                Finisher
                            </Option>
                        </Select>
                    <Label forInput={"pricePerKg"}>Harga / Kg</Label>
                    <Input
                        className="my-1 text-sm rounded-lg border-textColor hover:border-textColor"
                        value={editingFeed?.pricePerKg}
                        onChange={(e) => {
                            setEditingFeed((pre) => {
                                return { ...pre, pricePerKg: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"breed"}>Kategori Ternak</Label>
                    <Select
                        className="w-1/3 my-1 text-sm border rounded-lg border-textColor hover:border-textColor"
                        defaultValue={editingFeed?.breed.breedType}
                        onSelect={(value) => {
                            setEditingFeed((pre) => {
                                return { ...pre, breedId: value };
                            });
                        }}
                        bordered={false}
                    >
                        <Option
                            className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                            value="62db6618-43ab-4fc6-b2ef-189c0a5a033f"
                        >
                            Ayam Petelur
                        </Option>
                        <Option
                            className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                            value="84beb255-4ce4-476e-b42a-d79c935e780f"
                        >
                            Ayam Pedaging
                        </Option>
                        <Option
                            className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                            value="40625ead-1a06-41cf-b35e-dceb97fb4487"
                        >
                            Ayam Aduan
                        </Option>
                    </Select>
                </Modal>

                {/* Detail Pakan */}
                <Modal
                    width={700}
                    closable={false}
                    className="p-0 -my-20 overflow-hidden rounded-2xl "
                    visible={isDetail}
                    title="Detail Pakan"
                    footer={[
                        <div className="flex justify-center py-2">
                            <Button
                                className="w-full mx-2 font-semibold rounded-md border-maroon text-maroon hover:text-maroon hover:border-maroon focus:text-maroon focus:border-maroon"
                                key="back"
                                onClick={() => {
                                    resetDetail();
                                }}
                            >
                                Cancel
                            </Button>
                        </div>,
                    ]}
                >
                    <Table
                        className="ant-pagination-simple"
                        bordered={true}
                        columns={columnHistory}
                        dataSource={historySource}
                        // pagination={{
                        //     pageSize: 10,
                        //     total: totalDataCoop,
                        //     onChange: (page) => {
                        //         getHistory(page);
                        //     },
                        // }}
                    ></Table>
                </Modal>

                {/* add History */}
                <Modal
                    closable={false}
                    className="p-0 overflow-hidden rounded-2xl"
                    title="Add History"
                    visible={isAddingHistory}
                    footer={[
                        <div className="flex justify-center my-2">
                            <Button
                                className="w-full mx-2 font-semibold rounded-md border-maroon text-maroon hover:text-maroon hover:border-maroon focus:text-maroon focus:border-maroon"
                                key="back"
                                onClick={() => {
                                    resetAddHistory();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="w-full mx-2 font-semibold rounded-md border-maroon bg-maroon text-cream hover:maroon hover:bg-maroon hover:text-cream hover:border-maroon focus:bg-maroon focus:text-cream focus:border-maroon"
                                key="submit"
                                type="submit"
                                onClick={addHistory}
                            >
                                Add
                            </Button>
                        </div>,
                    ]}
                >
                    <form onSubmit={onChangeForm} method="POST">
                        <Label forInput={"feedQuantity"}>Jumlah Pakan</Label>
                        <Input
                            className="my-1 text-sm rounded-lg border-textColor hover:border-textColor"
                            value={addingHistory?.feedQuantity}
                            placeholder={"Jumlah Pakan"}
                            onChange={(e) => {
                                setAddingHistory((pre) => {
                                    return {
                                        ...pre,
                                        feedQuantity: e.target.value,
                                    };
                                });
                            }}
                        />
                        <Label forInput={"feedName"}>Nama Pakan</Label>
                        <Select
                            className="w-2/5 my-1 text-sm border rounded-lg border-textColor hover:border-textColor"
                            placeholder="Choose Feed Name"
                            onSelect={(value) => {
                                setAddingHistory((pre) => {
                                    return { ...pre, masterFeedId: value };
                                });
                            }}
                            bordered={false}
                        >
                            {dataSource.map((dataId) => {
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

                {/* Edit Pakan History */}
                <Modal
                    closable={false}
                    className="p-0 overflow-hidden rounded-2xl"
                    title="Edit History Pakan"
                    visible={isEditingHistory}
                    footer={[
                        <div className="flex justify-center py-2">
                            <Button
                                className="w-full mx-2 font-semibold rounded-md border-maroon text-maroon hover:text-maroon hover:border-maroon focus:text-maroon focus:border-maroon"
                                key="back"
                                onClick={() => {
                                    resetEditingHistory();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="w-full mx-2 font-semibold rounded-md border-maroon bg-maroon text-cream hover:maroon hover:bg-maroon hover:text-cream hover:border-maroon focus:bg-maroon focus:text-cream focus:border-maroon"
                                key="submit"
                                type="submit"
                                onClick={editHistory}
                            >
                                Save
                            </Button>
                        </div>,
                    ]}
                >
                    <Label forInput={"feedQuantity"}>Jumlah Pakan</Label>
                    <Input
                        className="my-1 text-sm rounded-lg border-textColor hover:border-textColor"
                        value={editingHistory?.feedQuantity}
                        onChange={(e) => {
                            setEditingHistory((pre) => {
                                return {
                                    ...pre,
                                    feedQuantity: e.target.value,
                                };
                            });
                        }}
                    />
                </Modal>
            </div>

            {/* Rekomendasi Pakan */}
            <div className="p-10 mt-10 bg-white rounded-xl">
                <div className="flex justify-center pb-5 mb-5 border-b border-gray-200">
                    <div className="pb-4 text-lg font-bold text-textColor">
                        Rekomendasi Pakan
                        <Button
                            className="mx-4 my-2 text-xs font-bold border-none rounded-md bg-maroon text-cream hover:text-cream hover:border-none hover:bg-maroon focus:bg-maroon focus:text-cream focus:border-none"
                            onClick={onAddRecomendation}
                        >
                            Create
                        </Button>
                    </div>
                </div>
                <Table
                    className="ant-pagination-simple"
                    bordered={true}
                    columns={columnRecommend}
                    dataSource={feedRecommend}
                    pagination={{
                        pageSize: 10,
                        total: totalDataRecommend,
                        onChange: (page) => {
                            getDataRecommend(page);
                        },
                    }}
                ></Table>

                {/* Add Recomendation */}
                <Modal
                    closable={false}
                    className="p-0 overflow-hidden rounded-2xl"
                    title="Add Feed Recomendation"
                    visible={isAddingRecommend}
                    footer={[
                        <div className="flex justify-center my-2">
                            <Button
                                className="w-full mx-2 font-semibold rounded-md border-maroon text-maroon hover:text-maroon hover:border-maroon focus:text-maroon focus:border-maroon"
                                key="back"
                                onClick={() => {
                                    resetAddRecomendation();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="w-full mx-2 font-semibold rounded-md border-maroon bg-maroon text-cream hover:maroon hover:bg-maroon hover:text-cream hover:border-maroon focus:bg-maroon focus:text-cream focus:border-maroon"
                                key="submit"
                                type="submit"
                                onClick={addRecomendation}
                            >
                                Add
                            </Button>
                        </div>,
                    ]}
                >
                    <form onSubmit={onChangeForm} method="POST">
                        <Label forInput={"week"}>Week</Label>
                        <Input
                            className="my-1 text-sm rounded-lg border-textColor hover:border-textColor"
                            value={addingRecommend?.week}
                            placeholder={"week"}
                            onChange={(e) => {
                                setAddingRecommend((pre) => {
                                    return {
                                        ...pre,
                                        week: e.target.value,
                                    };
                                });
                            }}
                        />
                        <Label forInput={"feedQuantity"}>Jumlah Pakan</Label>
                        <Input
                            className="my-1 text-sm rounded-lg border-textColor hover:border-textColor"
                            value={addingRecommend?.feedQuantity}
                            placeholder={"Jumlah Pakan"}
                            onChange={(e) => {
                                setAddingRecommend((pre) => {
                                    return {
                                        ...pre,
                                        feedQuantity: e.target.value,
                                    };
                                });
                            }}
                        />
                        <Label forInput={"farmName"}>Nama Ternak</Label>
                        <Select
                            className="w-2/5 my-1 text-sm border rounded-lg border-textColor hover:border-textColor"
                            placeholder="Choose Farm Name"
                            onSelect={(value) => {
                                setAddingRecommend((pre) => {
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
                            className="w-2/5 my-1 text-sm border rounded-lg border-textColor hover:border-textColor"
                            placeholder="Choose Feed Name"
                            onSelect={(value) => {
                                setAddingRecommend((pre) => {
                                    return { ...pre, masterFeedId: value };
                                });
                            }}
                            bordered={false}
                        >
                            {dataSource.map((dataId) => {
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

                {/* Edit Recomendation */}
                <Modal
                    closable={false}
                    className="p-0 overflow-hidden rounded-2xl"
                    title="Edit Feed Recomendation"
                    visible={isEditingRecommend}
                    footer={[
                        <div className="flex justify-center my-2">
                            <Button
                                className="w-full mx-2 font-semibold rounded-md border-maroon text-maroon hover:text-maroon hover:border-maroon focus:text-maroon focus:border-maroon"
                                key="back"
                                onClick={() => {
                                    resetEditingRecomendation();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="w-full mx-2 font-semibold rounded-md border-maroon bg-maroon text-cream hover:maroon hover:bg-maroon hover:text-cream hover:border-maroon focus:bg-maroon focus:text-cream focus:border-maroon"
                                key="submit"
                                type="submit"
                                onClick={editRecomendation}
                            >
                                Save
                            </Button>
                        </div>,
                    ]}
                >
                    <Label forInput={"week"}>Week</Label>
                    <Input
                        className="my-1 text-sm rounded-lg border-textColor hover:border-textColor"
                        value={editingRecommend?.week}
                        onChange={(e) => {
                            setEditingRecommend((pre) => {
                                return {
                                    ...pre,
                                    week: e.target.value,
                                };
                            });
                        }}
                    />
                    <Label forInput={"feedQuantity"}>Jumlah Pakan</Label>
                    <Input
                        className="my-1 text-sm rounded-lg border-textColor hover:border-textColor"
                        placeholder={editingRecommend?.feedQuantityOnGram}
                        onChange={(e) => {
                            setEditingRecommend((pre) => {
                                return {
                                    ...pre,
                                    feedQuantity: e.target.value,
                                };
                            });
                        }}
                    />
                    <Label forInput={"farmName"}>Nama Ternak</Label>
                    <Select
                        className="w-2/5 my-1 text-sm border rounded-lg border-textColor hover:border-textColor"
                        defaultValue={editingRecommend?.farm.farmName}
                        onSelect={(value) => {
                            setEditingRecommend((pre) => {
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
                        className="w-2/5 my-1 text-sm border rounded-lg border-textColor hover:border-textColor"
                        defaultValue={editingRecommend?.masterFeed.feedName}
                        onSelect={(value) => {
                            setEditingRecommend((pre) => {
                                return { ...pre, masterFeedId: value };
                            });
                        }}
                        bordered={false}
                    >
                        {dataSource.map((dataId) => {
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
                </Modal>
            </div>
        </div>
    );
}
