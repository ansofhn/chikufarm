import React from "react";
import { useEffect, useState } from "react";
import { Button, Table, Modal, Input, Select, DatePicker } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import axios from "axios";
import Label from "../Label";
import Link from "next/link";

const { Option } = Select;

export default function HarvestContent() {
    const [isEditing, setIsEditing] = useState(false);
    const [editingHarvest, setEditingHarvest] = useState(null);
    const [dataSource, setDataSource] = useState([]);
    const [coop, setCoop] = useState([]);
    const [isDetail, setIsDetail] = useState(false);
    const [detailHarvest, setDetailHarvest] = useState([]);
    const [totalDataHarvest, setTotalDataHarvest] = useState([]);

    const [isCreate, setIsCreate] = useState(false);
    const [creatingHarvest, setCreatingHarvest] = useState(null);

    const getData = async (page) => {
        try {
            const response = await axios
                .get("https://chikufarm-app.herokuapp.com/api/harvest", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "access_token"
                        )}`,
                    },
                })
                .then((res) => {
                    console.log(res.data);
                    setDataSource(res.data);
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

    const editData = async () => {
        const id = editingHarvest.id;

        const updateHarvest = {
            totalFarmWeight: editingHarvest.totalFarmWeight,
            coopId: editingHarvest.coopId,
            death: editingHarvest.death,
            harvestTime: editingHarvest.harvestTime,
        };
        console.log(updateHarvest);
        try {
            const responseCoop = await axios
                .put(
                    `https://chikufarm-app.herokuapp.com/api/harvest/${id}`,
                    updateHarvest,
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
        } catch (error) {}
    };

    const deleteData = async (record) => {
        const id = record.id;
        try {
            const response = await axios
                .delete(
                    `https://chikufarm-app.herokuapp.com/api/harvest/${id}`,
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
        } catch (error) {}
    };

    useEffect(() => {
        getData(1);
    }, []);

    const getExcel = async () => {
        try {
            const response = await axios
                .get(
                    "https://chikufarm-app.herokuapp.com/api/harvest/download/excel",
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

    const getHarvest = async (record) => {
        console.log(record);
        const id = record.id;
        try {
            const response = await axios
                .get(`https://chikufarm-app.herokuapp.com/api/harvest/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "access_token"
                        )}`,
                    },
                })
                .then((res) => {
                    setDetailHarvest(res.data);
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

    const columns = [
        {
            title: "Harvest Date",
            dataIndex: "harvestTime",
            width: 150,
            align: "center",
        },
        {
            align: "center",
            title: "Coop Number",
            width: 100,
            dataIndex: "coop",
            render: (coop) => coop.coopNumber,
        },
        {
            title: "Total Feed Used",
            align: "center",
            width: 150,
            dataIndex: "totalFeedUsed",
            render: (totalFeedUsed) => `${totalFeedUsed} Kg`,
        },
        {
            title: "Population",
            dataIndex: "population",
            align: "center",
        },
        {
            title: "Death",
            dataIndex: "totalDeath",
            align: "center",
        },
        {
            align: "center",
            width: 150,
            title: "Total Farm Weight",
            dataIndex: "totalFarmWeight",
            render: (totalFarmWeight) => `${totalFarmWeight} Kg`,
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

    const columnHarvest = [
        {
            title: "Total Feed Cost",
            dataIndex: "totalFeedCost",
            render: (totalFeedCost) => `Rp. ${totalFeedCost}`,
            align: "center",
        },
        {
            title: "Total Vaccine Cost",
            dataIndex: "totalVaccinCost",
            render: (totalVaccinCost) => {
                if (totalVaccinCost == null) {
                    return `Rp. -`
                } else {
                    return `Rp. ${totalVaccinCost}`
                }
            },
            align: "center",
        },
        {
            title: " Sell Price / Kg",
            dataIndex: "sellPricePerKg",
            render: (sellPricePerKg) => `Rp. ${(sellPricePerKg/1).toFixed(2)}`,
            align: "center",
        },
        
        {
            title: "Total Sell Price",
            dataIndex: "totalSellingPrice",
            render: (totalSellingPrice) =>
                `Rp. ${(totalSellingPrice / 1).toFixed(0)}`,
            align: "center",
        },
        {
            title: "Profit",
            dataIndex: "profit",
            render: (profit) => `Rp. ${profit}`,
            align: "center",
        },
    ];

    const onDeleteHarvest = (record) => {
        Modal.confirm({
            title: "Delete Pakan",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                setDataSource((pre) => {
                    return pre.filter((harvest) => harvest.id !== record.id);
                });
                deleteData(record);
            },
        });
    };

    const onEditHarvest = (record) => {
        setIsEditing(true);
        setEditingHarvest({ ...record });
    };
    const resetEditing = () => {
        setIsEditing(false);
        setEditingHarvest(null);
    };

    const onDetail = (record) => {
        getHarvest(record);
        setIsDetail(true);
    };
    const resetDetail = () => {
        setIsDetail(false);
    };

    const onCreatePanen = () => {
        setIsCreate(true);
        setCreatingHarvest(null);
    };

    const resetCreate = () => {
        setIsCreate(false);
        setCreatingHarvest(null);
    };

    const onChangeForm = (e) => {
        e.preventDefault();
    };

    return (
        <div className="my-6 lg:w-3/4 lg:ml-72 2xl:w-10/12">
            <div className="p-10 bg-white rounded-xl">
                <div className="flex justify-between pb-5 mb-5 border-b border-gray-200">
                    <div className="pb-4 text-lg font-bold text-textColor">
                        Harvest Data
                    </div>
                    <div className="flex gap-2">
                        <Link
                            href={
                                "https://chikufarm-app.herokuapp.com/api/harvest/download/excel"
                            }
                        >
                            <Button
                                className="flex items-center gap-2 px-4 py-4 font-medium transition duration-300 border-none rounded-md bg-maroon text-cream hover:bg-maroon hover:text-cream hover:border-none focus:text-cream focus:bg-maroon focus:border-none"
                                onClick={getExcel}
                            >
                                Export
                            </Button>
                        </Link>

                        <Button
                            className="flex items-center gap-2 px-4 py-4 font-medium transition duration-300 border-none rounded-md bg-maroon text-cream hover:bg-maroon hover:text-cream hover:border-none focus:text-cream focus:bg-maroon focus:border-none"
                            onClick={onCreatePanen}
                        >
                            Harvest Coop
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

                {/* Create Harvest */}
                <Modal
                    className="p-0 -my-16 overflow-hidden rounded-xl"
                    title={[
                        <div className="mx-1 my-1 font-semibold font-montserrat text-textColor">
                            Create Harvest
                        </div>,
                    ]}
                    onCancel={() => {
                        resetCreate();
                    }}
                    visible={isCreate}
                    footer={null}
                >
                    <form onSubmit={onChangeForm} method="POST">
                        <Label forInput={"coopNumber"}>Coop Number</Label>
                        <Select
                            className="w-2/5 mb-2 text-sm border rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                            placeholder="Choose coop"
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
                                        {`Coop ${dataId.coopNumber}`}
                                    </Option>
                                );
                            })}
                        </Select>
                        <Label forInput={"totalFarmWeight"}>
                            Total Farm Weight
                        </Label>
                        <Input
                            className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                            placeholder="Enter total weight"
                            onChange={(e) => {
                                setCreatingHarvest((pre) => {
                                    return {
                                        ...pre,
                                        totalFarmWeight: e.target.value,
                                    };
                                });
                            }}
                        />
                        <Label forInput={"sellPricePerKg"}>
                            Sell Price / Kg
                        </Label>
                        <Input
                            className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                            placeholder="Enter Sell Price (market price)"
                            onChange={(e) => {
                                setCreatingHarvest((pre) => {
                                    return {
                                        ...pre,
                                        sellPricePerKg: e.target.value,
                                    };
                                });
                            }}
                        />
                        <Label forInput={"death"}>Death</Label>
                        <Input
                            className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                            placeholder="Death"
                            onChange={(e) => {
                                setCreatingHarvest((pre) => {
                                    return {
                                        ...pre,
                                        death: e.target.value,
                                    };
                                });
                            }}
                        />
                        <Label forInput={"harvestTime"}>Harvest Time</Label>
                        <DatePicker
                            className=" mb-2 w-2/5 border-textColor text-textColor rounded-md hover:border-textColor focus:ring-maroon focus:border-cream px-2.5 py-1.5"
                            format={"YYYY-MM-DD"}
                            onSelect={(e) => {
                                setCreatingHarvest((pre) => {
                                    return { ...pre, harvestTime: e._d };
                                });
                            }}
                        />
                        <div className="flex justify-center gap-2 mt-6">
                            <Button
                                className="w-full font-semibold rounded-md border-maroon text-maroon hover:text-maroon hover:border-maroon focus:text-maroon focus:border-maroon"
                                key="back"
                                onClick={() => {
                                    resetCreate();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="w-full font-semibold rounded-md border-maroon bg-maroon text-cream hover:maroon hover:bg-maroon hover:text-cream hover:border-maroon focus:bg-maroon focus:text-cream focus:border-maroon"
                                key="submit"
                                type="submit"
                                onClick={createPanen}
                            >
                                Create
                            </Button>
                        </div>
                    </form>
                </Modal>

                {/* Edit Harvest */}
                <Modal
                    className="p-0 -my-16 overflow-hidden rounded-xl"
                    title={[
                        <div className="mx-1 my-1 font-semibold font-montserrat text-textColor">
                            Edit Harvest Data
                        </div>,
                    ]}
                    onCancel={() => {
                        resetEditing();
                    }}
                    visible={isEditing}
                    footer={null}
                >
                    <Label forInput={"coopNumber"}>Coop Number</Label>
                    <Select
                        className="w-2/5 mb-2 text-sm border rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                        placeholder={`Coop ${editingHarvest?.coop.coopNumber}`}
                        onSelect={(value) => {
                            setEditingHarvest((pre) => {
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
                                    {`Coop ${dataId.coopNumber}`}
                                </Option>
                            );
                        })}
                    </Select>
                    <Label forInput={"totalFarmWeight"}>
                        Total Farm Weight
                    </Label>
                    <Input
                        className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                        placeholder={editingHarvest?.totalFarmWeight}
                        onChange={(e) => {
                            setEditingHarvest((pre) => {
                                return {
                                    ...pre,
                                    totalFarmWeight: e.target.value,
                                };
                            });
                        }}
                    />
                    <Label forInput={"death"}>Death</Label>
                    <Input
                        className="mb-2 text-sm rounded-md border-textColor hover:border-textColor focus:ring-maroon focus:border-cream"
                        placeholder={editingHarvest?.totalDeath}
                        onChange={(e) => {
                            setEditingHarvest((pre) => {
                                return {
                                    ...pre,
                                    death: e.target.value,
                                };
                            });
                        }}
                    />
                    <Label forInput={"harvestTime"}>Harvest Time</Label>
                    <DatePicker
                            className=" mb-2 w-2/5 border-textColor text-textColor rounded-md hover:border-textColor focus:ring-maroon focus:border-cream px-2.5 py-1.5"
                            format={"YYYY-MM-DD"}
                            placeholder={editingHarvest?.harvestTime}
                            onSelect={(e) => {
                                setEditingHarvest((pre) => {
                                    return { ...pre, harvestTime: e._d };
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

                {/* Detail Harvest */}
                <Modal
                    width={700}
                    className="p-0 overflow-hidden rounded-xl"
                    title={[
                        <div className="mx-1 my-1 font-semibold font-montserrat text-textColor">
                            Harvest Detail
                        </div>,
                    ]}
                    onCancel={() => {
                        resetDetail();
                    }}
                    visible={isDetail}
                    footer={null}
                >
                    <Table
                        className="ant-pagination-simple"
                        bordered={true}
                        columns={columnHarvest}
                        dataSource={[detailHarvest]}
                        pagination={false}
                    ></Table>
                </Modal>
            </div>
        </div>
    );
}
