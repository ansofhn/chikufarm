import React from "react";
import { useEffect, useState } from "react";
import { Button, Table, Modal, Input, Select } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import axios from "axios";
import Label from "../Label";
import SearchFeed from "../SearchFeed";
import FilterFeedRecommend from "../FilterFeedRecommend";
import SearchVaccine from "../SearchVaccine";
import Swal from "sweetalert2";

const { Option } = Select;

export default function VaccineContent() {
    const [isAdding, setIsAdding] = useState(false);
    const [addingVaccinate, setAddingVaccinate] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editingVaccinate, setEditingVaccinate] = useState(null);
    const [totalDataVaccinate, setTotalDataVaccinate] = useState([]);

    const [search, setSearch] = useState([]);
    const [filter, setFilter] = useState([]);
    const [dataSource, setDataSource] = useState([]);

    const [isHistory, setIsHistory] = useState(false);
    const [isAddingHistory, setIsAddingHistory] = useState(false);
    const [addingHistory, setAddingHistory] = useState(null);
    const [isEditingHistory, setIsEditingHistory] = useState(false);
    const [editingHistory, setEditingHistory] = useState(null);
    const [historySource, setHistorySource] = useState([]);
    const [vaccineName, setVaccineName] = useState([]);

    const [farm, setFarm] = useState([]);

    const [vaccinateRecommend, setVaccinateRecommend] = useState([]);
    const [isAddingRecommend, setIsAddingRecommend] = useState(false);
    const [addingRecommend, setAddingRecommend] = useState(null);
    const [isEditingRecommend, setIsEditingRecommend] = useState(false);
    const [editingRecommend, setEditingRecommend] = useState(null);
    const [totalDataRecommend, setTotalDataRecommend] = useState([]);

    const getData = async (page) => {
        try {
            const responseVaccine = await axios
                .get(
                    `https://chikufarm-app.herokuapp.com/api/vaccin?page=${page}`,
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
                    setTotalDataVaccinate(res.data.meta.totalItems);
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
                    console.log(res.data.items);
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

    const addDataVaccine = async () => {
        try {
            const response = await axios
                .post(
                    "https://chikufarm-app.herokuapp.com/api/vaccin",
                    addingVaccinate,
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

    const editDataVaccine = async () => {
        const vaccineId = editingVaccinate.id;
        const updateVaccine = {
            vaccinName: editingVaccinate.vaccinName,
            quantity: editingVaccinate.quantity,
            price: editingVaccinate.price,
            application: editingVaccinate.application,
        };

        try {
            const responseFeed = await axios
                .put(
                    `https://chikufarm-app.herokuapp.com/api/vaccin/${vaccineId}`,
                    updateVaccine,
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

    const deleteDataVaccine = async (record) => {
        const id = record.id;
        try {
            const response = await axios
                .delete(
                    `https://chikufarm-app.herokuapp.com/api/vaccin/${id}`,
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
                    setDataSource((pre) => {
                        return pre.filter((vaccin) => vaccin.id !== record.id);
                    });
                });
        } catch (error) {
            console.log(error.response.data.error);
            let timerInterval;
            Swal.fire({
                position: "top",
                html: `${error.response.data.error}`,
                timer: 1500,
                showConfirmButton: false,
                timerProgressBar: true,
                willClose: () => {
                    clearInterval(timerInterval);
                },
            });
        }
    };

    const searchData = async (search, filter) => {
        try {
            const response = await axios
                .get(
                    `https://chikufarm-app.herokuapp.com/api/vaccin?search=${search}&application=${filter}`,
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
                .get(`https://chikufarm-app.herokuapp.com/api/vaccin/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "access_token"
                        )}`,
                    },
                })
                .then((res) => {
                    console.log(res.data);
                    setHistorySource(res.data.vaccinHistory);
                    setVaccineName(res.data.vaccinName);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const addHistory = async () => {
        try {
            const response = await axios
                .post(
                    "https://chikufarm-app.herokuapp.com/api/vaccin-history",
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
            quantity: editingHistory.quantity,
        };
        try {
            const response = await axios
                .put(
                    `https://chikufarm-app.herokuapp.com/api/vaccin-history/${historyId}`,
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
                    setTimeout((res) => setIsHistory(false), 500);
                });
        } catch (error) {}
    };

    const getDataRecommend = async (pageRecommend) => {
        try {
            const responseRecommend = await axios
                .get(
                    `https://chikufarm-app.herokuapp.com/api/vaccin-recommendation?page=${pageRecommend}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "access_token"
                            )}`,
                        },
                    }
                )
                .then((res) => {
                    setTotalDataRecommend(res.data.meta.totalItems);
                    setVaccinateRecommend(res.data.items);
                });
        } catch (error) {}
    };

    const filterRecommendation = async (filterRecommend) => {
        try {
            const response = await axios
                .get(
                    `https://chikufarm-app.herokuapp.com/api/feed-recommendation?farmName=${filterRecommend}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "access_token"
                            )}`,
                        },
                    }
                )
                .then((res) => {
                    setVaccinateRecommend(res.data.items);
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
                    setVaccinateRecommend(vaccinateRecommend.concat(res.data));
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
            title: "Vaccine Name",
            dataIndex: "vaccinName",
        },
        {
            title: "Application",
            dataIndex: "application",
            align: "center",
            render: (application) => {
                if (application == "tetes") {
                    return "Drops";
                } else if (application == "suntik") {
                    return "Inject";
                } else {
                    return "Water Drink";
                }
            },
        },
        {
            title: "Price",
            dataIndex: "price",
        },
        {
            title: "Stock",
            align: "center",
            dataIndex: "vaccinStock",
            render: (vaccinStock) => {
                return vaccinStock.stock;
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
                                onEditVaccinate(record);
                            }}
                        />
                        <DeleteOutlined
                            className="ml-3 text-maroon"
                            onClick={() => {
                                onDeleteVaccinate(record);
                            }}
                        />
                        <EyeOutlined
                            className="ml-3 text-textColor"
                            onClick={() => {
                                onHistory(record);
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
            dataIndex: "quantity",
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
            title: "Day",
            dataIndex: "day",
            align: "center",
        },
        {
            title: "Farm Name",
            dataIndex: "farmName",
            render: (farm) => farm.farmName,
        },
        {
            title: "Vaccine Name",
            dataIndex: "vaccinName",
            render: (masterFeed) => masterFeed.feedName,
        },
        {
            title: "Usage Rules",
            dataIndex: "usageRules",
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

    const onAddVaccin = () => {
        setIsAdding(true);
        setAddingVaccinate(null);
    };

    const resetAdd = () => {
        setIsAdding(false);
        setAddingVaccinate(null);
    };

    const onDeleteVaccinate = (record) => {
        Modal.confirm({
            title: "Are you sure?",
            content: "Delete this vaccine",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                deleteDataVaccine(record);
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
                setVaccinateRecommend((pre) => {
                    return pre.filter((recomend) => recomend.id !== record.id);
                });
                deleteRecomendation(record);
            },
        });
    };
    const onEditVaccinate = (record) => {
        setIsEditing(true);
        setEditingVaccinate({ ...record });
    };
    const resetEditing = () => {
        setIsEditing(false);
        setEditingVaccinate(null);
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

    const onHistory = (record) => {
        getHistory(record);
        setIsHistory(true);
    };
    const resetDetail = () => {
        setIsHistory(false);
    };

    const onChangeForm = (e) => {
        e.preventDefault();
    };

    const checkApply = (method) => {
        if (method == "tetes") {
            return "Drops";
        } else if (method == "suntik") {
            return "Inject";
        } else {
            return "Water Drink";
        }
    };
    console.log(addingRecommend)
    return (
        <div className="my-4 lg:w-3/4 lg:ml-72">
            <div className="p-4 text-lg font-bold text-textColor">
                Vaccination Data / All
            </div>

            <div className="p-10 bg-white rounded-xl">
                <div className="flex justify-between pb-5 mb-5 border-b border-gray-200">
                    <SearchVaccine
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
                            Add Vaccine History
                        </Button>
                        <Button
                            className="flex items-center gap-2 px-6 py-3 font-medium transition duration-300 border-none rounded-md bg-maroon text-cream hover:bg-maroon hover:text-cream hover:border-none focus:text-cream focus:bg-maroon focus:border-none"
                            onClick={onAddVaccin}
                        >
                            Add Vaccine
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
                        total: totalDataVaccinate,
                        onChange: (page) => {
                            getData(page);
                        },
                    }}
                ></Table>

                {/* Add Vaccine */}
                <Modal
                    className="p-0 -my-20 overflow-hidden rounded-xl"
                    title={[
                        <div className="font-semibold my-1 mx-1 font-montserrat text-textColor">
                            Add New Vaccine
                        </div>,
                    ]}
                    onCancel={() => {
                        resetAdd();
                    }}
                    visible={isAdding}
                    footer={null}
                >
                    <form onSubmit={onChangeForm} method="POST">
                        <Label forInput={"vaccinName"}>Vaccine Name</Label>
                        <Input
                            className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                            placeholder={"Vaccine name"}
                            onChange={(e) => {
                                setAddingVaccinate((pre) => {
                                    return {
                                        ...pre,
                                        vaccinName: e.target.value,
                                    };
                                });
                            }}
                        />
                        <Label forInput={"price"}>Price</Label>
                        <Input
                            className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                            placeholder={"Price"}
                            onChange={(e) => {
                                setAddingVaccinate((pre) => {
                                    return {
                                        ...pre,
                                        price: e.target.value,
                                    };
                                });
                            }}
                        />
                        <Label forInput={"quantity"}>Quantity</Label>
                        <Input
                            className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                            placeholder={"Quantity"}
                            onChange={(e) => {
                                setAddingVaccinate((pre) => {
                                    return {
                                        ...pre,
                                        quantity: e.target.value,
                                    };
                                });
                            }}
                        />
                        <Label forInput={"application"}>Application</Label>
                        <Select
                            className="w-2/5 mb-2 text-sm rounded-md border border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                            placeholder="Choose application"
                            onSelect={(value) => {
                                setAddingVaccinate((pre) => {
                                    return { ...pre, application: value };
                                });
                            }}
                            bordered={false}
                        >
                            <Option
                                className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                value="tetes"
                            >
                                Drops
                            </Option>
                            <Option
                                className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                value="air minum"
                            >
                                Water Drink
                            </Option>
                            <Option
                                className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                value="suntik"
                            >
                                Inject
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
                                onClick={addDataVaccine}
                            >
                                Add
                            </Button>
                        </div>
                    </form>
                </Modal>

                {/* Edit Vaccine */}
                <Modal
                    className="p-0 overflow-hidden rounded-xl"
                    title={[
                        <div className="font-semibold my-1 mx-1 font-montserrat text-textColor">
                            Edit Vaccine
                        </div>,
                    ]}
                    onCancel={() => {
                        resetEditing();
                    }}
                    visible={isEditing}
                    footer={null}
                >
                    <Label forInput={"vaccinName"}>Vaccine Name</Label>
                    <Input
                        className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                        placeholder={editingVaccinate?.vaccinName}
                        onChange={(e) => {
                            setEditingVaccinate((pre) => {
                                return { ...pre, vaccinName: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"quantity"}>Quantity</Label>
                    <Input
                        className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                        placeholder={editingVaccinate?.vaccinStock.stock}
                        onChange={(e) => {
                            setEditingVaccinate((pre) => {
                                return { ...pre, quantity: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"price"}>Price</Label>
                    <Input
                        className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                        placeholder={editingVaccinate?.price}
                        onChange={(e) => {
                            setEditingVaccinate((pre) => {
                                return { ...pre, price: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"application"}>Application</Label>
                    <Select
                        className="w-2/5 mb-2 text-sm rounded-md border border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                        placeholder={checkApply(editingVaccinate?.application)}
                        onSelect={(value) => {
                            setEditingVaccinate((pre) => {
                                return { ...pre, application: value };
                            });
                        }}
                        bordered={false}
                    >
                        <Option
                            className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                            value="tetes"
                        >
                            Drops
                        </Option>
                        <Option
                            className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                            value="air minum"
                        >
                            Water Drink
                        </Option>
                        <Option
                            className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                            value="suntik"
                        >
                            Inject
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
                            onClick={editDataVaccine}
                        >
                            Save
                        </Button>
                    </div>
                </Modal>

                {/* Vaccine History */}
                <Modal
                    className="p-0 -my-20 overflow-hidden rounded-xl "
                    visible={isHistory}
                    title={[
                        <div className="font-semibold my-1 mx-1 font-montserrat text-textColor">
                            {vaccineName} History
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
                        <div className="font-semibold my-1 mx-1 font-montserrat text-textColor">
                            Add Vaccine History
                        </div>,
                    ]}
                    onCancel={() => {
                        resetAddHistory();
                    }}
                    visible={isAddingHistory}
                    footer={null}
                >
                    <form onSubmit={onChangeForm} method="POST">
                        <Label forInput={"quantity"}>Quantity</Label>
                        <Input
                            className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                            value={addingHistory?.quantity}
                            placeholder={"Quantity"}
                            onChange={(e) => {
                                setAddingHistory((pre) => {
                                    return {
                                        ...pre,
                                        quantity: e.target.value,
                                    };
                                });
                            }}
                        />
                        <Label forInput={"vaccinName"}>Vaccine Name</Label>
                        <Select
                            className="w-2/5 mb-2 text-sm rounded-md border border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                            placeholder="Choose Vaccine"
                            onSelect={(value) => {
                                setAddingHistory((pre) => {
                                    return { ...pre, vaccinId: value };
                                });
                            }}
                            bordered={false}
                        >
                            {dataSource.map((dataId) => {
                                // console.log(dataId)
                                return (
                                    <Option
                                        className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                        value={dataId.id}
                                    >
                                        {dataId.vaccinName}
                                    </Option>
                                );
                            })}
                        </Select>
                        <Label forInput={"historyStatus"}>Status</Label>
                        <Select
                            className="w-2/5 mb-2 text-sm rounded-md border border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
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
                        <div className="font-semibold my-1 mx-1 font-montserrat text-textColor">
                            Edit Vaccine Quantity
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
                    <Label forInput={"Quantity"}>Quantity</Label>
                    <Input
                        className="my-1 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                        value={editingHistory?.quantity}
                        onChange={(e) => {
                            setEditingHistory((pre) => {
                                return {
                                    ...pre,
                                    quantity: e.target.value,
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
                        Vaccine Recommendation
                    </div>
                    <div className="gap-2 flex">
                        <FilterFeedRecommend
                            onChangeSelect={(value) => {
                                filterRecommendation(value);
                            }}
                        />
                        <Button
                            className="flex items-center justify-center self-center gap-2 px-9 py-3 font-medium transition duration-300 border-none rounded-md bg-maroon text-cream hover:bg-maroon hover:text-cream hover:border-none focus:text-cream focus:bg-maroon focus:border-none"
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
                    dataSource={vaccinateRecommend}
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
                    className="p-0 -my-20 overflow-hidden rounded-xl"
                    title={[
                        <div className="font-semibold my-1 mx-1 font-montserrat text-textColor">
                            Add Vaccine Recommendation
                        </div>,
                    ]}
                    onCancel={() => {
                        resetAddRecomendation();
                    }}
                    visible={isAddingRecommend}
                    footer={null}
                >
                    <form onSubmit={onChangeForm} method="POST">
                        <Label forInput={"day"}>Day</Label>
                        <Input
                            className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                            value={addingRecommend?.week}
                            placeholder={"Day"}
                            onChange={(e) => {
                                setAddingRecommend((pre) => {
                                    return {
                                        ...pre,
                                        day: e.target.value,
                                    };
                                });
                            }}
                        />
                        <Label forInput={"vaccineName"}>Vaccine Name</Label>
                        <Select
                            className="w-2/5 mb-2 text-sm rounded-md border border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                            placeholder="Choose Farm Name"
                            onSelect={(value) => {
                                setAddingRecommend((pre) => {
                                    return { ...pre, vaccinId: value };
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
                                        {dataId.vaccinName}
                                    </Option>
                                );
                            })}
                        </Select>
                        <Label forInput={"farmName"}>Farm Name</Label>
                        <Select
                            className="w-2/5 mb-2 text-sm rounded-md border border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
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
                        <Label forInput={"usageRules"}>Usage Rule</Label>
                        <textarea
                            id="message"
                            rows="8"
                            className="mb-2 block p-2.5 w-full text-sm text-textColor border-textColor rounded-md hover:border-textColor focus:ring-maroon focus:border-cream"
                            placeholder="Enter the rule.."
                            onChange={(e) => {
                                setAddingRecommend((pre) => {
                                    return {
                                        ...pre,
                                        usageRules: e.target.value,
                                    };
                                });
                            }}
                        />
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
                        <div className="font-semibold my-1 mx-1 font-montserrat text-textColor">
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
                        className="w-2/5 mb-2 text-sm rounded-md border border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
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
                        className="w-2/5 mb-2 text-sm rounded-md border border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
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
