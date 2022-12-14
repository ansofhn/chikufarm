import { Button, Table, Modal, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import Label from "../Label";
import { MdAdd } from "react-icons/md";
import axios from "axios";
import SearchReport from "../SearchReport";

const { Option } = Select;

export default function ReportContent() {
    const [isAdding, setIsAdding] = useState(false);
    const [addingReport, setAddingReport] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editingReport, setEditingReport] = useState(null);
    const [search, setSearch] = useState([]);
    const [filter, setFilter] = useState([]);
    const [dataSource, setDataSource] = useState([]);

    const [coop, setCoop] = useState([]);
    const [feedName, setFeedName] = useState([]);
    const [feedRecomend, setfeedRecomend] = useState([]);
    const [totalPopulation, setTotalPopulation] = useState([]);
    const [totalDataReport, setTotalDataReport] = useState([]);
    const [detailReport, setDetailReport] = useState([]);
    const [isDetail, setIsDetail] = useState(false);
    const [reportStats, setReportStats] = useState([])

    const getData = async (page) => {
        try {
            const response = await axios
                .get(
                    `https://chikufarm-app.herokuapp.com/api/coop/daily/report?page=${page}`,
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
                    setTotalDataReport(res.data.meta.totalItems);
                    setDataSource(res.data.items);
                });

            const coop = await axios
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

            const report = await axios
                .get("https://chikufarm-app.herokuapp.com/api/report/array", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "access_token"
                        )}`,
                    },
                })
                .then((res) => {
                    setReportStats(res.data);
                });

        } catch (error) {
            console.log(error);
        }
    };

    const getDetail = async (record) => {
        console.log(record.dailyCoop);
        setDetailReport(record.dailyCoop);
    };

    const addData = async () => {
        console.log(addingReport);
        try {
            const response = await axios
                .post(
                    "https://chikufarm-app.herokuapp.com/api/daily-coop",
                    addingReport,
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
                    resetAdd();
                    getData(1);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const editData = async () => {
        console.log(editingReport);
        const id = editingReport.id;
        const update = {
            death: editingReport.death,
            feedQuantity: editingReport.feedQuantity,
        };
        try {
            const response = await axios
                .put(
                    `https://chikufarm-app.herokuapp.com/api/daily-coop/${id}`,
                    update,
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
                    resetEditing();
                    getData(1);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const deleteData = async (record) => {
        const id = record.id;
        try {
            const response = await axios
                .delete(
                    `https://chikufarm-app.herokuapp.com/api/daily-coop/${id}`,
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
                    getData(1);
                });
        } catch (error) {
            console.log(error);
        }
    };

    const searchData = async (search,filter) => {
        try {
            const response = await axios
                .get(
                    `https://chikufarm-app.herokuapp.com/api/coop/daily/report?search=${search}&farm=${filter}`,
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
        } catch (error) {
            console.log(error);
        }
    };

    const getOneCoop = async (id) => {
        try {
            const response = await axios
                .get(`https://chikufarm-app.herokuapp.com/api/coop/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "access_token"
                        )}`,
                    },
                })
                .then((res) => {
                    setFeedName(res.data.masterFeed.feedName);
                    setfeedRecomend(
                        res.data.feedRecomendation.feedQuantityOnGram
                    );
                    setTotalPopulation(res.data.populationUpdate);
                });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData(1);
    }, []);

    const columns = [
        {
            title: "Coop Number",
            align: "center",
            dataIndex: "coopNumber",
            render: (coopNumber) => {
                return `Coop ${coopNumber}`;
            },
        },
        {
            title: "Farm Name",
            align: "center",
            dataIndex: "farm",
            render: (farm) => {
                if (farm?.farmName == null) {
                    return "-";
                } else {
                    return farm?.farmName
                }
            },
        },
        {
            title: "Feed Name",
            align: "center",
            dataIndex: "masterFeed",
            render: (masterFeed) => {
                if (masterFeed?.feedName == null) {
                    return "-";
                } else {
                    return masterFeed?.feedName
                }
            },
        },
        {
            title: "Population",
            dataIndex: "populationUpdate",
            align: "center",
        },
        {
            title: "Death",
            align: "center",
            render: (_, record) => {
                return record.populationStart - record.populationUpdate;
            },
        },
        {
            title: "Feed Status",
            children: [
                {
                    title: "Morning",
                    dataIndex: "dailyCoop",
                    align: "center",
                    width: 125,
                    render: (dailyCoop) => {
                        if (dailyCoop.length >= 1) {
                            return (
                                <div className="p-2 text-xs font-medium uppercase rounded-md bg-cream text-maroon">
                                    given
                                </div>
                            );
                        } else {
                            return (
                                <div className="p-2 text-xs font-medium uppercase rounded-md bg-maroon text-cream">
                                    Not given
                                </div>
                            );
                        }
                    },
                },
                {
                    title: "Afternoon",
                    dataIndex: "dailyCoop",
                    align: "center",
                    width: 125,
                    render: (dailyCoop) => {
                        if (dailyCoop.length >= 2) {
                            return (
                                <div className="p-2 text-xs font-medium uppercase rounded-md bg-cream text-maroon">
                                    given
                                </div>
                            );
                        } else {
                            return (
                                <div className="p-2 text-xs font-medium uppercase rounded-md bg-maroon text-cream">
                                    Not given
                                </div>
                            );
                        }
                    },
                },
            ],
        },
        {
            align: "center",
            title: "Actions",
            render: (record) => {
                return (
                    <>
                        <EyeOutlined
                            className="text-textColor"
                            onClick={() => {
                                onDetail(record);
                            }}
                        />
                    </>
                );
            },
        },
    ];

    const columnDetail = [
        {
            title: "Date",
            width: 150,
            dataIndex: "createdAt",
            render: (createdAt) => {
                return `${createdAt.substring(0, 10)}`;
            },
        },
        {
            title: "Usage Time",
            dataIndex: "usageTime",
            align: "center",
            render: (usageTime) => {
                if (usageTime == "pagi") {
                    return (
                        <div className="p-2 text-xs font-medium uppercase rounded-md bg-cream text-maroon">
                            Morning
                        </div>
                    );
                } else {
                    return (
                        <div className="p-2 text-xs font-medium uppercase rounded-md bg-maroon text-cream">
                            Afternoon
                        </div>
                    );
                }
            },
        },
        {
            title: "Feed Quantity",
            align: "center",
            dataIndex: "feedQuantity",
            render: (feedQuantity) => {
                return `${feedQuantity} Kg`;
            },
        },
        {
            title: "Death",
            dataIndex: "death",
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
                                onEditReport(record);
                            }}
                        />
                        <DeleteOutlined
                            onClick={() => {
                                onDeleteReport(record);
                            }}
                            style={{ color: "maroon", marginLeft: 12 }}
                        />
                    </div>
                );
            },
        },
    ];

    const onAddReport = () => {
        setIsAdding(true);
        setAddingReport(null);
    };

    const resetAdd = () => {
        setAddingReport(null);
        setIsAdding(false);
    };

    const onDeleteReport = (record) => {
        Modal.confirm({
            title: "Are you sure?",
            content: "Delete this report",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                setDetailReport((pre) => {
                    return pre.filter((report) => report.id !== record.id);
                });
                deleteData(record);
            },
        });
    };
    const onEditReport = (record) => {
        setIsEditing(true);
        setEditingReport({ ...record });
    };
    const resetEditing = () => {
        setEditingReport(null);
        setIsEditing(false);
    };

    const onDetail = (record) => {
        getDetail(record);
        setIsDetail(true);
    };
    const resetDetail = () => {
        setIsDetail(false);
    };

    const onChangeForm = (e) => {
        e.preventDefault();
    };

    const totalPakan = () => {
        const total = reportStats.totalFeedStock;
        if (total >= 1000) {
            return `${(total / 1000).toFixed(1)} Ton`;
        } else {
            return `${(total / 1).toFixed(1)} Kg`;
        }
    };

    return (
        <div className="my-4 lg:w-3/4 lg:ml-72 2xl:w-10/12">
            <div className="p-4 text-lg font-bold text-textColor">
                Daily Report / All
            </div>
            <div className="grid grid-cols-4 gap-5 mb-6">
                <div className="w-full p-3 bg-white rounded-lg 2xl:p-4">
                    <div className="text-sm text-textColor">
                        Total Population
                    </div>
                    <div className="text-lg font-bold text-textColor">
                        {reportStats.currentPopulation}
                    </div>
                </div>
                <div className="w-full p-3 bg-white rounded-lg 2xl:p-4">
                    <div className="text-sm text-textColor">Total Coop</div>
                    <div className="text-lg font-bold text-textColor">
                        {reportStats.totalCoop}
                    </div>
                </div>
                <div className="w-full p-3 bg-white rounded-lg 2xl:p-4">
                    <div className="text-sm text-textColor">Total Feed</div>
                    <div className="text-lg font-bold text-textColor">
                        {totalPakan()}
                    </div>
                </div>
                <div className="w-full p-3 bg-white rounded-lg 2xl:p-4">
                    <div className="text-sm text-textColor">Death</div>
                    <div className="text-lg font-bold text-textColor">
                        {reportStats.death}
                    </div>
                </div>
            </div>
            <div className="p-10 bg-white rounded-xl">
                <div className="flex justify-between pb-5 mb-5 border-b border-gray-200">
                    <SearchReport
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
                        className="flex items-center gap-2 px-4 py-3 transition duration-300 border-none rounded-md text-semibold bg-maroon text-cream hover:bg-maroon hover:text-cream hover:border-none focus:text-cream focus:bg-maroon focus:border-none"
                        onClick={onAddReport}
                    >
                        Create Report
                    </Button>
                </div>
                <Table
                    className="ant-pagination-simple"
                    bordered={true}
                    columns={columns}
                    dataSource={dataSource}
                    pagination={{
                        pageSize: 10,
                        className: "pt-2",
                        total: totalDataReport,
                        onChange: (page) => {
                            getData(page);
                        },
                    }}
                ></Table>

                {/* Add Report */}
                <Modal
                    className="p-0 -my-20 overflow-hidden rounded-xl"
                    title={[
                        <div className="mx-1 my-1 font-semibold font-montserrat text-textColor">
                            Create Report
                        </div>,
                    ]}
                    onCancel={() => {
                        resetAdd();
                    }}
                    visible={isAdding}
                    footer={null}
                >
                    <form onSubmit={onChangeForm} method="POST">
                        <Label forInput={"coopNumber"}>Coop Number</Label>
                        <Select
                            className="w-2/5 mb-2 text-sm border rounded-md border-textColor hover:border-textColor"
                            placeholder="Choose coop"
                            onSelect={(value) => {
                                setAddingReport((pre) => {
                                    return { ...pre, coopId: value };
                                });
                                getOneCoop(value);
                            }}
                            bordered={false}
                        >
                            {coop.map((dataId) => {
                                return (
                                    <Option
                                        className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                        value={dataId.id}
                                    >
                                        {`Coop ${dataId.coopNumber}`}
                                    </Option>
                                );
                            })}
                        </Select>
                        <Label forInput={"feedQuantity"}>Feed Quantity</Label>
                        <Input
                            className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                            value={addingReport?.feedQuantity}
                            placeholder={"Feed quantity"}
                            onChange={(e) => {
                                setAddingReport((pre) => {
                                    return {
                                        ...pre,
                                        feedQuantity: e.target.value,
                                    };
                                });
                            }}
                        />
                        <Input
                            className="mb-2 text-sm rounded-md border-textColor hover:border-textColor "
                            value={`Feed Quantity Recommendation : ${(
                                ((feedRecomend / 1000) * totalPopulation) /
                                2
                            ).toFixed(1)} Kg`}
                            disabled={true}
                        />
                        <Input
                            className="mb-2 text-sm rounded-md border-textColor hover:border-textColor "
                            value={`Feed Name : ${feedName}`}
                            disabled={true}
                        />
                        <Label forInput={"death"}>Death</Label>
                        <Input
                            className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                            value={addingReport?.death}
                            placeholder={"Death"}
                            onChange={(e) => {
                                setAddingReport((pre) => {
                                    return { ...pre, death: e.target.value };
                                });
                            }}
                        />
                        <Label forInput={"usageTime"}>Usage Time</Label>
                        <Select
                            className="w-2/5 mb-2 text-sm border rounded-md border-textColor hover:border-textColor"
                            placeholder={"Usage Time"}
                            onSelect={(value) => {
                                setAddingReport((pre) => {
                                    return { ...pre, usageTime: value };
                                });
                            }}
                            bordered={false}
                        >
                            <Option
                                className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                value="pagi"
                            >
                                Morning
                            </Option>
                            <Option
                                className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                value="sore"
                            >
                                Afternoon
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
                                onClick={addData}
                            >
                                Create
                            </Button>
                        </div>
                    </form>
                </Modal>

                <Modal
                    width={700}
                    className="p-0 -my-10 overflow-hidden rounded-xl "
                    visible={isDetail}
                    title={[
                        <div className="mx-1 my-1 font-semibold font-montserrat text-textColor">
                            Detail Report
                        </div>,
                    ]}
                    onCancel={() => {
                        resetDetail();
                    }}
                    footer={null}
                >
                    <Table
                        bordered={true}
                        columns={columnDetail}
                        dataSource={detailReport}
                        pagination={false}
                    ></Table>
                </Modal>

                {/* Edit Report */}
                <Modal
                    className="p-0 overflow-hidden rounded-xl"
                    title={[
                        <div className="mx-1 my-1 font-semibold font-montserrat text-textColor">
                            Edit Report
                        </div>,
                    ]}
                    onCancel={() => {
                        resetEditing();
                    }}
                    visible={isEditing}
                    footer={null}
                >
                    <Label forInput={"feedQuantity"}>Feed Quantity</Label>
                    <Input
                        className="my-1 text-sm rounded-lg border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                        value={editingReport?.feedQuantity}
                        onChange={(e) => {
                            setEditingReport((pre) => {
                                return {
                                    ...pre,
                                    feedQuantity: e.target.value,
                                };
                            });
                        }}
                    />
                    <Input
                        className="my-1 text-sm rounded-lg border-textColor hover:border-textColor "
                        value={`Feed Quantity Recommendation : ${(
                            editingReport?.feedQuantityRecomendation / 2
                        ).toFixed(1)} Kg`}
                        disabled={true}
                    />
                    <Label forInput={"death"}>Death</Label>
                    <Input
                        className="my-1 text-sm rounded-lg border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                        value={editingReport?.death}
                        onChange={(e) => {
                            setEditingReport((pre) => {
                                return { ...pre, death: e.target.value };
                            });
                        }}
                    />
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
                            onClick={editData}
                        >
                            Save
                        </Button>
                    </div>
                </Modal>
            </div>
        </div>
    );
}
