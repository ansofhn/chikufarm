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
    const [report, setReport] = useState([]);
    const [coop, setCoop] = useState([]);
    const [feedRecomend, setfeedRecomend] = useState([]);
    const [totalPopulation, setTotalPopulation] = useState([]);

    const getData = async () => {
        try {
            const response = await axios
                .get(
                    "https://chikufarm-app.herokuapp.com/api/coop/daily/report",
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
                    setDataSource(res.data.items);
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
                    console.log(res.data);
                    setReport(res.data);
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
                    getData();
                });
        } catch (error) {
            console.log(error);
        }
    };

    const editData = async () => {
        const reportId = editingReport.id;
        const roleId = editingReport.roleId;

        const updateReport = {
            fullName: editingReport.fullName,
            userName: editingReport.userName,
            email: editingReport.email,
            phone: editingReport.phone,
        };
        const updateRole = {
            id: reportId,
            roleId: roleId,
        };

        try {
            const responseUser = await axios
                .put(
                    `https://chikufarm-app.herokuapp.com/api/daily-coop/${reportId}`,
                    updateReport,
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
                });
        } catch (error) {
            console.log(error);
        }
    };

    const searchData = async (search, filter) => {
        try {
            const response = await axios
                .get(
                    `https://chikufarm-app.herokuapp.com/api/daily-coop?search=${search}&role=${filter}`,
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
        // const id = addingReport.coopId;
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
                    console.log(res.data);
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
            title: "Kandang",
            align: "center",
            dataIndex: "coopNumber",
            render: (coopNumber) => {
                return `Kandang ${coopNumber}`;
            },
        },
        {
            title: "Populasi",
            dataIndex: "populationUpdate",
            align: "center",
        },
        {
            title: "Kematian",
            align: "center",
            render: (_, record) => {
                return record.populationStart - record.populationUpdate;
            },
        },
        {
            title: "Status Pakan",
            children: [
                {
                    title: "Pagi",
                    dataIndex: "dailyCoop",
                    align: "center",
                    width: 100,
                    render: (dailyCoop) => {
                        if (dailyCoop.length >= 1) {
                            return (
                                <div className="bg-cream p-2 rounded-md text-xs font-medium uppercase text-maroon">
                                    Sudah
                                </div>
                            );
                        } else {
                            return (
                                <div className="bg-maroon p-2 rounded-md text-xs font-medium uppercase text-cream">
                                    Belum
                                </div>
                            );
                        }
                    },
                },
                {
                    title: "Sore",
                    dataIndex: "dailyCoop",
                    align: "center",
                    width: 100,
                    render: (dailyCoop) => {
                        if (dailyCoop.length >= 2) {
                            return (
                                <div className="bg-cream p-2 rounded-md text-xs font-medium uppercase text-maroon">
                                    Sudah
                                </div>
                            );
                        } else {
                            return (
                                <div className="bg-maroon p-2 rounded-md text-xs font-medium uppercase text-cream">
                                    Belum
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
                        <EyeOutlined
                            className="ml-3 text-textColor"
                            onClick={() => {
                                onDetail(record);
                            }}
                        />
                    </>
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
            title: "Delete Report",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                setDataSource((pre) => {
                    return pre.filter((report) => report.id !== record.id);
                });
                // deleteData(record)
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

    // const onDetail = (record) => {
    //     getHistory(record);
    //     setDetailPakan({ ...record });
    //     setIsDetail(true);
    // };

    // const resetDetail = () => {
    //     setIsDetail(false);
    //     setDetailPakan(null);
    // };

    const onChangeForm = (e) => {
        e.preventDefault();
    };

    return (
        <div className="my-4 lg:w-3/4 lg:ml-72">
            <div className="p-4 text-lg font-bold mb-3 text-textColor">
                Report Harian
            </div>
            <div className="grid grid-cols-4 gap-5 mb-10">
                <div className="w-full p-3 bg-white rounded-lg">
                    <div className="text-sm text-textColor">Total Populasi</div>
                    <div className="text-lg font-bold text-textColor">
                        {report.currentPopulation}
                    </div>
                </div>
                <div className="w-full p-3 bg-white rounded-lg">
                    <div className="text-sm text-textColor">Total Kandang</div>
                    <div className="text-lg font-bold text-textColor">
                        {report.totalCoop}
                    </div>
                </div>
                <div className="w-full p-3 bg-white rounded-lg">
                    <div className="text-sm text-textColor">
                        Total Pakan / Hari
                    </div>
                    <div className="text-lg font-bold text-textColor">{}</div>
                </div>
                <div className="w-full p-3 bg-white rounded-lg">
                    <div className="text-sm text-textColor">
                        Kematian / Hari
                    </div>
                    <div className="text-lg font-bold text-textColor">{}</div>
                </div>
            </div>
            <div className="p-10 bg-white rounded-lg">
                <div className="flex justify-between mb-5 pb-5 border-b border-gray-200">
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
                        className="transition duration-300 text-semibold rounded-lg items-center gap-2 flex px-4 py-3 bg-maroon text-cream border-none hover:bg-maroon hover:text-cream hover:border-none focus:text-cream focus:bg-maroon focus:border-none"
                        onClick={onAddReport}
                    >
                        <MdAdd className="self-center text-base" />
                        Create
                    </Button>
                </div>
                <Table
                    className="ant-pagination-simple"
                    bordered={true}
                    columns={columns}
                    dataSource={dataSource}
                ></Table>

                {/* Add Report */}
                <Modal
                    closable={false}
                    className="rounded-lg overflow-hidden p-0"
                    title="Add Report"
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
                        <Label forInput={"coopNumber"}>Kandang</Label>
                        <Select
                            className="w-2/5 my-1 text-sm border rounded-lg border-textColor hover:border-textColor"
                            placeholder="Pilih Kandang"
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
                                        {`Kandang ${dataId.coopNumber}`}
                                    </Option>
                                );
                            })}
                        </Select>
                        <Label forInput={"feedQuantity"}>Jumlah Pakan</Label>
                        <Input
                            className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                            value={addingReport?.feedQuantity}
                            placeholder={"Jumlah Pakan"}
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
                            className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                            value={`Rekomendasi Jumlah Pakan : ${(
                                (feedRecomend / 1000) *
                                totalPopulation
                            ).toFixed(1)} Kg`}
                            disabled={true}
                        />
                        <Label forInput={"death"}>Kematian</Label>
                        <Input
                            className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                            value={addingReport?.death}
                            placeholder={"Jumlah Kematian"}
                            onChange={(e) => {
                                setAddingReport((pre) => {
                                    return { ...pre, death: e.target.value };
                                });
                            }}
                        />
                        <Label forInput={"usageTime"}>Waktu Penggunaan</Label>
                        <Select
                            className="my-1 w-2/5 text-sm rounded-lg border border-textColor hover:border-textColor"
                            placeholder={"Waktu Penggunaan"}
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
                    <Label forInput={"coopNumber"}>Kandang</Label>
                    <Select
                        className="w-2/5 my-1 text-sm border rounded-lg border-textColor hover:border-textColor"
                        placeholder="Pilih Kandang"
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
                                    {`Kandang ${dataId.coopNumber}`}
                                </Option>
                            );
                        })}
                    </Select>
                    <Label forInput={"feedQuantity"}>Jumlah Pakan</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={addingReport?.feedQuantity}
                        placeholder={"Jumlah Pakan"}
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
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={`Rekomendasi Jumlah Pakan : ${(
                            (feedRecomend / 1000) *
                            totalPopulation
                        ).toFixed(1)} Kg`}
                        disabled={true}
                    />
                    <Label forInput={"death"}>Kematian</Label>
                    <Input
                        className="rounded-lg text-sm border-textColor my-1 hover:border-textColor "
                        value={addingReport?.death}
                        placeholder={"Jumlah Kematian"}
                        onChange={(e) => {
                            setAddingReport((pre) => {
                                return { ...pre, death: e.target.value };
                            });
                        }}
                    />
                    <Label forInput={"usageTime"}>Waktu Penggunaan</Label>
                    <Select
                        className="my-1 w-2/5 text-sm rounded-lg border border-textColor hover:border-textColor"
                        placeholder={"Waktu Penggunaan"}
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
                            Pagi
                        </Option>
                        <Option
                            className="hover:bg-cream hover:text-textColor focus:bg-cream focus:text-textColor"
                            value="sore"
                        >
                            Sore
                        </Option>
                    </Select>
                </Modal>
            </div>
        </div>
    );
}
