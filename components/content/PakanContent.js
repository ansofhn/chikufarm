import React from "react";
import { useEffect, useState } from "react";
import { Button, Table, Modal, Input, Select } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { MdAdd } from "react-icons/md";
import axios from "axios";
import Label from "../Label";
import SearchFeed from "../SearchFeed";
import FilterFeedRecommend from "../FilterFeedRecommend";

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
    const [feedName, setFeedName] = useState([]);

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
                    console.log(res.data.items);
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
            console.log(error.response.data.error);
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
            console.log(error.response.data.error);
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
                    setFeedName(res.data.feedName);
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

    const filterRecommendation = async (filterRecommend) => {
        try {
            const response = await axios
                .get(
                    `https://chikufarm-app.herokuapp.com/api/feed-recomendation?farmName=${filterRecommend}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "access_token"
                            )}`,
                        },
                    }
                )
                .then((res) => {
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
            title: "Feed Name",
            dataIndex: "feedName",
        },
        {
            title: "Feed Type",
            dataIndex: "feedType",
            align: "center",
        },
        {
            title: "Price / Kg",
            dataIndex: "pricePerKg",
        },
        {
            title: "Farm Category",
            dataIndex: "breed",
            render: (breed) => breed.breedType,
        },
        {
            title: "Stock",
            align: "center",
            dataIndex: "feedStock",
            render: (feedStock) => {
                return `${(feedStock.stock / 1).toFixed(1)} Kg`;
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
            title: "Farm Name",
            dataIndex: "farm",
            render: (farm) => farm.farmName,
        },
        {
            title: "Feed Name",
            dataIndex: "masterFeed",
            render: (masterFeed) => masterFeed.feedName,
        },
        {
            title: "Feed Quantity",
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
            title: "Are you sure?",
            content: "Delete this feed",
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
            title: "Are you sure?",
            content: "Delete this recommendation",
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
        <div className="my-4 lg:w-3/4 lg:ml-72 2xl:w-10/12">
            <div className="p-4 text-lg font-bold text-textColor">
                Feed Data / All
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
                    <div className="flex items-center">
                        <Button
                            className="mx-2 font-medium rounded-md border-maroon bg-maroon text-cream hover:maroon hover:bg-maroon hover:text-cream hover:border-maroon focus:bg-maroon focus:text-cream focus:border-maroon"
                            onClick={onAddHistory}
                        >
                            Add Feed History
                        </Button>
                        <Button
                            className="flex items-center gap-2 px-6 py-3 font-medium transition duration-300 border-none rounded-md bg-maroon text-cream hover:bg-maroon hover:text-cream hover:border-none focus:text-cream focus:bg-maroon focus:border-none"
                            onClick={onAddFeed}
                        >
                            Add Feed
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
                        className: "pt-2",
                        total: totalDataFeed,
                        onChange: (page) => {
                            getData(page);
                        },
                    }}
                ></Table>

                {/* Add Feed */}
                <Modal
                    className="p-0 -my-20 overflow-hidden rounded-xl"
                    title={[
                        <div className="mx-1 my-1 font-semibold font-montserrat text-textColor">
                            Add New Feed
                        </div>,
                    ]}
                    onCancel={() => {
                        resetAdd();
                    }}
                    visible={isAdding}
                    footer={null}
                >
                    <form onSubmit={onChangeForm} method="POST">
                        <Label forInput={"feedName"}>Feed Name</Label>
                        <Input
                            className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                            value={addingFeed?.feedName}
                            placeholder={"Feed Name"}
                            onChange={(e) => {
                                setAddingFeed((pre) => {
                                    return { ...pre, feedName: e.target.value };
                                });
                            }}
                        />
                        <Label forInput={"pricePerKg"}>Price / Kg</Label>
                        <Input
                            className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                            value={addingFeed?.pricePerKg}
                            placeholder={"Feed Price / Kg"}
                            onChange={(e) => {
                                setAddingFeed((pre) => {
                                    return {
                                        ...pre,
                                        pricePerKg: e.target.value,
                                    };
                                });
                            }}
                        />
                        <Label forInput={"feedQuantity"}>Feed Quantity</Label>
                        <Input
                            className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                            value={addingFeed?.feedQuantity}
                            placeholder={"Feed quantity"}
                            onChange={(e) => {
                                setAddingFeed((pre) => {
                                    return {
                                        ...pre,
                                        feedQuantity: e.target.value,
                                    };
                                });
                            }}
                        />
                        <Label forInput={"feedType"}>Feed Type</Label>
                        <Select
                            className="w-2/5 mb-2 text-sm border rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                            placeholder="Choose feed type"
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
                        <Label forInput={"categoryTernak"}>Farm Category</Label>
                        <Select
                            className="w-2/5 mb-2 text-sm border rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                            placeholder="Farm Category"
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
                        <div className="flex justify-center gap-2 mt-6">
                            <Button
                                className="w-full font-semibold rounded-md border-maroon text-maroon hover:text-maroon hover:border-maroon focus:text-maroon focus:border-maroon"
                                key="back"
                                onClick={() => {
                                    resetAdd();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="w-full font-semibold rounded-md border-maroon bg-maroon text-cream hover:maroon hover:bg-maroon hover:text-cream hover:border-maroon focus:bg-maroon focus:text-cream focus:border-maroon"
                                key="submit"
                                type="submit"
                                onClick={addDataFeed}
                            >
                                Add
                            </Button>
                        </div>
                    </form>
                </Modal>

                {/* Edit Feed */}
                <Modal
                    className="p-0 overflow-hidden rounded-xl"
                    title={[
                        <div className="mx-1 my-1 font-semibold font-montserrat text-textColor">
                            Edit Feed
                            <div className="text-xs font-medium">{editingFeed?.feedName}</div>
                        </div>,
                    ]}
                    onCancel={() => {
                        resetEditing();
                    }}
                    visible={isEditing}
                    footer={null}
                >
                    <Label forInput={"feedName"}>Feed Name</Label>
                    <Input
                        className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                        value={editingFeed?.feedName}
                        onChange={(e) => {
                            setEditingFeed((pre) => {
                                return { ...pre, feedName: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"feedType"}>Feed Type</Label>
                    <Select
                        className="w-2/5 mb-2 text-sm border rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
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
                    <Label forInput={"pricePerKg"}>Price / Kg</Label>
                    <Input
                        className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                        value={editingFeed?.pricePerKg}
                        onChange={(e) => {
                            setEditingFeed((pre) => {
                                return { ...pre, pricePerKg: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"breed"}>Farm Category</Label>
                    <Select
                        className="w-1/3 mb-2 text-sm border rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
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
                    <div className="flex justify-center gap-2 mt-6">
                        <Button
                            className="w-full font-semibold rounded-md border-maroon text-maroon hover:text-maroon hover:border-maroon focus:text-maroon focus:border-maroon"
                            key="back"
                            onClick={() => {
                                resetEditing();
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="w-full font-semibold rounded-md border-maroon bg-maroon text-cream hover:maroon hover:bg-maroon hover:text-cream hover:border-maroon focus:bg-maroon focus:text-cream focus:border-maroon"
                            key="submit"
                            type="submit"
                            onClick={editDataFeed}
                        >
                            Save
                        </Button>
                    </div>
                </Modal>

                {/* Detail Feed */}
                <Modal
                    className="p-0 -my-20 overflow-hidden rounded-xl "
                    visible={isDetail}
                    title={[
                        <div className="mx-1 my-1 font-semibold font-montserrat text-textColor">
                            {feedName} History
                        </div>,
                    ]}
                    onCancel={() => {
                        resetDetail();
                    }}
                    footer={null}
                >
                    <Table
                        className="ant-pagination-simple"
                        bordered={true}
                        columns={columnHistory}
                        dataSource={historySource}
                        pagination={{
                            pageSize: 5,
                        }}
                    ></Table>
                </Modal>

                {/* add History */}
                <Modal
                    className="p-0 overflow-hidden rounded-xl"
                    title={[
                        <div className="mx-1 my-1 font-semibold font-montserrat text-textColor">
                            Add Feed History
                        </div>,
                    ]}
                    onCancel={() => {
                        resetAddHistory();
                    }}
                    visible={isAddingHistory}
                    footer={null}
                >
                    <form onSubmit={onChangeForm} method="POST">
                        <Label forInput={"feedQuantity"}>Feed Quantity</Label>
                        <Input
                            className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                            value={addingHistory?.feedQuantity}
                            placeholder={"Feed Quantity"}
                            onChange={(e) => {
                                setAddingHistory((pre) => {
                                    return {
                                        ...pre,
                                        feedQuantity: e.target.value,
                                    };
                                });
                            }}
                        />
                        <Label forInput={"historyStatus"}>Status</Label>
                        <Select
                            className="w-2/5 mb-2 text-sm border rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                            placeholder="Choose Status"
                            onSelect={(value) => {
                                setAddingHistory((pre) => {
                                    return { ...pre, historyStatus: value };
                                });
                            }}
                            bordered={false}
                        >
                            <Option
                                className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                value="usage"
                            >
                                Usage
                            </Option>
                            <Option
                                className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                value="in"
                            >
                                In
                            </Option>
                        </Select>
                        <Label forInput={"feedName"}>Feed Name</Label>
                        <Select
                            className="w-2/5 mb-2 text-sm border rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
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
                        <div className="flex justify-center gap-2 mt-6">
                            <Button
                                className="w-full font-semibold rounded-md border-maroon text-maroon hover:text-maroon hover:border-maroon focus:text-maroon focus:border-maroon"
                                key="back"
                                onClick={() => {
                                    resetAddHistory();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="w-full font-semibold rounded-md border-maroon bg-maroon text-cream hover:maroon hover:bg-maroon hover:text-cream hover:border-maroon focus:bg-maroon focus:text-cream focus:border-maroon"
                                key="submit"
                                type="submit"
                                onClick={addHistory}
                            >
                                Add
                            </Button>
                        </div>
                    </form>
                </Modal>

                {/* Edit Feed History */}
                <Modal
                    width={400}
                    className="p-0 overflow-hidden rounded-xl"
                    title={[
                        <div className="mx-1 my-1 font-semibold font-montserrat text-textColor">
                            Edit Feed Quantity
                        </div>,
                    ]}
                    onCancel={() => {
                        resetEditingHistory();
                    }}
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
                    <Label forInput={"feedQuantity"}>Feed Quantity</Label>
                    <Input
                        className="my-1 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
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

            {/* Rekomendasi Feed */}
            <div className="p-10 mt-10 bg-white rounded-xl">
                <div className="flex justify-between pb-5 mb-5 border-b border-gray-200">
                    <div className="pb-4 text-lg font-bold text-textColor">
                        Feed Recommendation
                    </div>
                    <div className="flex gap-2"> 
                        <FilterFeedRecommend
                            onChangeSelect={(value) => {
                                filterRecommendation(value);
                            }}
                        />
                        <Button
                            className="flex items-center self-center justify-center gap-2 py-3 font-medium transition duration-300 border-none rounded-md px-9 bg-maroon text-cream hover:bg-maroon hover:text-cream hover:border-none focus:text-cream focus:bg-maroon focus:border-none"
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
                        className: "pt-2",
                        total: totalDataRecommend,
                        onChange: (page) => {
                            getDataRecommend(page);
                        },
                    }}
                ></Table>

                {/* Add Recomendation */}
                <Modal
                    className="p-0 overflow-hidden rounded-xl"
                    title={[
                        <div className="mx-1 my-1 font-semibold font-montserrat text-textColor">
                            Add Feed Recommendation
                        </div>,
                    ]}
                    onCancel={() => {
                        resetAddRecomendation();
                    }}
                    visible={isAddingRecommend}
                    footer={null}
                >
                    <form onSubmit={onChangeForm} method="POST">
                        <Label forInput={"week"}>Week</Label>
                        <Input
                            className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
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
                        <Label forInput={"feedQuantity"}>Feed Quantity</Label>
                        <Input
                            className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                            value={addingRecommend?.feedQuantity}
                            placeholder={"Feed Quantity"}
                            onChange={(e) => {
                                setAddingRecommend((pre) => {
                                    return {
                                        ...pre,
                                        feedQuantity: e.target.value,
                                    };
                                });
                            }}
                        />
                        <Label forInput={"farmName"}>Farm Name</Label>
                        <Select
                            className="w-2/5 mb-2 text-sm border rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
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
                        <Label forInput={"feedName"}>Feed Name</Label>
                        <Select
                            className="w-2/5 mb-2 text-sm border rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
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
                        <div className="flex justify-center gap-2 mt-6">
                            <Button
                                className="w-full font-semibold rounded-md border-maroon text-maroon hover:text-maroon hover:border-maroon focus:text-maroon focus:border-maroon"
                                key="back"
                                onClick={() => {
                                    resetAddRecomendation();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="w-full font-semibold rounded-md border-maroon bg-maroon text-cream hover:maroon hover:bg-maroon hover:text-cream hover:border-maroon focus:bg-maroon focus:text-cream focus:border-maroon"
                                key="submit"
                                type="submit"
                                onClick={addRecomendation}
                            >
                                Add
                            </Button>
                        </div>
                    </form>
                </Modal>

                {/* Edit Recomendation */}
                <Modal
                    className="p-0 overflow-hidden rounded-xl"
                    title={[
                        <div className="mx-1 my-1 font-semibold font-montserrat text-textColor">
                            Edit Feed Recommendation
                        </div>,
                    ]}
                    onCancel={() => {
                        resetEditingRecomendation();
                    }}
                    visible={isEditingRecommend}
                    footer={null}
                >
                    <Label forInput={"week"}>Week</Label>
                    <Input
                        className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
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
                    <Label forInput={"feedQuantity"}>Feed Quantity</Label>
                    <Input
                        className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
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
                    <Label forInput={"farmName"}>Farm Name</Label>
                    <Select
                        className="w-2/5 mb-2 text-sm border rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
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
                    <Label forInput={"feedName"}>Feed Name</Label>
                    <Select
                        className="w-2/5 mb-2 text-sm border rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
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
                    <div className="flex justify-center gap-2 mt-6">
                        <Button
                            className="w-full font-semibold rounded-md border-maroon text-maroon hover:text-maroon hover:border-maroon focus:text-maroon focus:border-maroon"
                            key="back"
                            onClick={() => {
                                resetEditingRecomendation();
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="w-full font-semibold rounded-md border-maroon bg-maroon text-cream hover:maroon hover:bg-maroon hover:text-cream hover:border-maroon focus:bg-maroon focus:text-cream focus:border-maroon"
                            key="submit"
                            type="submit"
                            onClick={editRecomendation}
                        >
                            Save
                        </Button>
                    </div>
                </Modal>
            </div>
        </div>
    );
}
