import React from "react";
import { useEffect, useState } from "react";
import { Button, Table, Modal, Input, Select } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import Label from "../Label";
import FilterCoopNumber from "../FilterCoopNumber";

const { Option } = Select;

export default function DetailReportContent() {
    const [isAdding, setIsAdding] = useState(false);
    const [addingDailyReport, setAddingDailyReport] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editingDailyReport, setEditingDailyReport] = useState(null);
    const [dataSource, setDataSource] = useState([]);
    const [coop, setCoop] = useState([]);
    const [feedName, setFeedName] = useState([]);
    const [feedRecomend, setfeedRecomend] = useState([]);
    const [totalPopulation, setTotalPopulation] = useState([]);
    const [totalDataReport, setTotalDataReport] = useState([]);

    const getData = async (page) => {
        try {
            const dailycoop = await axios
                .get(
                    `https://chikufarm-app.herokuapp.com/api/daily-coop?page=${page}`,
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
        } catch (error) {
            console.log(error);
        }
    };

    const addData = async () => {
        console.log(addingDailyReport);
        try {
            const response = await axios
                .post(
                    "https://chikufarm-app.herokuapp.com/api/daily-coop",
                    addingDailyReport,
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

    const editData = async () => {
        console.log(editingDailyReport);
        const id = editingDailyReport.id;
        const update = {
            death: editingDailyReport.death,
            feedQuantity: editingDailyReport.feedQuantity,
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

    const filterByCoop = async (filter) => {
        try {
            const response = await axios
                .get(
                    `https://chikufarm-app.herokuapp.com/api/daily-coop?coopNumber=${filter}`,
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
            title: "Date",
            dataIndex: "createdAt",
            render: (createdAt) => createdAt.substring(0, 10),
            width: 150,
            align: "center",
        },
        {
            title: "Coop Number",
            align: "center",
            width: 100,
            dataIndex: "coop",
            render: (coop) => {
                if (coop == undefined) {
                    return "-";
                } else {
                    return coop.coopNumber;
                }
            },
        },
        {
            title: "Feed Name",
            width: 150,
            dataIndex: "masterFeed",
            render: (masterFeed) => {
                if (masterFeed?.feedName == null) {
                    return "-";
                } else {
                    return masterFeed?.feedName;
                }
            },
        },
        {
            title: "Feed Quantity",
            dataIndex: "feedQuantity",
            width: 100,
            align: "center",
        },
        {
            title: "Death",
            dataIndex: "death",
            align: "center",
            width: 100,
        },
        {
            title: "Usage Time",
            dataIndex: "usageTime",
            align: "center",
            width: 130,
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
            align: "center",
            title: "Actions",
            width: 150,
            render: (record) => {
                return (
                    <>
                        <EditOutlined
                            onClick={() => {
                                onEditDaily(record);
                            }}
                        />
                        <DeleteOutlined
                            onClick={() => {
                                onDeleteDaily(record);
                            }}
                            style={{ color: "maroon", marginLeft: 12 }}
                        />
                    </>
                );
            },
        },
    ];

    const onAddDaily = () => {
        setIsAdding(true);
        setAddingDailyReport(null);
    };

    const resetAdd = () => {
        setIsAdding(false);
        setAddingDailyReport(null);
    };

    const onDeleteDaily = (record) => {
        Modal.confirm({
            title: "Are you sure?",
            content: "Delete this report",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                setDataSource((pre) => {
                    return pre.filter((report) => report.id !== record.id);
                });
                deleteData(record);
            },
        });
    };
    const onEditDaily = (record) => {
        setIsEditing(true);
        setEditingDailyReport({ ...record });
    };
    const resetEditing = () => {
        setIsEditing(false);
        setEditingDailyReport(null);
    };

    const onChangeForm = (e) => {
        e.preventDefault();
    };

    return (
        <div className="my-8 lg:w-3/4 lg:ml-72 2xl:w-10/12">
            <div className="p-10 bg-white rounded-xl">
                <div className="flex justify-between pb-5 mb-5 border-b border-gray-200">
                    <div className="pb-4 text-lg font-bold text-textColor">
                        All Detail Report
                    </div>
                    <div className="flex gap-2">
                        <FilterCoopNumber
                            onChangeSelect={(value) => {
                                filterByCoop(value);
                            }}
                        />
                        <Button
                            className="flex items-center self-center gap-2 px-4 py-4 font-medium transition duration-300 border-none rounded-md bg-maroon text-cream hover:bg-maroon hover:text-cream hover:border-none focus:text-cream focus:bg-maroon focus:border-none"
                            onClick={onAddDaily}
                        >
                            Create Report
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
                                setAddingDailyReport((pre) => {
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
                            value={addingDailyReport?.feedQuantity}
                            placeholder={"Jumlah Pakan"}
                            onChange={(e) => {
                                setAddingDailyReport((pre) => {
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
                            value={addingDailyReport?.death}
                            placeholder={"Death"}
                            onChange={(e) => {
                                setAddingDailyReport((pre) => {
                                    return { ...pre, death: e.target.value };
                                });
                            }}
                        />
                        <Label forInput={"usageTime"}>Usage Time</Label>
                        <Select
                            className="w-2/5 mb-2 text-sm border rounded-md border-textColor hover:border-textColor"
                            placeholder={"Usage Time"}
                            onSelect={(value) => {
                                setAddingDailyReport((pre) => {
                                    return { ...pre, usageTime: value };
                                });
                            }}
                            bordered={false}
                        >
                            <Option
                                className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                value="pagi"
                            >
                                Pagi
                            </Option>
                            <Option
                                className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                                value="sore"
                            >
                                Sore
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
                        value={editingDailyReport?.feedQuantity}
                        onChange={(e) => {
                            setEditingDailyReport((pre) => {
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
                            editingDailyReport?.feedQuantityRecomendation / 2
                        ).toFixed(1)} Kg`}
                        disabled={true}
                    />
                    <Label forInput={"death"}>Death</Label>
                    <Input
                        className="my-1 text-sm rounded-lg border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                        value={editingDailyReport?.death}
                        onChange={(e) => {
                            setEditingDailyReport((pre) => {
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
