import React from "react";
import { useEffect, useState } from "react";
import { Button, Table, Modal, Input, Select } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import Label from "../Label";

const { Option } = Select;

export default function DetailReportContent() {
    const [isAdding, setIsAdding] = useState(false);
    const [addingDailyReport, setAddingDailyReport] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editingDailyReport, setEditingDailyReport] = useState(null);
    const [dataSource, setDataSource] = useState([]);
    const [coop, setCoop] = useState([]);
    const [feedRecomend, setfeedRecomend] = useState([]);
    const [totalPopulation, setTotalPopulation] = useState([]);

    const getData = async () => {
        try {
            const dailycoop = await axios
                .get("https://chikufarm-app.herokuapp.com/api/daily-coop", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "access_token"
                        )}`,
                    },
                })
                .then((res) => {
                    console.log(res.data);
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
                    getData();
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
        getData();
    }, []);

    const columns = [
        {
            title: "Tanggal",
            dataIndex: "createdAt",
            render: (createdAt) => createdAt.substring(0, 10),
            width: 150,
            align: "center",
        },
        {
            title: "Kandang",
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
            title: "Pakan",
            width: 150,
            dataIndex: "masterFeed",
            render: (masterFeed) => masterFeed.feedName,
        },
        {
            title: "Jumlah Pakan",
            dataIndex: "feedQuantity",
            width: 100,
            align: "center",
        },
        {
            title: "Kematian",
            dataIndex: "death",
            align: "center",
            width: 100,
        },
        {
            title: "Waktu Penggunaan",
            dataIndex: "usageTime",
            align: "center",
            width: 100,
        },
        {
            align: "center",
            title: "Actions",
            render: (record) => {
                return (
                    <>
                        <EditOutlined
                            onClick={() => {
                                onEditHarvest(record);
                            }}
                        />
                        <DeleteOutlined
                            onClick={() => {
                                onDeleteHarvest(record);
                            }}
                            style={{ color: "maroon", marginLeft: 12 }}
                        />
                    </>
                );
            },
        },
    ];

    const onAddHarvest = () => {
        setIsAdding(true);
        setAddingDailyReport(null);
    };

    const resetAdd = () => {
        setIsAdding(false);
        setAddingDailyReport(null);
    };

    const onDeleteHarvest = (record) => {
        Modal.confirm({
            title: "Delete Pakan",
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
    const onEditHarvest = (record) => {
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
        <div className="my-4 lg:w-3/4 lg:ml-72">
            <div className="p-10 bg-white rounded-lg">
                <div className="flex justify-center pb-5 mb-5 border-b border-gray-200">
                    <div className="pb-4 text-lg font-bold text-textColor">
                        All Detail Report
                        <Button
                            className="mx-4 my-2 text-xs font-bold border-none rounded-md bg-maroon text-cream hover:text-cream hover:border-none hover:bg-maroon focus:bg-maroon focus:text-cream focus:border-none"
                            onClick={onAddHarvest}
                        >
                            Create
                        </Button>
                    </div>
                </div>
                <Table
                    className="ant-pagination-simple"
                    bordered={true}
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                ></Table>

                {/* Add Report */}
                <Modal
                    closable={false}
                    className="rounded-lg overflow-hidden p-0"
                    title="Create Report"
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
                        <Label forInput={"coopNumber"}>Kandang</Label>
                        <Select
                            className="w-2/5 my-1 text-sm border rounded-lg border-textColor hover:border-textColor"
                            placeholder="Pilih Kandang"
                            onSelect={(value) => {
                                setAddingDailyReport((pre) => {
                                    return { ...pre, coopId: value };
                                });
                                getOneCoop(value)
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
                        <Label forInput={"feedQuantity"}>Jumlah Pakan</Label>
                        <Input
                            className="rounded-lg text-sm border-textColor my-1 hover:border-textColor focus:ring-maroon focus:border-cream"
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
                            className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                            value={`Rekomendasi Jumlah Pakan : ${(
                                (feedRecomend / 1000) *
                                totalPopulation
                            ).toFixed(1)} Kg`}
                            disabled={true}
                        />
                        <Label forInput={"death"}>Kematian</Label>
                        <Input
                            className="rounded-lg text-sm border-textColor my-1 hover:border-textColor focus:ring-maroon focus:border-cream "
                            value={addingDailyReport?.death}
                            placeholder={"Jumlah Kematian"}
                            onChange={(e) => {
                                setAddingDailyReport((pre) => {
                                    return { ...pre, death: e.target.value };
                                });
                            }}
                        />
                        <Label forInput={"usageTime"}>Waktu Penggunaan</Label>
                        <Select
                            className="my-1 w-2/5 text-sm rounded-lg border border-textColor hover:border-textColor"
                            placeholder={"Waktu Penggunaan"}
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
                    </form>
                </Modal>

                {/* Edit Report */}
                <Modal
                    closable={false}
                    className="rounded-lg overflow-hidden p-0"
                    title="Edit Report"
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
                    <Label forInput={"feedQuantity"}>Jumlah Pakan</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor focus:ring-maroon focus:border-cream"
                        value={editingDailyReport?.feedQuantity}
                        placeholder={"Jumlah Pakan"}
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
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={`Rekomendasi Jumlah Pakan : ${editingDailyReport?.feedQuantityRecomendation.toFixed(
                            1
                        )} Kg`}
                        disabled={true}
                    />
                    <Label forInput={"death"}>Kematian</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor focus:ring-maroon focus:border-cream"
                        value={editingDailyReport?.death}
                        placeholder={"Jumlah Kematian"}
                        onChange={(e) => {
                            setEditingDailyReport((pre) => {
                                return { ...pre, death: e.target.value };
                            });
                        }}
                    />
                </Modal>
            </div>
        </div>
    );
}
